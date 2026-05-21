'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import QuoteBlock from '@/components/hireme/QuoteBlock';

interface TrialCandidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: string;
  outcome: 'success' | 'fail';
  trialResult: {
    verdict: string;
    bullets: string[];
  };
}

interface Round3Props {
  sessionId: string;
  industry: string | null;
  shortlist: string[];
  onComplete: (results: { candidates: TrialCandidate[]; successCount: number }) => void;
}

export default function Round3_Task({ sessionId, industry, shortlist, onComplete }: Round3Props) {
  const [data, setData] = useState<{ candidates: TrialCandidate[]; successCount: number; failCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch('/api/round3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, industry, shortlist }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result?.error || 'Round3 request failed');
        }
        setData(result);
      } catch (error) {
        console.error('Round3 fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [industry, sessionId, shortlist]);

  useEffect(() => {
    if (data) {
      onComplete({ candidates: data.candidates, successCount: data.successCount });
    }
  }, [data, onComplete]);

  if (loading || !data) {
    return (
      <div className="min-h-screen px-4 py-8 pb-24 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-24 w-full mb-6 rounded-xl" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-red-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <PhilosophyBadge
            variant="practice"
            title="GIAI ĐOẠN 3 · THỰC TIỄN — TIÊU CHUẨN CỦA CHÂN LÝ"
            subtitle="📚 Bản chất lộ ra · Khả năng → Hiện thực"
          />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Kết quả 1 tuần thử việc — Thực tiễn lên tiếng
        </h2>

        {/* Summary box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 mb-6 text-center"
        >
          <p className="text-lg text-gray-600 mb-1">Trong 5 ứng viên BẠN chọn:</p>
          <p className="text-4xl font-extrabold text-red-600 mb-1">
            {data.successCount}/5 <span className="text-xl text-gray-500">người PASS</span>
          </p>
          <p className="text-sm text-gray-500">
            Tỷ lệ thành công: {data.successCount * 20}%
          </p>
        </motion.div>

        {/* Candidate results */}
        <div className="space-y-3 mb-6">
          {data.candidates.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`bg-white rounded-xl border-2 p-4 ${
                c.outcome === 'success'
                  ? 'border-emerald-300 shadow-emerald-100 shadow-md'
                  : 'border-red-300 shadow-red-100 shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${
                  c.outcome === 'success' ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {c.outcome === 'success' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm">{c.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      c.outcome === 'success'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {c.outcome === 'success' ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-1.5">
                    {c.outcome === 'success' ? '✓ Được giữ lại / thăng tiến' : '✗ Không pass thử việc'}
                  </p>
                  <ul className="space-y-0.5">
                    {c.trialResult.bullets.map((b, j) => (
                      <li key={j} className="text-xs text-gray-500 flex items-start gap-1">
                        <span className="mt-0.5">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marx quote */}
        <QuoteBlock
          text="Vấn đề tư duy của con người có đạt tới chân lý khách quan hay không... là một vấn đề thực tiễn. Chính trong thực tiễn mà con người phải chứng minh chân lý."
          author="Karl Marx"
          source="Luận cương về Feuerbach, luận đề 2 (1845)"
          variant="marx"
        />
      </div>
    </motion.div>
  );
}
