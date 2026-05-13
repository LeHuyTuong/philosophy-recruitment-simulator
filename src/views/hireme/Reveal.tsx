'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

interface TrialCandidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  quadrant: string;
  outcome: 'success' | 'fail';
}

interface RevealProps {
  criteriaProfile: string;
  successCount: number;
  candidates: TrialCandidate[];
  allCandidates: TrialCandidate[];
  onNavigate: (page: string) => void;
}

const verdicts: Record<string, { title: string; description: string; color: string }> = {
  gpa_heavy: {
    title: 'Duy tâm chủ quan (Berkeley)',
    description: 'Bạn ưu tiên GPA — bạn đang ở vị trí của BERKELEY (Duy tâm chủ quan): lấy con số trên giấy làm chân lý.',
    color: 'border-red-300 bg-red-50 text-red-700',
  },
  exp_heavy: {
    title: 'Thực tiễn mù quáng',
    description: 'Bạn ưu tiên kinh nghiệm — bạn nghiêng về "thực tiễn mù quáng" theo Hồ Chí Minh: thực tiễn không có lý luận.',
    color: 'border-yellow-300 bg-yellow-50 text-yellow-700',
  },
  balanced: {
    title: 'Phép biện chứng chứng ✓',
    description: 'Bạn kết hợp cả hai — bạn đang vận dụng PHÉP BIỆN CHỨNG: lý luận đi đôi với thực tiễn.',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  },
  mixed: {
    title: 'Hoài nghi luận',
    description: 'Bạn chọn ngẫu nhiên — gần với HOÀI NGHI LUẬN: không có tiêu chí rõ ràng.',
    color: 'border-gray-300 bg-gray-50 text-gray-600',
  },
};

const quadrantLabels: Record<string, string> = {
  Q1: 'GPA cao + Thực tập cao',
  Q2: 'GPA cao + Thực tập thấp',
  Q3: 'GPA thấp + Thực tập cao',
  Q4: 'GPA thấp + Thực tập thấp',
  WILD: 'Đặc biệt',
};

const successByQuadrant = (candidates: TrialCandidate[]) => {
  const counts: Record<string, { total: number; success: number }> = {};
  candidates.forEach(c => {
    if (!counts[c.quadrant]) counts[c.quadrant] = { total: 0, success: 0 };
    counts[c.quadrant].total++;
    if (c.outcome === 'success') counts[c.quadrant].success++;
  });
  return counts;
};

export default function Reveal({ criteriaProfile, successCount, candidates, allCandidates, onNavigate }: RevealProps) {
  const verdict = verdicts[criteriaProfile] || verdicts.mixed;
  const allSuccess = allCandidates.filter(c => c.outcome === 'success');
  const qCounts = successByQuadrant(allCandidates);

  const schools = [
    { name: 'Duy tâm chủ quan (Berkeley)', verdict: 'SAI', color: 'text-red-500', desc: '"Cái tôi tin = chân lý"' },
    { name: 'Hoài nghi luận (Hume)', verdict: 'BẾ TẮC', color: 'text-yellow-600', desc: '"Không biết được"' },
    { name: 'Duy vật biện chứng (Marx-Lenin)', verdict: 'ĐÚNG', color: 'text-emerald-600', desc: '"Thực tiễn = tiêu chuẩn"' },
  ];

  const journey = [
    { label: 'Bản chất – Hiện tượng', detail: 'Vòng 1', done: true },
    { label: 'Khả năng – Hiện thực', detail: 'Vòng 2', done: true },
    { label: 'Thực tiễn → bản chất lộ ra', detail: 'Vòng 3', done: true },
    { label: 'Cái chung – Cái riêng', detail: 'Đa ngành', done: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
            THỰC TIỄN ĐÃ PHÁN QUYẾT
          </h1>
          <PhilosophyBadge variant="practice" title="Kết quả · BẢN CHẤT đã lộ ra" />
        </motion.div>

        {/* Criteria verdict */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-2xl border-2 p-5 mb-6 ${verdict.color}`}
        >
          <h2 className="font-bold text-lg mb-1">{verdict.title}</h2>
          <p className="text-sm leading-relaxed">{verdict.description}</p>
        </motion.div>

        {/* Success by quadrant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border p-4 mb-6"
        >
          <h3 className="font-bold text-sm mb-3 text-gray-700">Top ứng viên thực sự PASS theo phân khu:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(qCounts).map(([q, counts]) => (
              <div key={q} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-600">{quadrantLabels[q] || q}</p>
                <p className="text-lg font-extrabold text-emerald-600">
                  {counts.success}/{counts.total}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Phân khu Q1 (GPA cao + thực hành) có xác suất thành công cao nhất — nhưng Q3 và WILD cũng đáng kể.
          </p>
        </motion.div>

        {/* 3 schools comparison */}
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-3 text-gray-700">Ba trường phái so sánh:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {schools.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`rounded-xl border-2 p-4 text-center ${
                  s.verdict === 'ĐÚNG' ? 'border-emerald-300 bg-emerald-50' : s.verdict === 'SAI' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <p className="text-xs font-bold text-gray-600 mb-1">{s.name}</p>
                <p className="text-sm text-gray-600 mb-1">{s.desc}</p>
                <p className={`font-extrabold text-sm ${s.color}`}>{s.verdict}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy journey timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl border p-4 mb-6"
        >
          <h3 className="font-bold text-sm mb-3 text-gray-700">Bạn vừa đi qua các cặp phạm trù:</h3>
          <div className="space-y-2">
            {journey.map((j, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-sm font-medium text-gray-700">{j.label}</span>
                <span className="text-xs text-gray-400">({j.detail})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Punchline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-5 text-white mb-6"
        >
          <p className="text-sm leading-relaxed font-medium">
            GPA cao + thực hành = xác suất cao nhất.
            <br />Chỉ GPA cao = lý luận suông (Hồ Chí Minh).
            <br />Chỉ kinh nghiệm = thực tiễn mù quáng (Hồ Chí Minh).
            <br />Cả hai + thực tiễn kiểm nghiệm = <strong>CHÂN LÝ</strong>.
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('criteria')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg"
          >
            So sánh Đúng – Đủ – Hiệu quả →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
          >
            Xem dashboard lớp →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
