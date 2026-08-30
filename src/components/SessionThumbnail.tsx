import React, { useState, useEffect } from 'react';

interface SessionThumbnailProps {
  sessionNumber: number;
  title: string;
  concept: string;
  sessionImgUrl?: string | null;
  onLightbox?: (url: string) => void;
}

export const SessionThumbnail: React.FC<SessionThumbnailProps> = ({
  sessionNumber,
  title,
  concept,
  sessionImgUrl,
}) => {
  const [hasPropError, setHasPropError] = useState(false);
  const [staticErrorCount, setStaticErrorCount] = useState(0);

  useEffect(() => {
    setHasPropError(false);
  }, [sessionImgUrl]);

  // Priority 1: User-uploaded or passed image prop
  if (sessionImgUrl && !hasPropError) {
    const isSvg = sessionImgUrl.endsWith('.svg') || sessionImgUrl.includes('.svg');
    return (
      <img
        src={sessionImgUrl}
        alt={`${sessionNumber}차시`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasPropError(true)}
        className={`w-full h-full rounded-xl transition-all duration-300 group-hover/img:scale-[1.03] ${
          isSvg ? 'object-contain bg-white/90 p-0.5' : 'object-cover'
        }`}
      />
    );
  }

  // Priority 2: Static images if they exist
  const staticPath1 = `/images/1학년 ${sessionNumber}차시.png`;
  const staticPath2 = `/images/grade1_${sessionNumber}.png`;

  let staticSrc: string | null = null;
  if (staticErrorCount === 0) {
    staticSrc = staticPath1;
  } else if (staticErrorCount === 1) {
    staticSrc = staticPath2;
  }

  if (staticSrc && staticErrorCount < 2) {
    return (
      <img
        src={staticSrc}
        alt={`${sessionNumber}차시`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setStaticErrorCount((prev) => prev + 1)}
        className="w-full h-full object-cover rounded-xl transition-all duration-300"
      />
    );
  }

  // Fallback to custom Entry slide graphics when no custom image file is provided
  switch (sessionNumber) {
    case 1:
      return (
        <div className="w-full h-full min-h-[150px] bg-sky-100/90 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-sky-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <span className="text-xs">🦋 🌸</span>
          </div>
          <div className="my-auto border-2 border-dashed border-sky-400 bg-white/95 rounded-xl px-4 py-2.5 shadow-xs max-w-[92%]">
            <h6 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-tight">자유꾸미기 활동</h6>
            <span className="text-[11px] font-bold text-sky-600 block mt-1">솔빛초 1학년 엔트리 작품</span>
          </div>
          <div className="w-full flex items-center justify-between px-1 text-xs">
            <span>🌱</span>
            <span className="text-[10px] font-extrabold text-sky-800">참샘스쿨 × 솔빛초</span>
            <span>🌼</span>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 p-3 flex flex-col items-center justify-between relative overflow-hidden rounded-xl border-2 border-purple-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <span className="text-[10px] font-black text-purple-600">오브젝트 이동</span>
          </div>
          <div className="my-auto space-y-2 flex flex-col items-center">
            {/* Entry Code Block Graphic */}
            <div className="bg-purple-600 text-white font-black text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 border-l-4 border-purple-900">
              <span>이동 방향으로</span>
              <span className="bg-amber-300 text-slate-900 px-2 py-0.5 rounded-full text-xs font-black shadow-2xs">10</span>
              <span>만큼 움직이기</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-amber-700 flex items-center justify-center text-sm shadow-xs">
                🏀
              </div>
              <span className="text-purple-700 font-extrabold text-sm animate-pulse">➔ ➔</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-purple-700">엔트리 블록 코딩 실습</span>
        </div>
      );
    case 3:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-amber-100 via-amber-50 to-yellow-100 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-amber-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <span className="text-xs">🎵 🎶</span>
          </div>
          <div className="my-auto bg-white/95 border-2 border-amber-400 rounded-2xl px-4 py-2 shadow-xs">
            <h6 className="text-base font-black text-amber-950">애니메이션 만들기</h6>
            <span className="text-[11px] text-amber-700 font-extrabold block mt-0.5">벽 판정 & 소리 연출</span>
          </div>
          <div className="text-3xl my-0.5 animate-bounce">🐸</div>
        </div>
      );
    case 4:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-emerald-100 via-rose-50 to-rose-100 p-3 flex flex-col items-center justify-between relative overflow-hidden rounded-xl border-2 border-rose-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <div className="flex items-center gap-1 text-base">
              <span>🦊</span>
              <span>🐰</span>
            </div>
          </div>
          <div className="my-auto bg-rose-400 border-2 border-rose-500 text-white font-black text-base px-5 py-2 rounded-2xl shadow-md">
            점프 만들기
          </div>
          <span className="text-[10px] font-bold text-rose-800">모양 바꾸기 & 점프 메커니즘</span>
        </div>
      );
    case 5:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-indigo-700 shadow-inner">
          <div className="absolute top-2 left-2 text-amber-300 text-xs">✨</div>
          <div className="absolute top-2 right-3 text-amber-300 text-xs">⭐</div>
          <div className="w-full flex items-center justify-end px-1 z-10">
            <span className="text-[10px] text-sky-200 font-extrabold">도장 찍기</span>
          </div>
          <div className="my-auto z-10">
            <h6 className="text-base font-black text-sky-200 tracking-tight">밤 하늘 만들기</h6>
            <span className="text-[11px] text-sky-300 font-bold block mt-0.5">도장 찍기 기능 연출</span>
          </div>
          <div className="flex items-center gap-2 text-lg z-10">
            <span>👑</span>
            <span>🎈</span>
            <span>🌟</span>
          </div>
        </div>
      );
    case 6:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900 text-white p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-indigo-600 shadow-inner">
          <div className="absolute top-2 right-2 text-2xl opacity-80">🪐</div>
          <div className="w-full flex items-center justify-end px-1 z-10">
            <span className="text-amber-300 text-xs">✨</span>
          </div>
          <div className="my-auto z-10">
            <div className="bg-indigo-800/90 border border-indigo-400 rounded-xl px-3 py-1.5 shadow-md">
              <h6 className="text-sm sm:text-base font-black text-white">코딩 (우주 점프)</h6>
              <span className="text-[10px] font-bold text-indigo-200 block">Y좌표 & 점프 동작</span>
            </div>
          </div>
          <div className="text-2xl z-10">🧑‍🚀</div>
        </div>
      );
    case 7:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-sky-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <div className="flex items-center gap-1 text-xs">
              <span>🍉</span>
              <span>🍍</span>
              <span>🍊</span>
            </div>
          </div>
          <div className="my-auto bg-white border-2 border-sky-400 rounded-2xl px-4 py-2 shadow-sm">
            <h6 className="text-sm sm:text-base font-black text-sky-950">이상한 나라의 엔트리봇</h6>
            <span className="text-[10px] text-sky-600 font-extrabold block">조건문 / 판단 코딩</span>
          </div>
          <div className="text-2xl">🤖</div>
        </div>
      );
    case 8:
      return (
        <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-pink-100 via-rose-50 to-orange-100 p-3 flex flex-col items-center justify-between text-center relative overflow-hidden rounded-xl border-2 border-pink-300 shadow-inner">
          <div className="w-full flex items-center justify-end px-1">
            <span className="text-xs">☁️ ☁️</span>
          </div>
          <div className="my-auto">
            <h6 className="text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
              풍선 터뜨리기
            </h6>
            <span className="text-[11px] font-black text-pink-700 block mt-0.5">복제본 & 이벤트</span>
          </div>
          <div className="flex gap-2 text-xl">
            <span>🎈</span>
            <span>🎈</span>
            <span>💥</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full min-h-[150px] bg-indigo-50/90 p-3 flex flex-col items-center justify-between text-center rounded-xl border-2 border-indigo-200">
          <div className="my-auto">
            <span className="text-2xl block mb-1">🧩</span>
            <h6 className="text-xs font-black text-indigo-950">{title}</h6>
            <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">{concept}</span>
          </div>
          <span className="text-[10px] font-extrabold text-indigo-400">솔빛초 커리큘럼</span>
        </div>
      );
  }
};

