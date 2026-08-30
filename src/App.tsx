import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioGrid } from './components/PortfolioGrid';
import { PortfolioItemModal } from './components/PortfolioItemModal';
import { GallerySection } from './components/GallerySection';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';
import { PortfolioItem } from './types';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Edit, ShieldAlert } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const { isAdmin, toggleAdminMode } = useAdmin();

  const handleOpenTrialModal = () => {
    setIsTrialModalOpen(true);
  };

  const handleCloseTrialModal = () => {
    setIsTrialModalOpen(false);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#383331] font-sans antialiased selection:bg-[#FFE0D8] selection:text-[#FF5A4D] relative overflow-x-hidden">
      
      {/* Background Soft Pastel Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FFEAE5] rounded-full blur-[140px] pointer-events-none z-0 opacity-80" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#EAF2FF] rounded-full blur-[140px] pointer-events-none z-0 opacity-80" />
      <div className="fixed top-[40%] right-[10%] w-[500px] h-[500px] bg-[#FFF3D6] rounded-full blur-[140px] pointer-events-none z-0 opacity-70" />

      {/* Admin Mode Floating Indicator Banner */}
      {isAdmin && (
        <div className="sticky top-0 z-50 bg-[#1B6E32] text-white px-4 py-2 text-xs font-black flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 max-w-[1720px] mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="animate-pulse bg-white text-[#1B6E32] px-2 py-0.5 rounded-full text-[11px] font-extrabold">
                ADMIN ON
              </span>
              <span>✏️ 관리자 편집 모드가 활성화되어 있습니다. (사진 등록/수정 및 설명 편집 가능)</span>
            </div>
            <button
              onClick={toggleAdminMode}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs font-extrabold transition-colors"
            >
              편집 모드 종료 (일반인 화면 보기)
            </button>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Header
        onOpenTrialModal={handleOpenTrialModal}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        
        {/* Instructor Hero & Profile Section */}
        <HeroSection
          onOpenTrialModal={handleOpenTrialModal}
          onExploreCurriculum={() => scrollToSection('portfolio')}
        />

        {/* Portfolio Section: Categories & Curriculums */}
        <PortfolioGrid
          onOpenTrialModal={handleOpenTrialModal}
          onSelectItem={(item) => setSelectedPortfolioItem(item)}
        />

        {/* Real Classroom Scenes Activity Gallery */}
        <GallerySection
          onOpenTrialModal={handleOpenTrialModal}
        />

        {/* Parent & Student Testimonials */}
        <TestimonialSection />

      </main>

      {/* Footer */}
      <Footer onOpenTrialModal={handleOpenTrialModal} />

      {/* Class Inquiry Modal */}
      <TrialModal
        isOpen={isTrialModalOpen}
        onClose={handleCloseTrialModal}
      />

      {/* Portfolio Item Detail Modal */}
      <PortfolioItemModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onOpenTrialModal={handleOpenTrialModal}
        onSelectItem={(item) => setSelectedPortfolioItem(item)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
