import React, { useState } from 'react';
import { Sparkles, GraduationCap, Camera, HeartHandshake, Phone, Menu, X, Youtube, Mail, Lock, LockKeyholeOpen } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useCloseOnBackButton } from '../hooks/useCloseOnBackButton';

interface HeaderProps {
  onOpenTrialModal: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrialModal, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, toggleAdminMode } = useAdmin();
  useCloseOnBackButton(mobileMenuOpen, () => setMobileMenuOpen(false));

  const navItems = [
    { id: 'hero', label: '강사 소개', icon: Sparkles },
    { id: 'portfolio', label: '수업 포트폴리오', icon: GraduationCap },
    { id: 'gallery', label: '활동 갤러리', icon: Camera },
    { id: 'testimonials', label: '학생 수강후기', icon: HeartHandshake },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#F5E6DA] text-[#383331] shadow-sm transition-all duration-300">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 h-20 xl:h-22 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFE8E5] rounded-2xl flex items-center justify-center border-2 border-[#FFC8C2] shadow-sm group-hover:scale-105 transition-transform text-xl sm:text-2xl shrink-0">
            🐰
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black text-xl sm:text-2xl xl:text-3xl text-[#2D2826] tracking-tight whitespace-nowrap">
                슬기로운 <span className="text-[#FF6F59]">코딩교육</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] sm:text-xs font-black bg-[#E6F8EB] text-[#1B6E32] rounded-full border border-[#BDE8C6] whitespace-nowrap">
                김정이 강사
              </span>
            </div>
            <p className="hidden md:block text-[11px] xl:text-xs text-[#6B5B52] font-bold whitespace-nowrap">상상을 현실로 코딩하는 어린이·청소년 전문 교육</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-[#FFF5EE] p-1.5 xl:p-2 rounded-full border-2 border-[#F5E2D5] shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4.5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-black transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF7066] text-white shadow-md border border-[#FF5A4D] scale-105'
                    : 'text-[#4A3E39] hover:text-[#FF6F59] hover:bg-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 ${isActive ? 'text-white' : 'text-[#FF7066]'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
          <button
            onClick={toggleAdminMode}
            className={`flex items-center gap-1 xl:gap-1.5 text-xs font-black px-2.5 xl:px-3.5 py-2 xl:py-2.5 rounded-2xl border-2 transition-all cursor-pointer whitespace-nowrap ${
              isAdmin
                ? 'bg-[#1B6E32] text-white border-[#1B6E32] shadow-sm'
                : 'bg-[#FFF0E6] text-[#6B5B52] border-[#F5E2D5] hover:border-[#FF7066]'
            }`}
            title={isAdmin ? "관리자 편집 모드 끄기 (로그아웃)" : "구글 계정으로 관리자 로그인"}
          >
            {isAdmin ? <LockKeyholeOpen className="w-3.5 h-3.5 text-white" /> : <Lock className="w-3.5 h-3.5 text-[#8C7B72]" />}
            <span>{isAdmin ? '관리자 ON' : '관리자 로그인'}</span>
          </button>

          <a
            href="tel:010-2416-5282"
            className="flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-black text-[#2D2826] bg-[#FFF0E6] hover:bg-[#FFE5D6] px-3 xl:px-4 py-2 xl:py-2.5 rounded-2xl border-2 border-[#FFD2BC] shadow-2xs hover:scale-105 transition-all whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#1B6E32]" />
            <span>010-2416-5282</span>
          </a>

          <a
            href="https://www.youtube.com/@jamjamclass"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm font-black text-white bg-[#FF4242] hover:bg-[#E03131] px-3 xl:px-4 py-2 xl:py-2.5 rounded-2xl shadow-xs hover:scale-105 transition-all whitespace-nowrap"
          >
            <Youtube className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white" />
            <span className="hidden xl:inline">유튜브</span>
          </a>
          
          <button
            onClick={onOpenTrialModal}
            className="bg-[#FF7066] hover:bg-[#FF5C52] border-2 border-[#FF5A4D] text-white font-black px-3.5 xl:px-4.5 py-2 xl:py-2.5 rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1 xl:gap-1.5 text-xs xl:text-sm cursor-pointer whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white" />
            <span>수업 문의</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="tel:010-2416-5282"
            className="bg-[#1B6E32] text-white font-extrabold px-3 py-1.5 rounded-full text-xs flex items-center gap-1 shadow-xs"
          >
            <Phone className="w-3 h-3" />
            <span>전화</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border transition-all ${
              mobileMenuOpen 
                ? 'bg-[#FF5A4D] text-white border-[#FF4235] shadow-md' 
                : 'text-[#383331] hover:bg-[#FFF0E6] border-[#F5E2D5] bg-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F5E6DA] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-[#FFEBE8] rounded-2xl border border-[#FFC8C2] flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#D93829]">☎️ 김정이 강사 : 010-2416-5282</span>
            <span className="text-xs bg-[#1B6E32] text-white px-2 py-0.5 rounded-full font-bold">상담 가능</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-bold text-[#383331] hover:bg-[#FFF5EE] transition-colors"
              >
                <div className="p-2 bg-[#FFE8E5] text-[#FF5A4D] rounded-xl">
                  <Icon className="w-5 h-5" />
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#F5E6DA] flex flex-col gap-2">
            <a
              href="https://www.youtube.com/@jamjamclass"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#FF4242] text-white font-extrabold py-2.5 rounded-2xl shadow-xs text-center flex items-center justify-center gap-2 text-xs"
            >
              <Youtube className="w-4 h-4" />
              <span>김정이 강사 공식 유튜브 채널</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal();
              }}
              className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-extrabold py-3 rounded-2xl shadow-xs text-center flex items-center justify-center gap-2 text-xs"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>수업 문의 및 강사 출강 신청</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

