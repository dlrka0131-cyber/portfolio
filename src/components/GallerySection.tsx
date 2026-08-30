import React, { useState, useEffect } from 'react';
import { GALLERY_DATA } from '../data/galleryData';
import { ActivityPhoto } from '../types';
import { Camera, Eye, X, PlusCircle, Trash2 } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { getItem, saveItem } from '../utils/storage';
import { useAdmin } from '../context/AdminContext';

interface GallerySectionProps {
  onOpenTrialModal: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ActivityPhoto | null>(null);
  
  // Custom Overrides state
  const [customGalleryImages, setCustomGalleryImages] = useState<Record<string, string>>({});
  const [addedPhotos, setAddedPhotos] = useState<ActivityPhoto[]>([]);

  const { isAdmin } = useAdmin();

  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  useEffect(() => {
    // Load custom images and custom added photos from storage
    const loadData = async () => {
      const imgs: Record<string, string> = {};

      // 1. Instant scan of localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('gallery_img_')) {
          const photoId = key.replace('gallery_img_', '');
          const val = localStorage.getItem(key);
          if (val) imgs[photoId] = val;
        }
      }

      const localAdded = localStorage.getItem('custom_added_gallery_photos');
      if (localAdded) {
        try {
          setAddedPhotos(JSON.parse(localAdded));
        } catch (e) {}
      }

      if (Object.keys(imgs).length > 0) {
        setCustomGalleryImages({ ...imgs });
      }

      // 2. Parallel fetch from storage utility
      const galleryPromises = GALLERY_DATA.map(async (photo) => {
        const savedImg = await getItem(`gallery_img_${photo.id}`);
        return { id: photo.id, img: savedImg };
      });

      const [galleryResults, savedAdded] = await Promise.all([
        Promise.all(galleryPromises),
        getItem('custom_added_gallery_photos'),
      ]);

      for (const res of galleryResults) {
        if (res.img) imgs[res.id] = res.img;
      }

      setCustomGalleryImages({ ...imgs });

      if (savedAdded) {
        try {
          setAddedPhotos(JSON.parse(savedAdded));
        } catch (e) {
          console.error('Failed parsing added gallery photos:', e);
        }
      }
    };

    loadData();
  }, []);

  const handleAddNewPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotoList: ActivityPhoto[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const compressed = await compressImage(file, 1200, 1200, 0.85);
        const newPhoto: ActivityPhoto = {
          id: `custom-added-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          title: file.name.replace(/\.[^/.]+$/, "") || '활동 모습 사진',
          gradeCategory: 'all',
          categoryLabel: '활동 모습',
          imageUrl: compressed,
          date: new Date().toLocaleDateString('ko-KR'),
          location: '수업 현장',
          description: '추가된 활동 모습 사진입니다.',
          tags: ['활동사진'],
          highlights: [],
          studentCount: 1
        };
        newPhotoList.push(newPhoto);
      } catch (err) {
        console.error('Failed to compress new photo:', err);
      }
    }

    if (newPhotoList.length > 0) {
      const updated = [...newPhotoList, ...addedPhotos];
      setAddedPhotos(updated);
      await saveItem('custom_added_gallery_photos', JSON.stringify(updated));
    }
  };

  const handleGalleryPhotoUpload = async (photoId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 1200, 1200, 0.85);
      
      // If photoId belongs to addedPhotos
      if (addedPhotos.some(p => p.id === photoId)) {
        const updated = addedPhotos.map(p => p.id === photoId ? { ...p, imageUrl: compressed } : p);
        setAddedPhotos(updated);
        await saveItem('custom_added_gallery_photos', JSON.stringify(updated));
      } else {
        await saveItem(`gallery_img_${photoId}`, compressed);
        setCustomGalleryImages((prev) => ({
          ...prev,
          [photoId]: compressed,
        }));
      }

      if (selectedPhoto && selectedPhoto.id === photoId) {
        setSelectedPhoto({
          ...selectedPhoto,
          imageUrl: compressed,
        });
      }
    } catch (err) {
      console.error('Gallery image upload failed:', err);
      alert('사진 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteAddedPhoto = async (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('이 사진을 삭제하시겠습니까?')) return;

    const updated = addedPhotos.filter(p => p.id !== photoId);
    setAddedPhotos(updated);
    await saveItem('custom_added_gallery_photos', JSON.stringify(updated));

    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(null);
    }
  };

  const allPhotos = [...addedPhotos, ...GALLERY_DATA];

  return (
    <section id="gallery" className="py-12 bg-[#FFF8F0] text-[#383331] border-t border-[#F5E2D5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FFF0E6] text-[#FF5A4D] border border-[#FFC8C2] font-black px-4 py-1.5 rounded-full text-xs shadow-2xs">
            <Camera className="w-4 h-4 text-[#FF7066]" />
            <span>GALLERY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2826] tracking-tight">
            📸 활동모습 갤러리
          </h2>
          <p className="text-[#6B5B52] text-sm sm:text-base leading-relaxed font-medium">
            학생들과 함께한 생생한 AI·코딩 수업 현장과 다양한 창작 활동 스냅샷입니다.
          </p>

          {/* Upload Button (Admin mode only) */}
          {isAdmin && (
            <div className="pt-2 flex justify-center">
              <label className="bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-5 py-2.5 rounded-2xl text-sm shadow-md transition-transform hover:scale-105 cursor-pointer flex items-center gap-2 border border-[#FF5A4D]">
                <PlusCircle className="w-5 h-5 text-white" />
                <span>사진 추가하기</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddNewPhotos}
                />
              </label>
            </div>
          )}
        </div>

        {/* Pure Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          
          {/* Add Photo Card at start of grid (Admin mode only) */}
          {isAdmin && (
            <label className="group relative bg-[#FFF3EE] hover:bg-[#FFEBE2] rounded-2xl sm:rounded-3xl border-2 border-dashed border-[#FF8D7B] hover:border-[#FF5A4D] transition-all duration-300 cursor-pointer aspect-4/3 sm:aspect-square flex flex-col items-center justify-center p-4 text-center gap-2 hover:-translate-y-1 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FF7066] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <PlusCircle className="w-7 h-7 text-white" />
              </div>
              <span className="font-black text-[#2D2826] text-sm sm:text-base">사진 추가하기</span>
              <span className="text-xs text-[#8C7B72] font-medium hidden sm:inline">활동 사진 업로드</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddNewPhotos}
              />
            </label>
          )}

          {allPhotos.map((photo) => {
            const currentImg = customGalleryImages[photo.id] || photo.imageUrl;
            const isCustomAdded = photo.id.startsWith('custom-added-');

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto({
                  ...photo,
                  imageUrl: currentImg,
                })}
                className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border-2 border-[#F0E6DF] hover:border-[#FF7066] hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-4/3 sm:aspect-square"
              >
                <img
                  src={currentImg}
                  alt="수업 활동 사진"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.JPG')) {
                      target.src = target.src.replace('.JPG', '.jpg');
                    } else if (target.src.endsWith('.jpg')) {
                      target.src = target.src.replace('.jpg', '.JPG');
                    } else if (!target.dataset.failed) {
                      target.dataset.failed = 'true';
                      target.src = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80';
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Camera / Delete overlay icons */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                  {(isAdmin || isCustomAdded) && (
                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="bg-black/70 hover:bg-[#FF7066] text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110 border border-white/40 block"
                      title="사진 변경"
                    >
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleGalleryPhotoUpload(photo.id, e)}
                      />
                    </label>
                  )}

                  {isCustomAdded && (
                    <button
                      onClick={(e) => handleDeleteAddedPhoto(photo.id, e)}
                      className="bg-black/70 hover:bg-red-600 text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110 border border-white/40"
                      title="사진 삭제"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>

                {/* Hover View Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 text-[#FF5A4D] font-black text-xs p-2.5 rounded-full shadow-md flex items-center justify-center transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Photo Image Modal */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in overflow-y-auto cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] sm:max-h-[88vh] bg-stone-900 border-2 border-stone-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-2 cursor-default"
            >
              <img
                src={customGalleryImages[selectedPhoto.id] || selectedPhoto.imageUrl}
                alt={selectedPhoto.title || "수업 활동 사진"}
                className="w-full h-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.failed) {
                    target.dataset.failed = 'true';
                    target.src = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80';
                  }
                }}
              />

              <div className="w-full p-3 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between gap-3 text-white">
                <div className="truncate">
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-100 truncate">
                    {selectedPhoto.title}
                  </h4>
                  {selectedPhoto.date && (
                    <p className="text-xs text-stone-400 font-medium">
                      {selectedPhoto.date} {selectedPhoto.location ? `· ${selectedPhoto.location}` : ''}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Modal photo change button */}
                  {(isAdmin || selectedPhoto.id.startsWith('custom-added-')) && (
                    <label 
                      className="bg-[#FF7066] hover:bg-[#e0564c] text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 cursor-pointer border border-white/30"
                      title="사진 변경"
                    >
                      <Camera className="w-3.5 h-3.5 text-white" />
                      <span className="hidden sm:inline">사진 변경</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleGalleryPhotoUpload(selectedPhoto.id, e)}
                      />
                    </label>
                  )}

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="bg-[#FF5A4D] hover:bg-[#FF4235] text-white p-2 rounded-xl shadow-xl transition-all hover:scale-105 cursor-pointer border border-white/40"
                    title="닫기"
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

