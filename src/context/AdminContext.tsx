import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

// Only these Google accounts may enter admin edit mode. This list only controls
// whether the edit UI is shown — the actual write permission is enforced server-side
// in firestore.rules, which must list the same email(s).
const ADMIN_EMAILS = ['dlrka0131@gmail.com'];

interface AdminContextType {
  isAdmin: boolean;
  isAuthLoading: boolean;
  toggleAdminMode: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  isAuthLoading: true,
  toggleAdminMode: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = !!user && !!user.email && ADMIN_EMAILS.includes(user.email);

  const toggleAdminMode = async () => {
    if (user) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error('Sign out failed', e);
      }
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user.email || !ADMIN_EMAILS.includes(result.user.email)) {
        alert('관리자로 등록된 구글 계정이 아닙니다.');
        await signOut(auth);
      }
    } catch (e) {
      // Popup closed by user, blocked by browser, etc. — nothing to show.
      console.error('Google sign-in failed', e);
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isAuthLoading, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
