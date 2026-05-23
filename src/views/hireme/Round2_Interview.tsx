'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import StarRating from '@/components/hireme/StarRating';
import QuoteBlock from '@/components/hireme/QuoteBlock';

interface InterviewCandidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: string;
  interviewAnswer: {
    question: 1 | 2 | 3;
    style: string;
    text: string;
  };
}

interface Round2Props {
  candidates: InterviewCandidate[];
  onComplete: (ratings: Record<string, number>, top3: string[]) => void;
}

const questionLabels: Record<number, string> = {
  1: 'Bạn xử lý xung đột trong team thế nào?',
  2: 'Deadline gấp + vấn đề khó, bạn làm gì?',
  3: 'Bạn học và áp dụng cái mới ra sao?',
};

export default function Round2_Interview({ candidates, onComplete }: Round2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const currentCandidate = candidates[currentIndex];
  const isLast = currentIndex === candidates.length - 1;
  const allRated = candidates.every(c => ratings[c.id] && ratings[c.id] > 0);

  const handleRating = (value: number) => {
    setRatings(prev => ({ ...prev, [currentCandidate.id]: value }));
  };

  const handleNext = () => {
    if (isLast) {
      handleSubmit();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const sorted = [...candidates].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));
      const top3 = sorted.slice(0, 3).map(c => c.id);
      onComplete(ratings, top3);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkipToEnd = () => {
    if (allRated) handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <PhilosophyBadge
            variant="rational"
            title="GIAI ĐOẠN 2 · NHẬN THỨC LÝ TÍNH"
            subtitle="📚 Cặp phạm trù: KHẢ NĂNG – HIỆN THỰC · Lời nói chỉ là khả năng"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">Vòng 2: Phỏng vấn 5 ứng viên</h2>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 mb-4 text-sm text-amber-800">
          ⚠️ <strong>Lưu ý:</strong> Bạn chỉ nghe những gì họ <em>nói</em> — không thể kiểm chứng họ có thực sự làm được không.
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-6">
          {candidates.map((c, i) => (
            <div key={c.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentIndex(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i === currentIndex
                    ? 'bg-blue-500 text-white'
                    : ratings[c.id]
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {ratings[c.id] ? '✓' : i + 1}
              </button>
              {i < candidates.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < currentIndex ? 'bg-blue-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Candidate card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCandidate.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            data-testid="round2-current-candidate"
          >
            <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-2xl">
                  {currentCandidate.name.split(' ').pop()?.[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{currentCandidate.name}</h3>
                  <p className="text-sm text-gray-500">GPA: {currentCandidate.gpa.toFixed(2)} · {currentCandidate.internshipMonths} tháng thực tập</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold text-blue-600 mb-2">
                  Câu hỏi phỏng vấn #{currentCandidate.interviewAnswer.question}:
                </p>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {questionLabels[currentCandidate.interviewAnswer.question]}
                </p>
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{currentCandidate.interviewAnswer.text}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Đánh giá:</span>
                <StarRating
                  rating={ratings[currentCandidate.id] || 0}
                  onChange={handleRating}
                  size="lg"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Quay lại
          </button>

          {allRated && !isLast && (
            <button
              onClick={handleSkipToEnd}
              className="text-sm text-purple-600 font-medium hover:underline"
            >
              Hoàn tất sớm →
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={!ratings[currentCandidate.id] || ratings[currentCandidate.id] === 0}
            data-testid="next-step"
            className="flex items-center gap-1 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLast ? (submitting ? 'Đang xử lý...' : 'Hoàn tất →') : 'Tiếp theo →'}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="mt-6">
          <QuoteBlock
            text="Lời nói thể hiện KHẢ NĂNG, không phải HIỆN THỰC. Khả năng chỉ thành hiện thực qua hoạt động thực tiễn."
            author="Vận dụng cặp phạm trù Khả năng – Hiện thực"
            source="Giáo trình Triết học Mác-Lênin 2.2.2"
          />
        </div>
      </div>
    </motion.div>
  );
}
