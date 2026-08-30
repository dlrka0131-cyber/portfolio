import React, { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MascotAdvisorProps {
  onOpenTrialModal: () => void;
  onSelectGrade: (gradeId: string) => void;
}

export const MascotAdvisor: React.FC<MascotAdvisorProps> = ({ onOpenTrialModal, onSelectGrade }) => {
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>('');

  const questions = [
    {
      title: '1. 아이의 학년이나 나이는 어떻게 되나요?',
      options: [
        { label: '🌱 초등 1~3학년 (만 7~9세)', value: 'low', recommend: 'elementary-low' },
        { label: '🌿 초등 4~6학년 (만 10~12세)', value: 'high', recommend: 'elementary-high' },
        { label: '🌳 중학교 1~3학년 (만 13~15세)', value: 'middle', recommend: 'middle' },
        { label: '🚀 고등학생 또는 예비 개발자', value: 'highschool', recommend: 'high' },
      ]
    },
    {
      title: '2. 아이가 가장 관심 있어 하는 분야는?',
      options: [
        { label: '🎨 캐릭터 그리기 & 알록달록 동화책 만들기', value: 'story' },
        { label: '🕹️ 장애물 피하기 미니 아케이드 게임', value: 'game' },
        { label: '💡 손으로 직접 만지는 센서/로봇 발명품', value: 'robot' },
        { label: '🤖 파이썬 텍스트 코딩 & 인공지능(AI)', value: 'ai' },
      ]
    }
  ];

  const handleSelectOption = (value: string, recommendGrade?: string) => {
    if (currentQuestionStep === 0) {
      setSelectedAge(recommendGrade || 'elementary-low');
      setCurrentQuestionStep(1);
    } else {
      setSelectedGoal(value);
      setCurrentQuestionStep(2);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionStep(0);
    setSelectedAge('');
    setSelectedGoal('');
  };

  return (
    <section className="py-12 relative overflow-hidden bg-[#FFF8F0] text-[#383331]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-xs border border-[#F0E6DF] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Mascot Illustration Box */}
          <div className="md:col-span-4 text-center space-y-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#FFF0E6] rounded-3xl p-1 shadow-2xs border border-[#FFD2BC] mx-auto flex items-center justify-center text-5xl animate-bounce">
              🤖
            </div>
            <div>
              <span className="text-xs font-black bg-[#FF7066] text-white px-3 py-1 rounded-full shadow-2xs">
                AI 진로 컨설턴트 큐티봇
              </span>
              <h3 className="font-black text-[#2D2826] text-lg sm:text-xl mt-2">
                맞춤 클래스 진단 퀴즈 🎈
              </h3>
            </div>
          </div>

          {/* Quiz Q&A Content */}
          <div className="md:col-span-8 space-y-4">
            
            {currentQuestionStep < 2 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#FF5A4D]">
                  <span>질문 {currentQuestionStep + 1} / 2</span>
                  <span className="bg-[#FFF8F0] px-3 py-1 rounded-full text-[#2D2826] border border-[#F5E2D5]">소요시간 10초</span>
                </div>

                <h4 className="font-extrabold text-[#2D2826] text-base sm:text-lg">
                  {questions[currentQuestionStep].title}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[currentQuestionStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt.value, opt.recommend)}
                      className="p-3.5 rounded-2xl bg-white hover:bg-[#FFF0E6] border border-[#F5E2D5] hover:border-[#FFC8C2] text-left font-extrabold text-xs sm:text-sm text-[#2D2826] transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#FF7066] group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Recommendation Result */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 bg-[#E6F8EB] rounded-2xl border border-[#BDE8C6] flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#1B6E32] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-black text-[#1B6E32]">진단 완료!</span>
                    <h4 className="font-black text-[#2D2826] text-base sm:text-lg mt-0.5">
                      우리 아이 추천 정규반이 등록되었습니다!
                    </h4>
                    <p className="text-xs text-[#6B5B52] font-medium mt-1">
                      흥미에 맞는 차별화된 교재와 교구로 첫시간부터 몰입하는 즐거움을 경험합니다.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      onSelectGrade(selectedAge || 'elementary-low');
                      const elem = document.getElementById('curriculum');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-[#FFF0E6] hover:bg-[#FFE5D6] text-[#2D2826] font-extrabold px-5 py-3 rounded-2xl border border-[#FFD2BC] text-xs sm:text-sm shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>추천 커리큘럼 보기</span>
                    <ArrowRight className="w-4 h-4 text-[#FF7066]" />
                  </button>

                  <button
                    onClick={onOpenTrialModal}
                    className="w-full sm:w-auto bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black px-6 py-3 rounded-2xl shadow-xs hover:scale-105 transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>추천반 무료 체험 예약하기</span>
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="text-xs text-[#8C7B72] hover:text-[#2D2826] font-bold underline px-2 cursor-pointer"
                  >
                    다시 진단
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
