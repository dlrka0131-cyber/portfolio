import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, User, Phone, BookOpen, CheckCircle, X, Mail, ListFilter, Trash2, MessageSquare } from 'lucide-react';
import { saveItem, getItem } from '../utils/storage';
import { useAdmin } from '../context/AdminContext';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface InquiryItem {
  id: string;
  parentName: string;
  phone: string;
  grade: string;
  schoolName: string;
  memo: string;
  createdAt: string;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const { isAdmin } = useAdmin();
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    grade: 'entry',
    schoolName: '',
    memo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'adminList'>('form');
  const [inquiryList, setInquiryList] = useState<InquiryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadInquiries();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const loadInquiries = async () => {
    try {
      const raw = await getItem('submitted_inquiries_list');
      if (raw) {
        setInquiryList(JSON.parse(raw));
      }
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) {
      alert('성함과 연락처를 입력해 주세요! 📞');
      return;
    }

    const newInquiry: InquiryItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updatedList = [newInquiry, ...inquiryList];
    setInquiryList(updatedList);
    await saveItem('submitted_inquiries_list', JSON.stringify(updatedList));

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {
      console.log('Confetti error', err);
    }

    setIsSubmitted(true);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('이 문의를 삭제하시겠습니까?')) return;
    const updated = inquiryList.filter(item => item.id !== id);
    setInquiryList(updated);
    await saveItem('submitted_inquiries_list', JSON.stringify(updated));
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setViewMode('form');
    setFormData({
      parentName: '',
      phone: '',
      grade: 'entry',
      schoolName: '',
      memo: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D2826]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#F0E6DF] rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-xl relative text-[#383331] animate-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FF5A4D] hover:bg-[#FF4235] text-white font-black flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer shrink-0 border-2 border-white z-10"
          title="닫기"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Admin Mode Toggle Tabs */}
        {isAdmin && (
          <div className="flex items-center gap-2 mb-4 bg-[#FFF8F0] p-1.5 rounded-2xl border border-[#F5E2D5]">
            <button
              type="button"
              onClick={() => setViewMode('form')}
              className={`flex-1 py-2 px-3 text-xs font-black rounded-xl transition-colors ${
                viewMode === 'form'
                  ? 'bg-[#FF7066] text-white shadow-xs'
                  : 'text-[#6B5B52] hover:bg-white'
              }`}
            >
              ✉️ 문의 작성 폼
            </button>
            <button
              type="button"
              onClick={() => setViewMode('adminList')}
              className={`flex-1 py-2 px-3 text-xs font-black rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                viewMode === 'adminList'
                  ? 'bg-[#FF7066] text-white shadow-xs'
                  : 'text-[#6B5B52] hover:bg-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>접수된 문의 ({inquiryList.length})</span>
            </button>
          </div>
        )}

        {viewMode === 'adminList' && isAdmin ? (
          /* Admin Inquiry List View */
          <div className="space-y-4">
            <div className="border-b border-[#F5E2D5] pb-3">
              <h3 className="text-xl font-black text-[#2D2826] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FF7066]" />
                접수된 수업 문의 목록 ({inquiryList.length}건)
              </h3>
              <p className="text-xs text-[#8C7B72] font-medium mt-1">
                방문자가 남긴 문의 내역입니다. (브라우저 내에 안전하게 저장됩니다)
              </p>
            </div>

            {inquiryList.length === 0 ? (
              <div className="py-12 text-center text-[#8C7B72] text-xs font-bold bg-[#FFF8F0] rounded-2xl border border-dashed border-[#F5E2D5]">
                아직 접수된 문의 내역이 없습니다.
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {inquiryList.map((item) => (
                  <div key={item.id} className="bg-[#FFF8F0] border border-[#F5E2D5] rounded-2xl p-4 space-y-2 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-black text-[#FF5A4D] bg-[#FFEBE8] px-2.5 py-0.5 rounded-full border border-[#FFC8C2]">
                          {item.createdAt}
                        </span>
                        <h4 className="text-sm font-black text-[#2D2826] mt-1.5 flex items-center gap-2">
                          👤 {item.parentName}
                          {item.schoolName && <span className="text-xs font-bold text-[#6B5B52]">({item.schoolName})</span>}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleDeleteInquiry(item.id)}
                        className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                        title="문의 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs space-y-1 pt-1 font-bold text-[#4A3E39]">
                      <div>📞 연락처: <a href={`tel:${item.phone}`} className="text-[#FF5A4D] underline">{item.phone}</a></div>
                      <div>📚 관심 분야: <span className="text-[#2D2826]">{item.grade}</span></div>
                      {item.memo && (
                        <div className="mt-2 p-2.5 bg-white rounded-xl border border-[#F5E2D5] text-xs font-medium text-[#2D2826] whitespace-pre-wrap">
                          💬 {item.memo}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-[#FFEBE8] text-[#FF5A4D] text-xs font-black px-3 py-1 rounded-full border border-[#FFC8C2]">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7066]" />
                <span>슬기로운 코딩교육 김정이 강사</span>
              </div>
              <h3 className="text-2xl font-black text-[#2D2826]">
                ✉️ 수업 및 출강 문의하기
              </h3>
              <p className="text-xs text-[#6B5B52] font-medium">
                초·중·고 학교 출강, 그룹 수업 및 1:1 맞춤 지도 문의를 남겨주시면 빠르게 안내드립니다.
              </p>
            </div>

            {/* Direct Contact Banner */}
            <div className="p-3 bg-[#FFF8F0] rounded-2xl border border-[#F5E2D5] flex items-center justify-between text-xs">
              <span className="text-[#2D2826] font-bold">☎️ 직통 전화 문의</span>
              <a href="tel:010-2416-5282" className="text-[#FF5A4D] font-black hover:underline">
                010-2416-5282 (김정이 강사)
              </a>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs sm:text-sm">
              
              {/* Name */}
              <div>
                <label className="block font-extrabold text-[#2D2826] mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#FF7066]" />
                  신청자 성함 (학부모 / 교사 / 담당자) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E2D5] focus:border-[#FF7066] focus:outline-hidden font-medium text-[#2D2826] bg-[#FFF8F0]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-extrabold text-[#2D2826] mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#FF7066]" />
                  연락처 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E2D5] focus:border-[#FF7066] focus:outline-hidden font-medium text-[#2D2826] bg-[#FFF8F0]"
                />
              </div>

              {/* School / Organization Name */}
              <div>
                <label className="block font-extrabold text-[#2D2826] mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF7066]" />
                  학교명 또는 기관/지역
                </label>
                <input
                  type="text"
                  placeholder="예: 솔빛초등학교 / 청계초등학교 인근"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E2D5] focus:border-[#FF7066] focus:outline-hidden font-medium text-[#2D2826] bg-[#FFF8F0]"
                />
              </div>

              {/* Grade Selector */}
              <div>
                <label className="block font-extrabold text-[#2D2826] mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF7066]" />
                  관심 교육 영역 *
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E2D5] focus:border-[#FF7066] focus:outline-hidden font-extrabold text-[#2D2826] bg-[#FFF8F0]"
                >
                  <option value="엔트리 블록코딩">💥 엔트리 블록 코딩 (초등 1~6학년)</option>
                  <option value="AI 인공지능 & 비전인식">💡 AI 인공지능 & 비전 인식 (초3~중등)</option>
                  <option value="햄스터봇 피지컬 로봇">🤖 햄스터봇 피지컬 로봇 코딩</option>
                  <option value="AR/VR 메타버스">❇️ AR/VR 메타버스 & 코스페이시스</option>
                  <option value="네오봇 로봇수업">🚗 네오봇 교과 연계 로봇 수업</option>
                  <option value="특별 클래스 및 기타">✳️ 경기 꿈의학교 및 주말 특별 클래스</option>
                </select>
              </div>

              {/* Memo */}
              <div>
                <label className="block font-extrabold text-[#2D2826] mb-1">
                  문의 내용 및 요청사항
                </label>
                <textarea
                  rows={2}
                  placeholder="수업 희망 인원, 차시 및 주요 질문을 자유롭게 남겨주세요."
                  value={formData.memo}
                  onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F5E2D5] focus:border-[#FF7066] focus:outline-hidden font-medium text-[#2D2826] bg-[#FFF8F0] text-xs resize-none"
                />
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black py-3.5 rounded-xl shadow-xs hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>김정이 강사에게 문의 제출하기</span>
            </button>

          </form>
        ) : (
          /* Confirmation Screen */
          <div className="text-center space-y-5 py-4 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-[#E6F8EB] rounded-full flex items-center justify-center mx-auto text-[#1B6E32] text-4xl shadow-xs border border-[#BDE8C6]">
              <CheckCircle className="w-12 h-12 text-[#1B6E32]" />
            </div>

            <div>
              <span className="text-xs font-black bg-[#E6F8EB] text-[#1B6E32] px-3 py-1 rounded-full border border-[#BDE8C6]">
                문의 접수 완료 🎉
              </span>
              <h3 className="text-2xl font-black text-[#2D2826] mt-2">
                수업 문의가 성공적으로 전달되었습니다!
              </h3>
              <p className="text-xs text-[#6B5B52] font-medium mt-1">
                <strong>{formData.parentName}</strong> 님, 확인 후 <strong>010-2416-5282 (김정이 강사)</strong> 번호로 직접 안내 전화를 드리겠습니다.
              </p>
            </div>

            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#F5E2D5] text-left text-xs font-bold text-[#2D2826] space-y-1">
              <div>📞 직통 문의: 010-2416-5282 (김정이 강사)</div>
              <div>▶️ 유튜브 채널: 슬기로운 코딩교육 시연 동영상 감상 가능</div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full bg-[#FF7066] hover:bg-[#FF5C52] text-white font-black py-3.5 rounded-xl shadow-xs cursor-pointer text-sm"
            >
              확인 및 포트폴리오 둘러보기
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

