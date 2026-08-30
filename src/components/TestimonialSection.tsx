import React from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialData';
import { Star, Heart, Award } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-[#FFF8F0] text-[#383331] border-t border-[#F5E2D5]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FFEBE8] text-[#FF5A4D] border border-[#FFC8C2] font-black px-4 py-1.5 rounded-full text-xs shadow-2xs">
            <Heart className="w-4 h-4 text-[#FF7066] fill-[#FF7066]" />
            <span>STUDENT REVIEWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2826] tracking-tight">
            💬 학생 수강후기
          </h2>
          <p className="text-[#6B5B52] text-sm sm:text-base leading-relaxed font-medium">
            화성 솔빛초등학교 5학년 학생들이 김정이 강사의 AI·코딩 수업을 함께하며 작성한 솔직하고 생생한 소감입니다.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[28px] p-6.5 sm:p-8 border-2 border-[#F0E6DF] shadow-sm hover:shadow-xl hover:border-[#FF7066] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-full object-cover border-2 border-[#FFD2BC] shadow-2xs shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-[#2D2826] text-lg">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#7A6B63] font-bold">
                        {item.grade}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 text-[#FFC107]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-[#FFC107]" />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-base sm:text-lg text-[#2D2826] font-bold leading-relaxed pt-1">
                  "{item.content}"
                </p>

              </div>

              {/* Course Taken Footer */}
              <div className="mt-5 pt-3.5 border-t-2 border-[#F5E2D5] flex items-center justify-between text-xs sm:text-sm font-black text-[#6B5B52]">
                <span className="flex items-center gap-1.5 text-[#FF5A4D]">
                  <Award className="w-4 h-4" />
                  수강 과정: {item.courseTaken}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

