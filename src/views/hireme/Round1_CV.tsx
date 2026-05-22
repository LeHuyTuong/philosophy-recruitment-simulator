'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import QuoteBlock from '@/components/hireme/QuoteBlock';
import { getJobDescription, matchJdSkills } from '@/data/jobDescriptions';

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
  { value: 'default', label: 'Mặc định' },
  { value: 'gpa_desc', label: 'GPA ↓' },
  { value: 'exp_desc', label: 'Tháng thực tập ↓' },
  { value: 'projects_desc', label: 'Dự án ↓' },
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

// Deterministic seeded random shuffle
function seededShuffle<T>(array: T[], seed: string): T[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit int
  }

  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    hash = ((hash << 5) - hash) + i;
    hash = hash & hash;
    const j = Math.abs(hash) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Round1_CV({ sessionId, industry, onComplete }: Round1Props) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [sortUsed, setSortUsed] = useState('default');
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

    // Filter
    switch (filterUsed) {
      case 'gpa_high': list = list.filter(c => c.gpa >= 3.5); break;
      case 'has_internship': list = list.filter(c => c.internshipMonths > 0); break;
      case 'has_projects': list = list.filter(c => c.projects > 0); break;
    }

    // Sort
    switch (sortUsed) {
      case 'gpa_desc': list.sort((a, b) => b.gpa - a.gpa); break;
      case 'exp_desc': list.sort((a, b) => b.internshipMonths - a.internshipMonths); break;
      case 'projects_desc': list.sort((a, b) => b.projects - a.projects); break;
      case 'default':
        list = seededShuffle(list, `${sessionId}-${industry}`);
        break;
    }
    return list;
  }, [candidates, filterUsed, sortUsed, sessionId, industry]);

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

  const isDefaultSort = sortUsed === 'default';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="round1-page"
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-yellow-50 to-white"
    >
      <div className="max-w-5xl mx-auto">
              <div className="mb-4">
                <PhilosophyBadge
                  variant="sensory"
                  title="GIAI ĐOẠN 1 · NHẬN THỨC CẢM TÍNH"
                  subtitle="📚 Cặp phạm trù: BẢN CHẤT – HIỆN TƯỢNG · CV chỉ là hiện tượng"
                />
              </div>

        <div className="bg-slate-100 rounded-lg p-3 mb-4 text-sm border-l-4 border-slate-400">
          💬 <strong>Sếp:</strong> &ldquo;KPI tháng này chỉ được mời 5 người lên phỏng vấn. Sàng lọc kỹ giúp anh.&rdquo;
        </div>

        {/* Job Description card (from boss) */}
        <div className="bg-white rounded-lg border p-4 mb-4">
          {(() => {
            const jd = getJobDescription(industry);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold">💼 {jd.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{jd.companyContext}</p>

                  <div className="mt-3 text-sm">
                    <p className="font-semibold text-xs text-gray-600">Yêu cầu bắt buộc</p>
                    <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                      {jd.mustHave.map(m => <li key={m}>{m}</li>)}
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-xs text-gray-600">Gợi ý sàng lọc</p>
                  <p className="text-sm text-gray-700 mt-1">{jd.evaluationHint}</p>

                  <details className="mt-3 text-sm">
                    <summary className="cursor-pointer text-xs text-gray-500">Xem JD đầy đủ</summary>
                    <div className="mt-2">
                      <p className="font-semibold text-xs text-gray-600">Nhiệm vụ chính</p>
                      <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                        {jd.responsibilities.map(r => <li key={r}>{r}</li>)}
                      </ul>
                      <p className="font-semibold text-xs text-gray-600 mt-2">Điểm cộng</p>
                      <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                        {jd.niceToHave.map(n => <li key={n}>{n}</li>)}
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Shuffle microcopy — only show when using default sort */}
        {isDefaultSort && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 mb-4 text-xs text-amber-700">
            ⚠️ Thứ tự ứng viên đã được xáo trộn ngẫu nhiên. Đừng chỉ nhìn GPA — hãy kiểm nghiệm qua nhiều dấu hiệu để tránh nhầm hiện tượng với bản chất.
          </div>
        )}

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
                data-testid="candidate-card"
                data-candidate-id={c.id}
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

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                    {c.name.split(' ').pop()?.[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800 truncate pr-6">{c.name}</h3>
                    <p className="text-xs text-gray-500">GPA <span className={gpaColor(c.gpa)}>{c.gpa.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                  <p>
                    <strong>Kinh nghiệm:</strong>{' '}
                    {c.internshipMonths > 0 ? `${c.internshipMonths} tháng thực tập` : 'Chưa có kinh nghiệm doanh nghiệp'}
                    {' · '}
                    {c.projects > 0 ? `${c.projects} dự án` : 'Chưa có portfolio rõ ràng'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {c.skills.map(s => (
                    <span key={s} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{s}</span>
                  ))}
                </div>

                <p className="text-[10px] text-gray-400 italic mt-2 truncate">{c.note}</p>
                {/* JD fit hints */}
                <div className="mt-2 text-xs text-gray-600">
                  {(() => {
                    const jd = getJobDescription(industry);
                    const { matchedMust, matchedNice } = matchJdSkills(c.skills, jd);
                    const displayMust = matchedMust.slice(0, 3).map(m => m.replace(/\b([a-z])/g, s => s.toUpperCase()));
                    const displayNice = matchedNice.slice(0, 3).map(n => n.replace(/\b([a-z])/g, s => s.toUpperCase()));
                    const note = (c.note || '').toLowerCase();
                    const warnings: string[] = [];
                    if (/(kiêu|ngại|tiêu cực|cãi|ngại)/.test(note)) warnings.push('thái độ / làm việc nhóm');

                    return (
                      <div>
                        {displayMust.length > 0 ? (
                          <p><strong>Khớp JD:</strong> {displayMust.join(', ')}</p>
                        ) : matchedNice.length > 0 ? (
                          <p><strong>Điểm cộng JD:</strong> {displayNice.join(', ')}</p>
                        ) : (
                          <p><strong>Khớp JD:</strong> Chưa rõ - cần kiểm chứng qua phỏng vấn</p>
                        )}
                        {warnings.length > 0 && (
                          <p className="text-[11px] text-rose-600 mt-1">Cần kiểm chứng: {warnings.join(', ')}</p>
                        )}
                      </div>
                    );
                  })()}
                </div>
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
                    <p className="text-sm">
                      {card.internshipMonths > 0 ? `${card.internshipMonths} tháng thực tập` : 'Chưa có kinh nghiệm doanh nghiệp'}
                    </p>
                    <p className="text-xs text-gray-500">Kinh nghiệm</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1">Portfolio: {card.projects > 0 ? `${card.projects} dự án` : 'Chưa có portfolio rõ ràng'}</p>
                  <div className="flex flex-wrap gap-2">
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
