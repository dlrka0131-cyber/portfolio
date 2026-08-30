import React, { useState, useEffect } from 'react';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { GradeLevel, CurriculumStep } from '../types';
import { GraduationCap, Sparkles, CheckCircle2, Clock, Wrench, ArrowRight, Download, FileCode, Check, Award, ChevronRight, Camera, Image as ImageIcon, ZoomIn, Trash2, Layers } from 'lucide-react';
import { SessionThumbnail } from './SessionThumbnail';
import { getItem, saveItem, removeItem, getItemWithFallback, saveSessionItem, removeSessionItem, getSessionAliases } from '../utils/storage';
import { useAdmin } from '../context/AdminContext';
import { WebIcon } from './WebIcon';

interface CurriculumSectionProps {
  onOpenTrialModal: () => void;
}

// Helper function to resize and compress uploaded images to prevent LocalStorage quota errors
const compressAndResizeImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenTrialModal }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('solbit-1');
  const [activeStepModal, setActiveStepModal] = useState<{ step: CurriculumStep; gradeTitle: string } | null>(null);
  const [activeSessionModal, setActiveSessionModal] = useState<{ session: any; stepTitle: string; gradeTitle: string; sessionImgUrl?: string | null; sessionImgKey?: string } | null>(null);
  
  // Custom uploaded images for curriculums stored in localStorage
  const [curriculumImages, setCurriculumImages] = useState<Record<string, string>>({});
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    let cancelled = false;

    // 1. Instant scan of localStorage for any existing curriculum/session images
    const localScan: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('session_img_') || key.startsWith('curriculum_'))) {
        const val = localStorage.getItem(key);
        if (val) localScan[key] = val;
      }
    }
    if (Object.keys(localScan).length > 0) {
      setCurriculumImages((prev) => ({ ...prev, ...localScan }));
    }

    // 2. Fetch images only for the grade currently being viewed.
    // (This used to also eagerly re-fetch every session image for every OTHER grade
    // on every single tab switch, which is what caused the loading stutter on mobile
    // when opening a grade's curriculum.) Results are merged into existing state, so
    // grades viewed earlier stay loaded without being fetched again.
    const loadActiveGradeImages = async () => {
      const activeCur = CURRICULUM_DATA.find((item) => item.id === selectedGrade) || CURRICULUM_DATA[0];
      const keysToLoad: string[] = [];
      if (activeCur.curriculumImageKey) keysToLoad.push(activeCur.curriculumImageKey);
      for (const step of activeCur.steps) {
        if (step.sessions) {
          for (const sess of step.sessions) {
            keysToLoad.push(`session_img_${activeCur.id}_step${step.stepNumber}_sess${sess.sessionNumber}`);
            keysToLoad.push(`session_img_entry-basic_sess${sess.sessionNumber}`);
          }
        }
      }

      const results = await Promise.all(
        keysToLoad.map(async (k) => ({ key: k, val: await getItemWithFallback(k) }))
      );

      if (cancelled) return;

      setCurriculumImages((prev) => {
        const updated = { ...prev };
        for (const res of results) {
          if (res.val) {
            updated[res.key] = res.val;
            const aliases = getSessionAliases(res.key);
            for (const alias of aliases) {
              updated[alias] = res.val;
            }
          }
        }
        return updated;
      });
    };

    loadActiveGradeImages();

    return () => {
      cancelled = true;
    };
  }, [selectedGrade]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageKey: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('이미지 파일 크기는 15MB 이하로 업로드 해주세요.');
        e.target.value = '';
        return;
      }
      try {
        const compressedDataUrl = await compressAndResizeImage(file, 1200, 1200, 0.8);
        if (imageKey.startsWith('session_img_')) {
          await saveSessionItem(imageKey, compressedDataUrl);
        } else {
          await saveItem(imageKey, compressedDataUrl);
        }

        setCurriculumImages((prev) => {
          const updated = { ...prev, [imageKey]: compressedDataUrl };
          if (imageKey.startsWith('session_img_')) {
            const aliases = getSessionAliases(imageKey);
            for (const alias of aliases) {
              updated[alias] = compressedDataUrl;
            }
          }
          return updated;
        });

        // Update modal state if the active modal is for this session
        setActiveSessionModal((prev) => {
          if (prev && prev.sessionImgKey === imageKey) {
            return { ...prev, sessionImgUrl: compressedDataUrl };
          }
          return prev;
        });
      } catch (err) {
        console.error('Failed to upload image', err);
        alert('이미지 파일 처리 중 오류가 발생했습니다.');
      } finally {
        e.target.value = '';
      }
    }
  };

  const handleImageDelete = async (imageKey: string) => {
    if (window.confirm('등록된 커리큘럼 이미지를 삭제하시겠습니까?')) {
      if (imageKey.startsWith('session_img_')) {
        await removeSessionItem(imageKey);
      } else {
        await removeItem(imageKey);
      }
      setCurriculumImages((prev) => {
        const updated = { ...prev };
        delete updated[imageKey];
        if (imageKey.startsWith('session_img_')) {
          const aliases = getSessionAliases(imageKey);
          for (const alias of aliases) {
            delete updated[alias];
          }
        }
        return updated;
      });
      setActiveSessionModal((prev) => {
        if (prev && prev.sessionImgKey === imageKey) {
          return { ...prev, sessionImgUrl: null };
        }
        return prev;
      });
    }
  };

  const activeCurriculum = CURRICULUM_DATA.find((item) => item.id === selectedGrade) || CURRICULUM_DATA[0];
  const currentCurriculumIndex = CURRICULUM_DATA.findIndex((item) => item.id === selectedGrade);
  const nextCurriculumData = currentCurriculumIndex !== -1 ? CURRICULUM_DATA[(currentCurriculumIndex + 1) % CURRICULUM_DATA.length] : null;
  const activeImageKey = activeCurriculum.curriculumImageKey;
  const getDefaultGradeImg = (id: string) => {
    if (id === 'hello-maple') return '/images/hellomaple_1.svg';
    if (id === 'solbit-1' || id === 'solbit-2') return '/grade12.jpg';
    if (id === 'elementary-low' || id === 'elementary-high' || id.includes('34')) return '/grade34.jpg';
    if (id === 'middle' || id === 'high' || id.includes('56')) return '/grade56.jpg';
    return null;
  };
  const currentImage = (activeImageKey ? curriculumImages[activeImageKey] : null) || getDefaultGradeImg(activeCurriculum.id);

  return (
    <section id="curriculum" className="py-20 relative">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm sm:text-base font-black px-6 py-2.5 rounded-full shadow-sm whitespace-nowrap">
            <GraduationCap className="w-5 h-5" />
            <span>STEP BY STEP STEPPING STONE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-indigo-950 tracking-tight whitespace-nowrap">
            📚 학년별 & 학교별 커리큘럼
          </h2>
          <p className="text-indigo-950 font-black text-lg sm:text-2xl leading-relaxed">
            솔빛초등학교 1·2학년 엔트리 & 3D 메타버스, 헬로메이플부터 <br className="hidden sm:inline" />
            초등, 중등, 고등 심화 과정까지 체계적인 차시별 맞춤 코딩 로드맵을 제공합니다.
          </p>
        </div>

        {/* Grade Selector Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-10">
          {CURRICULUM_DATA.map((item) => {
            const isSelected = selectedGrade === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedGrade(item.id)}
                className={`p-4 sm:p-5 rounded-[24px] text-left transition-all duration-300 border-2 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-white shadow-xl scale-[1.02] border-indigo-500 ring-4 ring-indigo-200/80'
                    : 'bg-white/80 hover:bg-white border-white/80 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="p-2.5 bg-indigo-50 rounded-2xl border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0">
                      <WebIcon icon={item.icon} className="w-6 h-6 text-indigo-600" />
                    </span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full whitespace-nowrap shadow-2xs ${item.themeColor}`}>
                      {item.badgeText}
                    </span>
                  </div>
                  <h3 className="font-black text-indigo-950 text-base sm:text-lg leading-tight whitespace-nowrap">
                    {item.gradeTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-900 font-bold mt-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.targetAge}
                  </p>
                </div>

                {/* Bottom Indicator */}
                <div className="mt-4 pt-2.5 border-t-2 border-indigo-100 flex items-center justify-between text-xs sm:text-sm font-black text-indigo-700 whitespace-nowrap">
                  <span>커리큘럼 상세보기</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                </div>

                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Curriculum Detailed Showcase Card */}
        <div className="p-6 sm:p-10 rounded-[32px] border-2 border-indigo-200 shadow-2xl bg-white transition-all duration-300 space-y-8">
          
          {/* Header Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-indigo-100">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="p-3 bg-indigo-100 rounded-2xl border-2 border-indigo-200 text-indigo-700 shrink-0 flex items-center justify-center">
                  <WebIcon icon={activeCurriculum.icon} className="w-8 h-8 text-indigo-700" />
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-indigo-950 whitespace-nowrap">
                  {activeCurriculum.gradeTitle} 과정
                </h3>
              </div>
              <p className="text-indigo-950 font-extrabold text-base sm:text-xl leading-relaxed">
                {activeCurriculum.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  alert(`${activeCurriculum.gradeTitle} 세부 커리큘럼 안내서 샘플 다운로드가 시작됩니다!`);
                }}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-black px-5 py-3 rounded-2xl border-2 border-indigo-200 text-sm flex items-center gap-2 shadow-2xs cursor-pointer whitespace-nowrap transition-transform hover:scale-105"
              >
                <Download className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                <span>커리큘럼 요약서 (PDF)</span>
              </button>

              <button
                onClick={onOpenTrialModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-2xl text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap border-2 border-indigo-500"
              >
                <Sparkles className="w-4.5 h-4.5 text-yellow-300 shrink-0" />
                <span>무료 체험 수업 등록</span>
              </button>
            </div>
          </div>

          {/* Key Features & Tools Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Key Features */}
            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-xs space-y-3">
              <h4 className="font-extrabold text-sm text-indigo-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>핵심 학습 목표 & 특장점</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCurriculum.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-indigo-900/85">
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tools */}
            <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-xs space-y-3">
              <h4 className="font-extrabold text-sm text-indigo-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                <span>사용 교구 및 소프트웨어</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCurriculum.recommendedTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-white/90 text-indigo-900 border border-indigo-100 shadow-2xs"
                  >
                    🛠️ {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Curriculum Custom Image Section (Upload & Viewer) */}
          {(currentImage || isAdmin) && (
            <div className="p-6 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-3xl border border-indigo-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-base text-indigo-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-indigo-600" />
                    <span>커리큘럼 교안 & 강의 자료 이미지</span>
                  </h4>
                  <p className="text-xs text-indigo-900/70 font-medium mt-0.5">
                    {activeCurriculum.gradeTitle} 교안 및 커리큘럼 이미지입니다.
                  </p>
                </div>

                {/* Upload Button (Admin mode only) */}
                {isAdmin && activeImageKey && (
                  <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto transition-transform hover:scale-105">
                    <Camera className="w-4 h-4" />
                    <span>{currentImage ? '이미지 변경' : '커리큘럼 이미지 등록'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, activeImageKey)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Image Preview or Upload Dropzone */}
              {currentImage ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-lg bg-black/90 group max-h-[420px] flex items-center justify-center">
                  <img
                    src={currentImage}
                    alt={`${activeCurriculum.gradeTitle} 커리큘럼 이미지`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain max-h-[420px]"
                  />
                  
                  {/* Overlay Action Buttons (Admin mode only) */}
                  {isAdmin && activeImageKey && (
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                      <button
                        onClick={() => handleImageDelete(activeImageKey)}
                        className="bg-black/70 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer"
                        title="이미지 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                isAdmin && activeImageKey && (
                  <label className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-8 bg-white/60 hover:bg-white/90 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 group-hover:bg-indigo-600 group-hover:text-white text-indigo-600 flex items-center justify-center transition-colors shadow-inner">
                      <Camera className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-indigo-900 group-hover:text-indigo-600 transition-colors block">
                        {activeCurriculum.gradeTitle} 커리큘럼 이미지 추가하기
                      </span>
                      <span className="text-xs text-indigo-900/60 font-medium block mt-1">
                        클릭하여 소장하신 교안 PPT나 원본 커리큘럼 이미지(JPG, PNG)를 업로드하세요
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, activeImageKey)}
                      className="hidden"
                    />
                  </label>
                )
              )}
            </div>
          )}

          {/* Detailed Step & Sessions Showcase */}
          <div className="pt-2 space-y-8">
            {activeCurriculum.steps.map((step) => (
              <div key={step.stepNumber} className="space-y-4">
                
                {/* Step Banner */}
                <div 
                  onClick={() => setActiveStepModal({ step, gradeTitle: activeCurriculum.gradeTitle })}
                  className="bg-indigo-50/80 hover:bg-indigo-100/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border-2 border-indigo-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="p-3 bg-white rounded-2xl border-2 border-indigo-200 transition-transform group-hover:scale-105 shrink-0 shadow-2xs flex items-center justify-center text-indigo-600">
                      <WebIcon icon={step.icon} className="w-7 h-7 text-indigo-600" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-black rounded-full shadow-2xs whitespace-nowrap">
                          STEP {step.stepNumber}
                        </span>
                        <span className="text-xs sm:text-sm font-extrabold text-indigo-800 whitespace-nowrap">{step.subtitle}</span>
                      </div>
                      <h4 className="text-lg sm:text-2xl font-black text-indigo-950 group-hover:text-indigo-600 transition-colors mt-1">{step.title}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm font-black text-indigo-950 shrink-0">
                    <span className="bg-white px-3.5 py-2 rounded-xl border-2 border-indigo-200 flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-2xs">
                      <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{step.duration}</span>
                    </span>
                    <span className="text-sm font-black text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 whitespace-nowrap">
                      <span>단계 상세보기</span>
                      <ChevronRight className="w-4.5 h-4.5" />
                    </span>
                  </div>
                </div>

                {/* Session Grid (If Sessions Exist) */}
                {step.sessions && step.sessions.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs sm:text-sm font-black text-indigo-950 flex items-center gap-2">
                        <Layers className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                        <span>차시별 상세 학습 커리큘럼 ({step.sessions.length}차시)</span>
                      </span>
                    </div>

                    <div className="space-y-4">
                      {step.sessions.map((session) => {
                        const sessionImgKey = `session_img_${activeCurriculum.id}_step${step.stepNumber}_sess${session.sessionNumber}`;
                        const sessionImgUrl =
                          curriculumImages[sessionImgKey] ||
                          curriculumImages[`session_img_entry-basic_sess${session.sessionNumber}`] ||
                          curriculumImages[`session_img_grade1_step1_sess${session.sessionNumber}`] ||
                          session.defaultImage;

                        return (
                          <div
                            key={session.sessionNumber}
                            className="bg-white hover:bg-[#FAF9FF] rounded-2xl p-6 sm:p-7 border-2 border-indigo-200 hover:border-indigo-500 shadow-sm hover:shadow-2xl hover:-translate-y-0.5 transition-all flex flex-col md:flex-row items-stretch gap-6 cursor-pointer group"
                            onClick={() => setActiveSessionModal({ session, stepTitle: step.title, gradeTitle: activeCurriculum.gradeTitle, sessionImgUrl, sessionImgKey })}
                          >
                            {/* Left Text Info - Full Width Flex */}
                            <div className="flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-3">
                                <h5 className="font-black text-xl sm:text-2xl text-indigo-950 group-hover:text-indigo-600 transition-colors leading-snug">
                                  <span className="text-indigo-600 mr-2">{session.sessionNumber}차시.</span>
                                  {session.title}
                                </h5>
                                <div className="text-sm sm:text-base font-extrabold text-indigo-900/90 flex items-center gap-1.5">
                                  <span>🎯 핵심 개념:</span>
                                  <span className="text-indigo-950">{session.concept}</span>
                                </div>
                                <p className="text-base sm:text-lg text-indigo-950/90 font-extrabold leading-relaxed pl-4 border-l-4 border-indigo-500 bg-indigo-50/40 py-1 rounded-r-xl">
                                  {session.description}
                                </p>
                              </div>

                              <div className="pt-3.5 border-t-2 border-indigo-100 flex items-center justify-between text-sm sm:text-base font-black text-indigo-600 group-hover:text-indigo-700">
                                <span className="flex items-center gap-2">
                                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                                  <span>상세 학습목표 & 1:1 맞춤 코칭 내용 보기</span>
                                </span>
                                <span className="flex items-center gap-1.5 text-indigo-600 font-black">
                                  <span>상세보기</span>
                                  <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </div>
                            </div>

                            {/* Right Side Image Display & Upload Container */}
                            <div 
                              className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col bg-slate-900/5 rounded-2xl border-2 border-indigo-100 hover:border-indigo-400 transition-all overflow-hidden relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="relative w-full h-[160px] flex items-center justify-center overflow-hidden bg-slate-100 group/img">
                                <SessionThumbnail
                                  sessionNumber={session.sessionNumber}
                                  title={session.title}
                                  concept={session.concept}
                                  sessionImgUrl={sessionImgUrl}
                                />
                                
                                {/* Top Right Overlay Control Bar */}
                                <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
                                  {sessionImgUrl && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxImage(sessionImgUrl);
                                      }}
                                      className="p-2 bg-white/95 hover:bg-white text-indigo-950 rounded-full text-xs shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                                      title="크게 보기"
                                    >
                                      <ZoomIn className="w-4 h-4" />
                                    </button>
                                  )}
                                  {isAdmin && curriculumImages[sessionImgKey] && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleImageDelete(sessionImgKey);
                                      }}
                                      className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                                      title="등록된 사진 삭제"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                  {isAdmin && (
                                    <label
                                      className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 border border-white/20"
                                      title="사진 등록/변경"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Camera className="w-4.5 h-4.5 text-white" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(e, sessionImgKey)}
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Next Curriculum Navigation Button */}
          {nextCurriculumData && (
            <div className="mt-10 pt-8 border-t-2 border-indigo-100 flex justify-center">
              <button
                onClick={() => {
                  setSelectedGrade(nextCurriculumData.id);
                  const el = document.getElementById('curriculum');
                  if (el) {
                    el.scrollIntoView({ behavior: 'auto' });
                  }
                }}
                className="w-full sm:w-auto min-w-[320px] sm:min-w-[480px] bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-lg sm:text-2xl px-8 py-5 sm:py-6 rounded-2xl transition-all duration-150 shadow-md hover:shadow-xl active:scale-98 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span>다음 과정 ({nextCurriculumData.gradeTitle}) 바로가기</span>
                <ArrowRight className="w-6 sm:w-7 h-6 sm:h-7 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Image Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={lightboxImage}
              alt="커리큘럼 이미지 확대 보기"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white font-black text-sm hover:scale-105 transition-transform cursor-pointer bg-[#FF5A4D] hover:bg-[#FF4235] px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1"
            >
              ✕ 닫기
            </button>
          </div>
        </div>
      )}

      {/* Step Detail Modal */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 bg-indigo-950/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/80 animate-in zoom-in-95 duration-200 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-600 flex items-center justify-center">
                  <WebIcon icon={activeStepModal.step.icon} className="w-6 h-6 text-indigo-600" />
                </span>
                <div>
                  <span className="text-xs font-black text-indigo-600">{activeStepModal.gradeTitle} - STEP {activeStepModal.step.stepNumber}</span>
                  <h3 className="text-xl font-black text-indigo-900">{activeStepModal.step.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStepModal(null)}
                className="w-9 h-9 rounded-full bg-[#FF5A4D] hover:bg-[#FF4235] text-white font-black flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer shrink-0 border-2 border-white"
                title="닫기"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
                <h4 className="font-extrabold text-indigo-900 mb-1">상세 과정 설명:</h4>
                <p className="text-indigo-900/80 leading-relaxed font-medium">{activeStepModal.step.description}</p>
              </div>

              <div>
                <h4 className="font-extrabold text-indigo-900 mb-2">수강 기간 & 추천 수업 방식:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-indigo-900/80">
                  <div className="bg-white/70 p-2.5 rounded-xl border border-white/80">⏱️ 수강기간: {activeStepModal.step.duration}</div>
                  <div className="bg-white/70 p-2.5 rounded-xl border border-white/80">👥 인원: 소수정예 6명 이내</div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-indigo-900 mb-2">주요 실습 프로젝트 예시:</h4>
                <ul className="list-disc list-inside space-y-1 text-indigo-900/80 font-medium">
                  {activeStepModal.step.outcomes.map((out, idx) => (
                    <li key={idx}>✨ {out}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-100/70 rounded-2xl border border-amber-200/70 text-amber-950 text-xs font-semibold flex items-center gap-2">
                <span>💡 1:1 맞춤 진도 관리로 차근차근 완성합니다!</span>
              </div>
            </div>

            <div className="pt-3 border-t border-indigo-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveStepModal(null)}
                className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-indigo-900 font-bold text-xs border border-white cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setActiveStepModal(null);
                  onOpenTrialModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>무료 체험 수업 신청하기</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Session Detail Modal */}
      {activeSessionModal && (
        <div className="fixed inset-0 z-50 bg-indigo-950/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-9 shadow-2xl border-2 border-indigo-200 animate-in zoom-in-95 duration-200 space-y-6 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b-2 border-indigo-100">
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-xs sm:text-sm font-extrabold text-indigo-600 block">
                    {activeSessionModal.gradeTitle} · {activeSessionModal.stepTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-0.5">
                    <span className="text-indigo-600 mr-2">{activeSessionModal.session.sessionNumber}차시.</span>
                    {activeSessionModal.session.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveSessionModal(null)}
                className="w-9 h-9 rounded-full bg-[#FF5A4D] hover:bg-[#FF4235] text-white font-black flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer shrink-0 border-2 border-white"
                title="닫기"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              {/* Photo Display & Upload Section */}
              <div className="rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-sm bg-slate-100 relative group flex flex-col items-center">
                {activeSessionModal.sessionImgUrl ? (
                  <div className="relative w-full max-h-72 overflow-hidden flex items-center justify-center bg-slate-900/10">
                    <img 
                      src={activeSessionModal.sessionImgUrl} 
                      alt={`${activeSessionModal.session.sessionNumber}차시`} 
                      className="max-h-72 w-full object-cover cursor-pointer"
                      onClick={() => setLightboxImage(activeSessionModal.sessionImgUrl)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-40 flex flex-col items-center justify-center bg-indigo-50/50 p-4 text-indigo-800">
                    <ImageIcon className="w-10 h-10 text-indigo-400 mb-2" />
                    <span className="text-sm font-bold">등록된 차시 사진이 없습니다</span>
                  </div>
                )}

                {/* Upload Action Bar inside modal (Admin mode only) */}
                {isAdmin && activeSessionModal.sessionImgKey && (
                  <div className="w-full bg-indigo-50/90 p-3 border-t-2 border-indigo-100 flex items-center justify-between gap-3">
                    <span className="text-xs sm:text-sm font-extrabold text-indigo-950 flex items-center gap-1.5">
                      <Camera className="w-4.5 h-4.5 text-indigo-600" />
                      <span>차시 실제 수업 사진/교안 등록</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {activeSessionModal.sessionImgKey && curriculumImages[activeSessionModal.sessionImgKey] && (
                        <button
                          onClick={() => handleImageDelete(activeSessionModal.sessionImgKey!)}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>사진 삭제</span>
                        </button>
                      )}
                      <label className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105 active:scale-95">
                        <Camera className="w-4 h-4" />
                        <span>사진 Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, activeSessionModal.sessionImgKey!)}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Core Concept Box */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border-2 border-indigo-200 space-y-2">
                <div className="text-sm sm:text-base font-black text-indigo-950 flex items-center gap-1.5">
                  <span>🎯 핵심 코딩 개념:</span>
                  <span className="text-indigo-700">{activeSessionModal.session.concept}</span>
                </div>
                <p className="text-base sm:text-lg text-indigo-950/90 font-extrabold leading-relaxed pt-1">
                  {activeSessionModal.session.description}
                </p>
              </div>

              {/* Coaching & Method */}
              <div className="space-y-2.5">
                <h4 className="font-black text-base sm:text-lg text-indigo-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>수업 진행 방식 & 1:1 맞춤 코칭</span>
                </h4>
                <ul className="space-y-2 text-sm sm:text-base text-indigo-950 font-bold leading-relaxed">
                  <li className="flex items-start gap-2.5 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <span className="text-indigo-600 font-black text-lg">•</span>
                    <span>개별 학생 눈높이에 맞춘 1:1 맞춤 코칭으로 블록 결합과 논리적 순서를 차근차근 점검합니다.</span>
                  </li>
                  <li className="flex items-start gap-2.5 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <span className="text-indigo-600 font-black text-lg">•</span>
                    <span>수업 종료 후 완성한 프로젝트를 직접 시연하고 모의 발표하며 자신감을 기릅니다.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200 text-amber-950 text-sm sm:text-base font-black flex items-center gap-2">
                <span>💡 오락실 미니게임 연계로 수업 몰입도가 뛰어납니다!</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-indigo-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveSessionModal(null)}
                className="px-5 py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-black text-sm border-2 border-indigo-200 cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setActiveSessionModal(null);
                  onOpenTrialModal();
                }}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <Sparkles className="w-4.5 h-4.5 text-yellow-300" />
                <span>이 차시 무료 체험 신청</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
