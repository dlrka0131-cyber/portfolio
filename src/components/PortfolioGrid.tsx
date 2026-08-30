import React, { useState, useEffect } from 'react';
import { PORTFOLIO_CATEGORIES } from '../data/portfolioData';
import { PortfolioItem, PortfolioCategory } from '../types';
import { Sparkles, ArrowUpRight, Search, FileCode2, ChevronRight, Check, BookOpen, FolderOpen, Camera } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { getItem, saveItem } from '../utils/storage';
import { useAdmin } from '../context/AdminContext';
import { WebIcon } from './WebIcon';

interface PortfolioGridProps {
  onSelectItem: (item: PortfolioItem) => void;
  onOpenInquiry: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectItem, onOpenInquiry }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customMainImages, setCustomMainImages] = useState<Record<string, string>>({});
  const [customCategoryImages, setCustomCategoryImages] = useState<Record<string, string>>({});
  const { isAdmin } = useAdmin();

  useEffect(() => {
    // Load custom main images and category images from storage (IndexedDB / localStorage / Firestore)
    const loadImages = async () => {
      const itemMap: Record<string, string> = {};
      const catMap: Record<string, string> = {};

      // 1. Instant scan of localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          if (key.startsWith('category_img_')) {
            const catKey = key.replace('category_img_', '');
            const val = localStorage.getItem(key);
            if (val) catMap[catKey] = val;
          } else if (key.startsWith('main_img_')) {
            const itemId = key.replace('main_img_', '');
            const val = localStorage.getItem(key);
            if (val) itemMap[itemId] = val;
          }
        }
      }

      if (Object.keys(itemMap).length > 0 || Object.keys(catMap).length > 0) {
        setCustomMainImages({ ...itemMap });
        setCustomCategoryImages({ ...catMap });
      }

      // 2. Parallel async fetch from storage utility
      const catPromises = PORTFOLIO_CATEGORIES.map(async (cat) => {
        const img = await getItem(`category_img_${cat.key}`);
        return { key: cat.key, img };
      });

      const allItems = PORTFOLIO_CATEGORIES.flatMap((cat) => cat.items);
      const itemPromises = allItems.map(async (item) => {
        const img = await getItem(`main_img_${item.id}`);
        return { id: item.id, img };
      });

      const [catResults, itemResults] = await Promise.all([
        Promise.all(catPromises),
        Promise.all(itemPromises),
      ]);

      for (const res of catResults) {
        if (res.img) catMap[res.key] = res.img;
      }
      for (const res of itemResults) {
        if (res.img) itemMap[res.id] = res.img;
      }

      setCustomMainImages({ ...itemMap });
      setCustomCategoryImages({ ...catMap });
    };
    loadImages();
  }, []);

  const handleCategoryImageUpload = async (categoryKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 1200, 1200, 0.85);
      await saveItem(`category_img_${categoryKey}`, compressed);
      setCustomCategoryImages((prev) => ({
        ...prev,
        [categoryKey]: compressed,
      }));
    } catch (err) {
      console.error('Category image upload error:', err);
      alert('사진 업로드 중 오류가 발생했습니다.');
    }
  };

  // Filter logic
  const filteredCategories = PORTFOLIO_CATEGORIES.map((cat) => {
    if (activeCategoryFilter !== 'all' && cat.key !== activeCategoryFilter) {
      return null;
    }

    const items = cat.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (searchQuery && items.length === 0) {
      return null;
    }

    return {
      ...cat,
      items: searchQuery ? items : cat.items
    };
  }).filter(Boolean) as PortfolioCategory[];

  return (
    <section id="portfolio" className="py-16 bg-[#FFF8F0] text-[#383331]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F5E2D5] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#FFEBE8] text-[#FF5A4D] border border-[#FFC8C2] font-black px-4 py-1.5 rounded-2xl text-xs sm:text-sm shadow-2xs">
              <BookOpen className="w-4 h-4 text-[#FF7066]" />
              <span>📖 학년별 맞춤 커리큘럼 및 자료실</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D2826] tracking-tight flex items-center gap-2">
              <span>수업 & 지도안</span>
              <span className="text-[#FF6F59]">포트폴리오</span>
            </h2>
            <p className="text-[#6B5B52] text-sm max-w-2xl font-medium">
              클릭하시면 각 지도안의 차시별 세부 목표, 학생 창작 작품, 사진 및 PPT 자료를 확인하실 수 있습니다.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px] sm:min-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7B72]" />
            <input
              type="text"
              placeholder="지도안, 엔트리, AI, 햄스터봇 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#F5E2D5] rounded-2xl text-xs text-[#2D2826] placeholder-[#A39288] focus:outline-none focus:border-[#FF7066] shadow-2xs transition-colors"
            />
          </div>
        </div>

        {/* Category Filters Pill Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategoryFilter === 'all'
                ? 'bg-[#FF7066] text-white font-black shadow-xs'
                : 'bg-white text-[#6B5B52] hover:bg-[#FFF0E6] border border-[#F5E2D5]'
            }`}
          >
            전체 보기 ({PORTFOLIO_CATEGORIES.reduce((acc, c) => acc + c.items.length, 0)})
          </button>

          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategoryFilter(cat.key)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                activeCategoryFilter === cat.key
                  ? 'bg-[#FF7066] text-white font-black shadow-xs'
                  : 'bg-white text-[#6B5B52] hover:bg-[#FFF0E6] border border-[#F5E2D5]'
              }`}
            >
              <WebIcon icon={cat.icon} className="w-4 h-4" />
              <span>{cat.title}</span>
              <span className="text-[10px] bg-[#FFEAE5] text-[#FF5A4D] px-1.5 py-0.2 rounded-full">
                {cat.items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
          {filteredCategories.map((category) => {
            const firstItem = category.items[0];
            const defaultStatic = category.key === 'grade12' ? 'grade12.jpg' : category.key === 'grade34' ? 'grade34.jpg' : category.key === 'grade56' ? 'grade56.jpg' : null;
            const categoryBannerImg = customCategoryImages[category.key] || defaultStatic || (firstItem ? (customMainImages[firstItem.id] || firstItem.imageUrl) : null);

            return (
              <div
                key={category.key}
                className="bg-white border-2 border-[#F0E6DF] hover:border-[#FF7066] rounded-[28px] p-6.5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#F5E2D5]">
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 bg-[#FFF5EE] rounded-2xl border border-[#FFD2BC] shadow-2xs flex items-center justify-center text-[#FF7066]">
                        <WebIcon icon={category.icon} className="w-6 h-6 text-[#FF7066]" />
                      </span>
                      <h3 className="font-black text-lg sm:text-xl xl:text-2xl text-[#2D2826] group-hover:text-[#FF5A4D] transition-colors truncate">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Representative Banner Preview with Camera Upload Button (Admin Only) */}
                  <div className="w-full aspect-video rounded-2xl bg-[#FFF8F6] border-2 border-[#FFC8C2] relative overflow-hidden flex items-center justify-center group/cardImg">
                    {categoryBannerImg ? (
                      <img
                        src={categoryBannerImg}
                        alt={category.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('grade12.jpg') && !target.src.includes('images/')) {
                            target.src = 'images/grade12.jpg';
                          } else if (target.src.includes('grade34.jpg') && !target.src.includes('images/')) {
                            target.src = 'images/grade34.jpg';
                          } else if (target.src.includes('grade56.jpg') && !target.src.includes('images/')) {
                            target.src = 'images/grade56.jpg';
                          }
                        }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="space-y-1.5 text-center p-4">
                        <WebIcon icon={category.icon} className="w-10 h-10 mx-auto text-[#FF7066]" />
                        <span className="text-sm font-black text-[#FF5A4D] block">
                          {category.title} 맞춤 지도안 & 커리큘럼
                        </span>
                      </div>
                    )}

                    {/* Camera Button shown strictly in Admin mode for category banner */}
                    {isAdmin && (
                      <label 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2.5 right-2.5 bg-[#FF7066] hover:bg-[#e0564c] text-white p-2 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 border border-white/40 z-10"
                        title="카테고리 대표 사진 등록/변경"
                      >
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleCategoryImageUpload(category.key, e)}
                        />
                      </label>
                    )}
                  </div>

                  {/* Items List inside Category */}
                  <ul className="space-y-3">
                    {category.items.map((item) => {
                      const grade = item.targetGrade || '';
                      const catKey = category.key;

                      let itemCardStyle = 'bg-[#FFF9F6] hover:bg-[#FFEBE8] border-2 border-[#FFE0D8] hover:border-[#FF8D7B] text-[#2D2826] hover:text-[#FF5A4D]';
                      let chevronColor = 'text-[#FF7066]';
                      let iconColor = 'text-[#FF7066]';

                      if (catKey === 'grade12' || grade.includes('1') || grade.includes('2')) {
                        itemCardStyle = 'bg-[#FFFDF2] hover:bg-[#FFF8D6] border-2 border-[#FFE885] hover:border-[#F2C010] text-[#4A3800] hover:text-[#000000]';
                        chevronColor = 'text-[#D49E00]';
                        iconColor = 'text-[#D49E00]';
                      } else if (catKey === 'grade34' || grade.includes('3') || grade.includes('4')) {
                        itemCardStyle = 'bg-[#F2FAF4] hover:bg-[#E1F5E5] border-2 border-[#A8E6B5] hover:border-[#2E7D32] text-[#134E1A] hover:text-[#000000]';
                        chevronColor = 'text-[#2E7D32]';
                        iconColor = 'text-[#2E7D32]';
                      } else if (catKey === 'grade56' || grade.includes('5') || grade.includes('6')) {
                        itemCardStyle = 'bg-[#F2F7FF] hover:bg-[#E2EEFF] border-2 border-[#B1D1FF] hover:border-[#1E62D0] text-[#0F3268] hover:text-[#000000]';
                        chevronColor = 'text-[#1E62D0]';
                        iconColor = 'text-[#1E62D0]';
                      }

                      return (
                        <li
                          key={item.id}
                          onClick={() => onSelectItem(item)}
                          className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between group/item shadow-2xs ${itemCardStyle}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2 py-1">
                            <span className="p-2 rounded-xl bg-white/90 border border-black/5 shadow-2xs group-hover/item:scale-110 transition-transform flex items-center justify-center min-w-[36px] min-h-[36px]">
                              <WebIcon icon={item.typeIcon} className={`w-5 h-5 ${iconColor}`} />
                            </span>
                            <span className="text-sm sm:text-base xl:text-lg font-black truncate transition-colors leading-snug">
                              {item.title}
                            </span>
                          </div>

                          <div className={`flex items-center gap-1 shrink-0 ${chevronColor} group-hover/item:translate-x-1 transition-transform`}>
                            <ChevronRight className="w-6 h-6" />
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                </div>

                {/* Card Bottom Action Button */}
                <div className="pt-4 mt-4 border-t-2 border-[#F5E2D5]">
                  <button
                    onClick={() => alert('지도안 세부자료는 추후 업데이트될 예정입니다.')}
                    className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black py-3.5 px-4 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-transform hover:scale-102"
                  >
                    <FolderOpen className="w-5 h-5 text-white" />
                    <span>지도안 세부보기</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#F0E6DF] p-8 space-y-3">
            <p className="text-[#6B5B52] font-extrabold text-base">
              검색어 "{searchQuery}"에 해당하는 수업 자료를 찾지 못했습니다.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="bg-[#FF7066] text-white font-bold px-4 py-2 rounded-xl text-xs"
            >
              전체 검색 결과 다시 보기
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
