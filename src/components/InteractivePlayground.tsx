import React, { useState } from 'react';
import { PLAYGROUND_MISSIONS } from '../data/playgroundMissions';
import { CodeMission } from '../types';
import confetti from 'canvas-confetti';
import { Gamepad2, Play, RotateCcw, Lightbulb, Sparkles, CheckCircle, Award, ArrowRight, Zap } from 'lucide-react';

interface InteractivePlaygroundProps {
  onOpenTrialModal: () => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ onOpenTrialModal }) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>('m1');
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const currentMission = PLAYGROUND_MISSIONS.find((m) => m.id === selectedMissionId) || PLAYGROUND_MISSIONS[0];

  const handleSelectMission = (id: string) => {
    setSelectedMissionId(id);
    setUserSequence([]);
    setExecutionLog([]);
    setShowHint(false);
  };

  const handleAddBlock = (action: string) => {
    if (isRunning) return;
    setUserSequence((prev) => [...prev, action]);
  };

  const handleRemoveBlock = (index: number) => {
    if (isRunning) return;
    setUserSequence((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setUserSequence([]);
    setExecutionLog([]);
    setShowHint(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error', e);
    }
  };

  const handleRunCode = async () => {
    if (userSequence.length === 0) {
      alert('실행할 코딩 블록을 먼저 추가해보세요! 🧩');
      return;
    }

    setIsRunning(true);
    setExecutionLog(['🚀 코딩 알고리즘 실행 시작...']);

    // Simulate step by step execution
    for (let i = 0; i < userSequence.length; i++) {
      const action = userSequence[i];
      const blockObj = currentMission.availableBlocks.find((b) => b.action === action);
      const textLabel = blockObj ? blockObj.text : action;

      await new Promise((resolve) => setTimeout(resolve, 500));
      setExecutionLog((prev) => [...prev, `[단계 ${i + 1}] ${textLabel} 실행 완료!`]);
    }

    // Check correctness
    const isCorrect =
      userSequence.length === currentMission.correctSequence.length &&
      userSequence.every((val, idx) => val === currentMission.correctSequence[idx]);

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (isCorrect) {
      setExecutionLog((prev) => [
        ...prev,
        `🎉 성공! ${currentMission.targetGoal} 완벽하게 달성하였습니다!`
      ]);
      triggerConfetti();
      setIsSuccessModalOpen(true);
    } else {
      setExecutionLog((prev) => [
        ...prev,
        `⚠️ 아쉽군요! 순서가 조금 달라요. 💡 [힌트 보기]를 눌러 다시 도전해봐요!`
      ]);
    }

    setIsRunning(false);
  };

  return (
    <section id="playground" className="py-20 relative bg-[#FFF8F0] text-[#383331]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FF7066] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-xs">
            <Gamepad2 className="w-4 h-4" />
            <span>INTERACTIVE CODE PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2826] tracking-tight">
            🎮 나도 슈퍼 프로그래머! 미니 코딩 체험
          </h2>
          <p className="text-[#6B5B52] font-medium text-base sm:text-lg">
            직접 블록을 클릭하여 귀여운 캐릭터를 움직이고 미션을 수행해보세요! <br className="hidden sm:inline" />
            컴퓨팅 사고력의 즐거움을 바로 느껴볼 수 있습니다.
          </p>
        </div>

        {/* Mission Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {PLAYGROUND_MISSIONS.map((mission) => {
            const isSelected = mission.id === selectedMissionId;
            return (
              <button
                key={mission.id}
                onClick={() => handleSelectMission(mission.id)}
                className={`p-4 rounded-[24px] text-left border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-white border-[#FF7066] shadow-md ring-4 ring-[#FFE5E0] scale-102'
                    : 'bg-white/80 border-[#F5E2D5] hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="text-3xl p-2 bg-[#FFF0E6] rounded-2xl border border-[#FFD2BC] shrink-0 shadow-2xs">
                  {mission.characterEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#E6F8EB] text-[#1B6E32]">
                      난이도: {mission.difficulty}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#2D2826] mt-1 line-clamp-1">
                    {mission.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Coding Workspace */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#F0E6DF] shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Available Blocks */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#2D2826] text-base flex items-center gap-2">
                <span>🧩 사용 가능 코딩 블록</span>
              </h3>
              <span className="text-xs text-[#8C7B72] font-bold">클릭하여 추가</span>
            </div>

            <div className="space-y-2 bg-[#FFF8F0] p-4 rounded-2xl border border-[#F5E2D5] min-h-[220px]">
              {currentMission.availableBlocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleAddBlock(block.action)}
                  disabled={isRunning}
                  className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#FFF0E6] border border-[#F5E2D5] font-extrabold text-xs text-[#2D2826] shadow-2xs hover:shadow-xs transition-all flex items-center justify-between cursor-pointer disabled:opacity-50 group"
                >
                  <span>{block.text}</span>
                  <span className="text-[#FF7066] font-black text-lg group-hover:scale-125 transition-transform">+</span>
                </button>
              ))}
            </div>

            {/* Hint Box */}
            <div className="p-3.5 bg-[#FFF4D6] rounded-2xl border border-[#FFE399] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#8C6200] flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-[#8C6200]" />
                  미션 목표: {currentMission.targetGoal}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-[10px] font-bold text-[#8C6200] underline cursor-pointer"
                >
                  {showHint ? '힌트 닫기' : '힌트 보기'}
                </button>
              </div>

              {showHint && (
                <div className="text-xs text-[#8C6200] font-medium pt-2 border-t border-[#FFE399]">
                  💡 순서 힌트: 총 {currentMission.correctSequence.length}개 블록을 순서대로 추가해보세요!
                </div>
              )}
            </div>
          </div>

          {/* Middle Column: My Assembly Line (Code Sequence) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#2D2826] text-base flex items-center gap-2">
                <span>⚡ 내가 조립한 알고리즘</span>
                <span className="text-xs bg-[#FF7066] text-white px-2.5 py-0.5 rounded-full font-bold">
                  {userSequence.length}개 블록
                </span>
              </h3>

              <button
                onClick={handleReset}
                disabled={isRunning || userSequence.length === 0}
                className="text-xs font-bold text-[#8C7B72] hover:text-[#2D2826] flex items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            </div>

            {/* Assembly Dropzone Container */}
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border-2 border-dashed border-[#FFC8C2] min-h-[220px] space-y-2">
              {userSequence.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#8C7B72] space-y-2">
                  <div className="text-3xl animate-pulse">🧩</div>
                  <p className="text-xs font-bold">왼쪽 블록을 클릭해서 조립해주세요!</p>
                </div>
              ) : (
                userSequence.map((action, index) => {
                  const blockObj = currentMission.availableBlocks.find((b) => b.action === action);
                  return (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-xl border border-[#F5E2D5] shadow-2xs flex items-center justify-between text-xs font-black text-[#2D2826] group hover:border-[#FF7066]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#FFEBE8] text-[#FF5A4D] font-extrabold flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        <span>{blockObj ? blockObj.text : action}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveBlock(index)}
                        disabled={isRunning}
                        className="text-[#8C7B72] hover:text-[#E03131] font-bold px-1.5 py-0.5 text-xs hover:bg-[#FFEBE8] rounded-md cursor-pointer disabled:opacity-50"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Execute Run Button */}
            <button
              onClick={handleRunCode}
              disabled={isRunning || userSequence.length === 0}
              className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black py-3.5 rounded-2xl shadow-xs hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-5 h-5 fill-white ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? '알고리즘 실행 중...' : '▶️ 알고리즘 실행하기'}</span>
            </button>
          </div>

          {/* Right Column: Simulated Screen Output & Console */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-black text-[#2D2826] text-base flex items-center gap-2">
              <span>🖥️ 실행 콘솔 결과</span>
            </h3>

            <div className="bg-[#2B282A] text-emerald-400 p-4 rounded-2xl font-mono text-xs h-[280px] overflow-y-auto space-y-2 border border-[#3D3A3C] shadow-inner">
              <div className="text-stone-400 text-[11px] pb-1 border-b border-stone-700">
                [CuteCoder v2026 Console Ready]
              </div>
              {executionLog.length === 0 ? (
                <div className="text-stone-500 pt-8 text-center font-sans font-bold">
                  실행하기 버튼을 누르면 <br /> 결과 로그가 출력됩니다.
                </div>
              ) : (
                executionLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed animate-in fade-in duration-200">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Success Badge Celebration Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2826]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-8 text-center space-y-5 shadow-xl border border-[#F0E6DF] animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#FFF2B2] rounded-full flex items-center justify-center mx-auto text-4xl shadow-xs animate-bounce border border-[#FFE399]">
              ⭐
            </div>

            <div>
              <span className="text-xs font-black bg-[#E6F8EB] text-[#1B6E32] px-3 py-1 rounded-full border border-[#BDE8C6]">
                축하합니다! 미션 성공
              </span>
              <h3 className="text-2xl font-black text-[#2D2826] mt-2">
                참 잘했어요! 🏆
              </h3>
              <p className="text-xs text-[#6B5B52] font-medium mt-1">
                완벽한 알고리즘을 조립하여 <strong>{currentMission.targetGoal}</strong>를 달성했습니다!
              </p>
            </div>

            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F5E2D5] text-xs text-[#2D2826] font-bold">
              🎉 슬기로운 코딩교실에서 더욱 재미있는 3D 로봇 및 게임 코딩을 만날 수 있어요!
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-extrabold py-3.5 rounded-2xl shadow-xs hover:scale-102 transition-transform flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>무료 체험 수업 바로 신청하기</span>
              </button>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full bg-[#FFF0E6] hover:bg-[#FFE5D6] text-[#2D2826] font-bold py-2.5 rounded-2xl text-xs cursor-pointer border border-[#FFD2BC]"
              >
                다른 미션 더 도전하기
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
