'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import QuoteBlock from '@/components/hireme/QuoteBlock';

interface Candidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: string;
}

interface Round1Props {
  sessionId: string;
  industry: string;
  onComplete: (shortlist: string[], sortUsed: string, filterUsed: string) => void;
}

const sortOptions = [
  { value: 'gpa_desc', label: 'GPA ↓' },
  { value: 'exp_desc', label: 'Tháng thực tập ↓' },
  { value: 'projects_desc', label: 'Dự án ↓' },
  { value: 'random', label: 'Ngẫu nhiên' },
];

const filterOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'gpa_high', label: 'GPA ≥ 3.5' },
  { value: 'has_internship', label: 'Có thực tập' },
  { value: 'has_projects', label: 'Có dự án' },
];

function gpaColor(gpa: number): string {
  if (gpa >= 3.5) return 'text-emerald-600 font-bold';
  if (gpa >= 3.0) return 'text-yellow-600 font-semibold';
  return 'text-red-500 font-semibold';
}

export default function Round1_CV({ sessionId, industry, onComplete }: Round1Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [sortUsed, setSortUsed] = useState('gpa_desc');
  const [filterUsed, setFilterUsed] = useState('all');
  const [submitting, setSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch(`/api/candidates?industry=${industry}`);
        const data = await res.json();
        setCandidates(data.candidates || []);
      } catch (error) {
        console.error('Failed to fetch candidates:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCandidates();
  }, [industry]);

  const toggleShortlist = useCallback((id: string) => {
    setShortlist(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = [...candidates];
    switch (filterUsed) {
      case 'gpa_high': list = list.filter(c => c.gpa >= 3.5); break;
      case 'has_internship': list = list.filter(c => c.internshipMonths > 0); break;
      case 'has_projects': list = list.filter(c => c.projects > 0); break;
    }
    switch (sortUsed) {
      case 'gpa_desc': list.sort((a, b) => b.gpa - a.gpa); break;
      case 'exp_desc': list.sort((a, b) => b.internshipMonths - a.internshipMonths); break;
      case 'projects_desc': list.sort((a, b) => b.projects - a.projects); break;
      case 'random': list.sort(() => Math.random() - 0.5); break;
    }
    return list;
  }, [candidates, filterUsed, sortUsed]);

  const handleSubmit = async () => {
    if (shortlist.length !== 5) return;
    setSubmitting(true);
    try {
      onComplete(shortlist, sortUsed, filterUsed);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 pb-20 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
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
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-yellow-50 to-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <PhilosophyBadge
            variant="sensory"
            title="GIAI ĐOẠN 1 · NHẬN THỨC CẢM TÍNG"
            subtitle="📚 Cặp phạm trù: BẢN CHẤT – HIỆN TƯỢNG · CV chỉ là hiện tượng"
          />
        </div>

        <div className="bg-slate-100 rounded-lg p-3 mb-4 text-sm border-l-4 border-slate-400">
          💬 <strong>Sếp:</strong> &ldquo;KPI tháng này chỉ được mời 5 người lên phỏng vấn. Sàng lọc kỹ giúp anh.&rdquo;
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold">
            Đã chọn: <span className={shortlist.length === 5 ? 'text-emerald-600' : 'text-red-500'}>{shortlist.length}/5</span>
          </div>
          <div className="flex gap-2">
            <select
              value={sortUsed}
              onChange={e => setSortUsed(e.target.value)}
              className="text-xs border rounded-lg px-2 py-1.5 bg-white"
            >
              {sortOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <select
              value={filterUsed}
              onChange={e => setFilterUsed(e.target.value)}
              className="text-xs border rounded-lg px-2 py-1.5 bg-white"
            >
              {filterOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {filteredAndSorted.map((c) => {
            const isSelected = shortlist.includes(c.id);
            return (
              <motion.div
                key={c.id}
                layout
                className={`relative bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' : 'border-gray-100 hover:border-gray-200 hover:shadow'
                }`}
                onClick={() => toggleShortlist(c.id)}
              >
                <div className="absolute top-2 right-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-2">
                  {c.name.split(' ').pop()?.[0]}
                </div>
                <h3 className="font-semibold text-sm text-gray-800 truncate pr-6">{c.name}</h3>
                <p className={`text-lg font-bold ${gpaColor(c.gpa)}`}>{c.gpa.toFixed(2)}</p>
                <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                  <p>{c.internshipMonths} tháng thực tập</p>
                  <p>{c.projects} dự án</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.skills.slice(0, 2).map(s => (
                    <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                  ))}
                  {c.skills.length > 2 && (
                    <span className="text-[10px] text-gray-400">+{c.skills.length - 2}</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 italic mt-1.5 truncate">{c.note}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mb-4">
          <motion.button
            whileHover={{ scale: shortlist.length === 5 ? 1.05 : 1 }}
            whileTap={{ scale: shortlist.length === 5 ? 0.95 : 1 }}
            onClick={handleSubmit}
            disabled={shortlist.length !== 5 || submitting}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-all ${
              shortlist.length === 5
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting ? 'Đang gửi...' : 'Gửi shortlist lên Sếp →'}
          </motion.button>
        </div>

        <QuoteBlock
          text="Hiện tượng phong phú hơn quy luật, quy luật sâu sắc hơn hiện tượng. GPA, bằng cấp — đều là hiện tượng. Bản chất chỉ lộ ra qua thực tiễn."
          author="V.I. Lênin"
          source="Bút ký Triết học"
          variant="lenin"
        />
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedCard && (() => {
          const card = candidates.find(c => c.id === selectedCard);
          if (!card) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
                    {card.name.split(' ').pop()?.[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{card.name}</h3>
                    <p className="text-sm text-gray-500">{card.note}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">{card.gpa.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">GPA</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-2xl font-bold">{card.internshipMonths}</p>
                    <p className="text-xs text-gray-500">Tháng thực tập</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Dự án: {card.projects}</p>
                  <div className="flex flex-wrap gap-1">
                    {card.skills.map(s => (
                      <span key={s} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="w-full py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Đóng
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
}
