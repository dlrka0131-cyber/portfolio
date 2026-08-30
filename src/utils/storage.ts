/**
 * Storage Utility: Combines local storage (IndexedDB + localStorage) with Firebase Firestore.
 * - Local storage (IndexedDB) provides fast, large-capacity storage for base64 images.
 * - Firestore provides cross-device synchronization for shared site visitors.
 */

import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const DB_NAME = 'CodingTeacherAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'keyvalueStore';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const localDb = request.result;
      if (!localDb.objectStoreNames.contains(STORE_NAME)) {
        localDb.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function normalizeKey(key: string): string {
  return key.replace(/\//g, '_');
}

/** Get item from local storage (IndexedDB fallback to localStorage) */
export async function getLocalItem(key: string): Promise<string | null> {
  // 1. Try IndexedDB
  try {
    const localDb = await openDB();
    const tx = localDb.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(key);
    const res = await new Promise<string | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    if (res !== undefined && res !== null) {
      return res;
    }
  } catch (err) {
    // Ignore IndexedDB error, fall back
  }

  // 2. Try localStorage
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

/** Save item to local storage (IndexedDB for large data, localStorage for small data) */
export async function saveLocalItem(key: string, value: string): Promise<void> {
  // Always save to IndexedDB (unlimited capacity)
  try {
    const localDb = await openDB();
    const tx = localDb.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(value, key);
  } catch (err) {
    // ignore
  }

  // Only put in localStorage if small (<50KB) to avoid quota errors
  if (value.length < 50000) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // quota exceeded, silently ignore
    }
  }
}

/** Timeout promise wrapper */
function withTimeout<T>(promise: Promise<T>, timeoutMs = 2500): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timed out')), timeoutMs);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

// In-memory fast cache to prevent repeated disk/network lag on mobile
const memoryCache: Record<string, string> = {};

/** Fetch document from Firestore and update caches */
async function fetchFromFirestore(key: string): Promise<string | null> {
  const safeKey = normalizeKey(key);
  try {
    const docRef = doc(db, 'app_storage', safeKey);
    const snap = await withTimeout(getDoc(docRef), 2000);
    if (snap.exists()) {
      const data = snap.data();
      if (data && typeof data.value === 'string') {
        memoryCache[key] = data.value;
        saveLocalItem(key, data.value).catch(() => {});
        return data.value;
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Retrieve item:
 * 1. Checks fast in-memory cache
 * 2. Checks local storage (IndexedDB / localStorage)
 * 3. Falls back to Cloud Firestore
 */
export async function getItem(key: string): Promise<string | null> {
  if (memoryCache[key]) {
    return memoryCache[key];
  }

  const localVal = await getLocalItem(key);
  if (localVal) {
    memoryCache[key] = localVal;
    // Sync with Firestore in background asynchronously
    fetchFromFirestore(key).catch(() => {});
    return localVal;
  }

  return await fetchFromFirestore(key);
}

/** Helper to sync local item to Firestore in background without blocking */
async function syncToFirestore(key: string, value: string): Promise<void> {
  if (!value || value.length > 950000) return; // skip if over size limit
  const safeKey = normalizeKey(key);
  try {
    const docRef = doc(db, 'app_storage', safeKey);
    await setDoc(docRef, {
      key,
      value,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    // Silent fail
  }
}

/** Save item locally AND sync to Cloud Firestore */
export async function saveItem(key: string, value: string): Promise<void> {
  memoryCache[key] = value;
  await saveLocalItem(key, value);
  await syncToFirestore(key, value);
}

/** Remove item locally and from Cloud Firestore */
export async function removeItem(key: string): Promise<void> {
  delete memoryCache[key];
  try {
    const localDb = await openDB();
    const tx = localDb.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch (e) {}
  try {
    localStorage.removeItem(key);
  } catch (e) {}

  const safeKey = normalizeKey(key);
  try {
    const docRef = doc(db, 'app_storage', safeKey);
    await deleteDoc(docRef);
  } catch (e) {}
}

/** Helper to get all alias keys for a session image */
export function getSessionAliases(key: string): string[] {
  const match = key.match(/sess(\d+)$/);
  if (!match) return [key];
  const num = match[1];

  if (
    key.includes('entry-basic') ||
    key.includes('solbit-1_step1') ||
    key.includes('grade1_step1') ||
    key.includes('1학년')
  ) {
    return [
      `session_img_solbit-1_step1_sess${num}`,
      `session_img_entry-basic_sess${num}`,
      `session_img_grade1_step1_sess${num}`,
    ];
  }
  if (key.includes('delight-3d') || key.includes('solbit-1_step2')) {
    return [
      `session_img_solbit-1_step2_sess${num}`,
      `session_img_delight-3d_sess${num}`,
    ];
  }
  if (key.includes('solbit-2-grade') || key.includes('solbit-2_step1')) {
    return [
      `session_img_solbit-2_step1_sess${num}`,
      `session_img_solbit-2-grade_sess${num}`,
    ];
  }
  if (key.includes('hello-maple')) {
    return [
      `session_img_hello-maple_step1_sess${num}`,
      `session_img_hello-maple_sess${num}`,
    ];
  }
  return [key];
}

/** Retrieve session item checking key and all its aliases in parallel for ultra-fast performance */
export async function getItemWithFallback(key: string): Promise<string | null> {
  const aliases = getSessionAliases(key);

  // 1. Check memory cache first
  for (const alias of aliases) {
    if (memoryCache[alias]) return memoryCache[alias];
  }

  // 2. Check local storage
  for (const alias of aliases) {
    const localVal = await getLocalItem(alias);
    if (localVal) {
      memoryCache[alias] = localVal;
      memoryCache[key] = localVal;
      return localVal;
    }
  }

  // 3. Parallel fetch from Firestore
  const results = await Promise.all(aliases.map((a) => fetchFromFirestore(a)));
  const found = results.find((v) => v !== null) || null;
  if (found) {
    for (const alias of aliases) {
      memoryCache[alias] = found;
    }
  }
  return found;
}

/** Save item to key AND all its session aliases */
export async function saveSessionItem(key: string, value: string): Promise<void> {
  const aliases = getSessionAliases(key);
  for (const alias of aliases) {
    memoryCache[alias] = value;
  }
  await Promise.all(aliases.map((alias) => saveItem(alias, value)));
}

/** Remove item from key AND all its session aliases */
export async function removeSessionItem(key: string): Promise<void> {
  const aliases = getSessionAliases(key);
  for (const alias of aliases) {
    delete memoryCache[alias];
  }
  await Promise.all(aliases.map((alias) => removeItem(alias)));
}

