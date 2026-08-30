import React from 'react';
import { Phone, Mail, Youtube, Sparkles, GraduationCap } from 'lucide-react';

interface FooterProps {
  onOpenTrialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTrialModal }) => {
  return (
    <footer className="border-t border-[#F5E2D5] bg-[#FFF8F0] text-[#383331] pt-12 pb-10">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Top Callout Banner */}
        <div className="bg-[#FFF0E6] border border-[#FFD2BC] p-6 sm:p-8 rounded-[32px] text-[#2D2826] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-black bg-[#FF7066] text-white px-3 py-1 rounded-full tracking-wider">
              슬기로운 코딩교육 🚀
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#2D2826]">
              초·중·고 코딩 교육 & 출강 문의는 김정이 강사에게!
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5B52] font-medium">
              15년간 3,000명 이상의 학생들과 함께한 탄탄한 커리큘럼과 현장 경험으로 이끕니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:010-2416-5282"
              className="bg-[#1B6E32] hover:bg-[#145526] text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-xs transition-all text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>010-2416-5282</span>
            </a>

            <button
              onClick={onOpenTrialModal}
              className="bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-6 py-3.5 rounded-2xl shadow-xs hover:scale-105 transition-all text-sm cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>수업 문의 제출</span>
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          {/* Col 1: Brand & Instructor */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="font-black text-2xl text-[#2D2826]">슬기로운 코딩교육</span>
            </div>
            <p className="text-xs text-[#6B5B52] leading-relaxed font-medium">
              코딩교육전문가 김정이 강사의 포트폴리오 웹사이트입니다. 엔트리, AI 인공지능, 햄스터봇, AR/VR 코스페이시스, 네오봇 로봇 교육을 체계적으로 진행합니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#1B6E32] font-bold pt-1">
              <GraduationCap className="w-4 h-4" />
              <span>경기꿈의학교 '슬기로운 코딩생활' 대표강사</span>
            </div>
          </div>

          {/* Col 2: Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-black text-[#FF5A4D] text-sm">강사 연락처 & 채널</h4>
            <div className="space-y-2 text-xs text-[#5C4E46] font-medium">
              <div className="flex items-center gap-2 text-[#2D2826] font-bold text-sm">
                <Phone className="w-4 h-4 text-[#FF7066]" />
                <span>김정이 강사 : 010 - 2416 - 5282</span>
              </div>
              <div className="flex items-center gap-2 text-[#E03131] hover:underline">
                <Youtube className="w-4 h-4 text-[#E03131]" />
                <a href="https://www.youtube.com/@jamjamclass" target="_blank" rel="noopener noreferrer">
                  공식 유튜브 채널 바로가기
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF7066]" />
                <span>수업 문의: 상시 전화 및 홈페이지 우상단 문의 버튼 이용</span>
              </div>
            </div>
          </div>

          {/* Col 3: Schools & Experience */}
          <div className="space-y-3">
            <h4 className="font-black text-[#FF5A4D] text-sm">주요 출강교 & 활동</h4>
            <ul className="space-y-1.5 text-xs text-[#6B5B52] font-medium list-disc list-inside">
              <li>솔빛초등학교 1~2학년 SW 코딩교육</li>
              <li>청계초등학교 3~4학년 스마트 AI/VR 교육</li>
              <li>초등학교 5~6학년 햄스터봇 피지컬 로봇 교육</li>
              <li>예당중학교 3학년 네오봇 자율주행 교육</li>
              <li>2023 경기꿈의학교 슬기로운 코딩생활 운영</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#F5E2D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8C7B72] font-medium">
          <p>© 2026 슬기로운 코딩교육 (김정이 강사 포트폴리오). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="hover:text-[#2D2826] cursor-pointer">엔트리</span>
            <span>·</span>
            <span className="hover:text-[#2D2826] cursor-pointer">AI 인공지능</span>
            <span>·</span>
            <span className="hover:text-[#2D2826] cursor-pointer">햄스터봇</span>
            <span>·</span>
            <span className="hover:text-[#2D2826] cursor-pointer">AR/VR</span>
            <span>·</span>
            <span className="hover:text-[#2D2826] cursor-pointer">네오봇</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

