'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import QuoteBlock from '@/components/hireme/QuoteBlock';

interface FinalPollProps {
  sessionId?: string | null;
  onNavigate?: (page: string) => void;
  onSubmitted?: (answer: string) => void;
}

const options = [
  {
    key: 'A',
    title: 'Học để điểm cao hơn nữa',
    description: 'GPA vẫn là ưu tiên hàng đầu',
    emoji: '📚',
    color: 'border-red-200 bg-red-50 hover:border-red-400',
  },
  {
    key: 'B',
    title: 'Vẫn học, nhưng tìm cơ hội thực hành',
    description: 'Kết hợp lý luận và thực tiễn',
    emoji: '🔄',
    color: 'border-blue-200 bg-blue-50 hover:border-blue-400',
  },
  {
    key: 'C',
    title: 'Tập trung hoàn toàn vào kinh nghiệm thực tế',
    description: 'Thực hành là quan trọng nhất',
    emoji: '🚀',
    color: 'border-yellow-200 bg-yellow-50 hover:border-yellow-400',
  },
];

const POLL_COLORS = ['#ef4444', '#3b82f6', '#f59e0b'];

export default function FinalPoll({ sessionId, onNavigate, onSubmitted }: FinalPollProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pollData, setPollData] = useState<{ name: string; value: number }[]>([]);

  const handleSubmit = async (answer: string) => {
    setSubmitting(true);
    try {
      await fetch('/api/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer, sessionId }),
      });
      onSubmitted?.(answer);
      setSubmitted(true);
      fetchPollData();
    } catch (error) {
      console.error('Poll submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchPollData = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      const finalPoll = data.stats?.finalPoll as { A: number; B: number; C: number } | undefined;
      if (!finalPoll) return;
      setPollData([
        { name: 'A. Điểm cao', value: finalPoll.A || 0 },
        { name: 'B. Học + thực hành', value: finalPoll.B || 0 },
        { name: 'C. Kinh nghiệm', value: finalPoll.C || 0 },
      ]);
    } catch (error) {
      console.error('Stats fetch error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="final-poll-page"
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Bạn sẽ thay đổi gì sau buổi hôm nay?
          </h1>
          <p className="text-sm text-gray-500">Chọn đáp án phản ánh suy nghĩ của bạn</p>
        </div>

        {!submitted ? (
          <div className="space-y-3 mb-6">
            {options.map((opt, i) => (
              <motion.button
                key={opt.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubmit(opt.key)}
                disabled={submitting}
                className={`w-full text-left rounded-xl border-2 p-5 transition-all ${opt.color} disabled:opacity-50`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{opt.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400 bg-white rounded-full w-6 h-6 flex items-center justify-center">
                        {opt.key}
                      </span>
                      <h3 className="font-bold text-gray-800">{opt.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{opt.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border-2 border-emerald-200 p-6 mb-6 text-center"
            >
              <p className="text-lg font-bold text-emerald-600 mb-4">Cảm ơn bạn đã tham gia! 🎉</p>
              <div className="h-48 mx-auto max-w-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pollData.filter(d => d.value > 0)}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={({ name, value }: { name: string; value: number }) => `${value}%`}
                      dataKey="value"
                    >
                      {pollData.map((_, index) => (
                        <Cell key={index} fill={POLL_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-gray-400 mt-2">Kết quả cập nhật realtime từ toàn lớp</p>
            </motion.div>
          </AnimatePresence>
        )}

        <QuoteBlock
          text="Học đi đôi với hành, lý luận đi đôi với thực tiễn."
          author="Hồ Chí Minh"
          variant="hcm"
        />
      </div>
    </motion.div>
  );
}
