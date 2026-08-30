import React, { useState, useEffect } from 'react';
import { Phone, Youtube, CheckCircle, Mail, Sparkles, Award, GraduationCap, ArrowRight, UserCheck, Code2, Camera } from 'lucide-react';
import { getItem, saveItem, removeItem } from '../utils/storage';
import { compressImage } from '../utils/imageCompressor';
import { useAdmin } from '../context/AdminContext';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
  onExploreCurriculum: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrialModal,
  onExploreCurriculum
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const loadProfileImg = async () => {
      const localSaved = localStorage.getItem('instructor_profile_img');
      if (localSaved) {
        setProfileImg(localSaved);
        return;
      }

      const saved = await getItem('instructor_profile_img');
      if (saved) {
        setProfileImg(saved);
        return;
      }

      // Default to static public image if present
      setProfileImg('profile.jpg');
    };
    loadProfileImg();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 1000, 1000, 0.85);
        setProfileImg(compressed);
        await saveItem('instructor_profile_img', compressed);
      } catch (err) {
        console.error('Failed to compress/save profile image:', err);
      }
    }
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('010-2416-5282');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="hero" className="relative pt-6 pb-12 bg-[#FFF8F0] text-[#383331] overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Giant Main Cute Banner */}
        <div className="bg-gradient-to-b from-[#FFF0DF] via-[#FFF5E9] to-[#FFF8F0] border-2 border-[#FAD8C8] rounded-[36px] p-4 sm:p-8 text-center space-y-5 shadow-sm relative overflow-hidden">
          
          {/* 3D Spline Interactive Bunny Canvas with Overlaid Title & Subtitle */}
          <div className="relative w-full h-[420px] sm:h-[540px] md:h-[620px] rounded-[32px] overflow-hidden border-4 border-white shadow-2xl bg-[#FFF8F0]">
            
            {/* Overlaid Title & Subtitle directly on top of the Bunny Canvas (Text Only) */}
            <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-10 w-[92%] sm:w-auto text-center space-y-2 pointer-events-none">
              <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#FF5A4D] whitespace-nowrap [text-shadow:_0_2px_10px_rgba(255,255,255,0.9),_0_0_20px_rgba(255,255,255,1)]">
                반짝이는 상상을 코딩으로
              </h1>
              <p className="text-xs sm:text-lg md:text-xl font-black text-[#4A3E39] whitespace-nowrap [text-shadow:_0_1px_8px_rgba(255,255,255,0.9),_0_0_15px_rgba(255,255,255,1)]">
                아이들의 창의력을 깨우는 즐거운 코딩 놀이터
              </p>
            </div>

            {/* Spline Iframe Background */}
            <div className="w-[108%] -ml-[4%] h-[calc(100%+150px)] -mt-2 -mb-[142px] transform scale-105 origin-top">
              <iframe
                src="https://my.spline.design/bunnycute-KpfnuAR1HuB7DaRbxqUbo7bw/"
                frameBorder="0"
                width="100%"
                height="100%"
                className="w-full h-full pointer-events-none"
                title="Spline 3D Cute Bunny"
              ></iframe>
            </div>
          </div>

          {/* Quick Start Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={onExploreCurriculum}
              className="bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-7 sm:px-8 py-3.5 rounded-2xl text-sm sm:text-base shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border-2 border-[#FF5A4D] whitespace-nowrap"
            >
              <Code2 className="w-5 h-5 text-white shrink-0" />
              <span>커리큘럼 구경하기</span>
            </button>
            <button
              onClick={onOpenTrialModal}
              className="bg-white hover:bg-[#FFF3E6] text-[#FF5A4D] font-black px-7 sm:px-8 py-3.5 rounded-2xl text-sm sm:text-base border-2 border-[#FFC8C2] shadow-sm hover:scale-105 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5 text-[#FF7066] shrink-0" />
              <span>1:1 수업 문의하기</span>
            </button>
          </div>
        </div>

        {/* Instructor Greeting Card */}
        <div className="bg-white border-2 border-[#F5E2D5] rounded-3xl p-6 sm:p-9 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center gap-2.5 text-2xl sm:text-3xl font-black text-[#2D2826]">
            <span>🚀</span>
            <h2>코딩으로 그리는 아이들의 꿈, AI로 넓히는 무한한 가능성</h2>
          </div>

          <p className="text-[#4A3E39] font-bold text-base sm:text-lg leading-relaxed">
            엔트리코딩, 로봇, 메타버스, 그리고 AI 바이브코딩까지 — 기술을 두려워하지 않고 상상을 마음껏 펼치는 즐거운 창의 놀이터를 만듭니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-sm sm:text-base font-extrabold">
            <div className="bg-[#FFEBE8] p-4 rounded-2xl border-2 border-[#FFC8C2] flex items-center gap-2.5 text-[#D93829] shadow-2xs">
              <span className="text-xl">🎯</span>
              <span>초·중·고 학생 맞춤형 미래 교육</span>
            </div>
            <div className="bg-[#E6F8EB] p-4 rounded-2xl border-2 border-[#BDE8C6] flex items-center gap-2.5 text-[#1B6E32] shadow-2xs">
              <CheckCircle className="w-5 h-5 text-[#1B6E32] shrink-0" />
              <span>엔트리 · 로봇 · AI · AR/VR · 메타버스</span>
            </div>
            <div className="bg-[#FFF4D6] p-4 rounded-2xl border-2 border-[#FFE399] flex items-center gap-2.5 text-[#8C6200] shadow-2xs">
              <span className="text-xl">✨</span>
              <span>15년 경력 3,000명 수강생 노하우</span>
            </div>
          </div>
        </div>

        {/* Bottom Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Clean Instructor Photo Card with Elegant Gradient Border */}
          <div className="lg:col-span-7 p-[2px] bg-gradient-to-r from-[#00E5FF]/40 via-teal-400/30 to-amber-400/30 rounded-[28px] shadow-xl hover:shadow-cyan-500/10 transition-all flex flex-col">
            <div className="bg-[#161618] rounded-[26px] p-3.5 sm:p-5 relative overflow-hidden flex flex-col items-center justify-center text-white h-full">
              
              {/* Subtle Gradient Glow in Background */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Instructor Photo Box or Upload Prompt - Full Width & Wide Aspect Ratio */}
              <div className="relative w-full h-64 sm:h-80 lg:h-88 rounded-2xl overflow-hidden border border-zinc-700/80 shadow-lg bg-zinc-900/90 group flex flex-col items-center justify-center text-center">
                {profileImg ? (
                  <>
                    <img
                      src={profileImg}
                      alt="김정이 강사 프로필"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.retriedPath && target.src.endsWith('profile.jpg') && !target.src.endsWith('images/profile.jpg')) {
                          target.dataset.retriedPath = 'true';
                          target.src = 'images/profile.jpg';
                        } else {
                          setProfileImg(null);
                        }
                      }}
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Change & Delete Photo Overlay Buttons (Admin mode only) */}
                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                        <label 
                          className="bg-black/70 hover:bg-[#00E5FF] hover:text-black text-white px-3 py-1.5 rounded-full cursor-pointer transition-all text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5" 
                          title="사진 변경하기"
                        >
                          <Camera className="w-4 h-4" />
                          <span>사진 변경</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={async () => {
                            setProfileImg(null);
                            await removeItem('instructor_profile_img');
                          }}
                          className="bg-black/70 hover:bg-rose-500 text-white px-2.5 py-1.5 rounded-full cursor-pointer transition-all text-xs font-bold shadow-md backdrop-blur-md"
                          title="사진 삭제"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 text-left pointer-events-none z-10">
                      <span className="bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 backdrop-blur-md text-xs font-black px-3 py-1 rounded-full shadow-xs inline-block">
                        김정이 강사 프로필
                      </span>
                    </div>
                  </>
                ) : (
                  isAdmin ? (
                    <label className="w-full h-full flex flex-col items-center justify-center gap-3.5 cursor-pointer hover:bg-zinc-800/80 transition-colors p-6 border-2 border-dashed border-zinc-700 hover:border-[#00E5FF] rounded-2xl group/upload">
                      <div className="w-16 h-16 bg-zinc-800 group-hover/upload:bg-[#00E5FF]/20 rounded-full flex items-center justify-center text-[#00E5FF] transition-all transform group-hover/upload:scale-110 shadow-inner">
                        <Camera className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-lg font-black text-white block group-hover/upload:text-[#00E5FF] transition-colors">
                          강사 프로필 사진 등록
                        </span>
                        <span className="text-xs sm:text-sm text-zinc-300 font-medium block">
                          클릭하여 소장하신 강사 사진을 업로드하세요
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-zinc-400">
                      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
                        <UserCheck className="w-8 h-8" />
                      </div>
                      <span className="text-base font-black text-white">김정이 대표강사</span>
                      <span className="text-xs text-zinc-400">초·중·고 코딩 & AI 리터러시 전문 지도</span>
                    </div>
                  )
                )}
              </div>

            </div>
          </div>

          {/* Right Column (Contact & YouTube Buttons Only) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            
            {/* Phone Card */}
            <div 
              onClick={handleCopyPhone}
              className="bg-white hover:bg-[#FFF8F0] border-2 border-[#F5E2D5] hover:border-[#FF7066] rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-14 h-14 bg-[#FFEBE8] rounded-2xl flex items-center justify-center border-2 border-[#FFC8C2] group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <Phone className="w-7 h-7 text-[#FF5A4D]" />
                </div>
                <div className="truncate">
                  <span className="text-xs sm:text-sm text-[#7A6B63] font-black block mb-0.5">전화 및 클래스 문의</span>
                  <span className="text-sm sm:text-base xl:text-lg font-black text-[#2D2826] group-hover:text-[#FF5A4D] transition-colors truncate block">
                    김정이 강사 : 010 - 2416 - 5282
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm bg-[#FFF0E6] text-[#FF5A4D] group-hover:bg-[#FF7066] group-hover:text-white px-4 py-2.5 rounded-xl font-black border border-[#FFD2BC] shrink-0 shadow-2xs transition-all whitespace-nowrap">
                {copiedPhone ? '복사완료!' : '번호 복사'}
              </span>
            </div>

            {/* YouTube Card */}
            <a
              href="https://www.youtube.com/@jamjamclass"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#FFF8F0] border-2 border-[#F5E2D5] hover:border-[#FF4242] rounded-3xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-14 h-14 bg-[#FFEBE8] rounded-2xl flex items-center justify-center border-2 border-[#FFC8C2] group-hover:scale-105 transition-transform shrink-0 shadow-2xs">
                  <Youtube className="w-7 h-7 text-[#FF0000]" />
                </div>
                <div className="truncate">
                  <span className="text-xs sm:text-sm text-[#7A6B63] font-black block mb-0.5">공식 유튜브 채널</span>
                  <span className="text-base sm:text-lg font-black text-[#2D2826] group-hover:text-[#FF4242] transition-colors truncate block">
                    유튜브에서 시연 영상 보기
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm bg-[#FFF0E6] text-[#FF4242] group-hover:bg-[#FF4242] group-hover:text-white px-4 py-2.5 rounded-xl font-black border border-[#FFD2BC] shrink-0 shadow-2xs transition-all whitespace-nowrap">
                채널방문
              </span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

