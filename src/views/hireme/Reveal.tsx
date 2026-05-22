'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

interface TrialCandidate {
  id: string;
  name?: string;
  label?: string;
  gpa?: number;
  internshipMonths?: number;
  projects?: number;
  skills?: string[];
  quadrant?: string;
  outcome?: 'success' | 'fail';
  selectionReason?: string; // optional: why player selected this candidate
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
    title: 'Xu hướng ưu tiên học thuật',
    description: 'Xu hướng cho thấy bạn ưu tiên thành tích học tập (GPA) hơn yếu tố thực hành.',
    color: 'border-red-300 bg-red-50 text-red-700',
  },
  exp_heavy: {
    title: 'Xu hướng ưu tiên kinh nghiệm',
    description: 'Xu hướng cho thấy bạn đánh giá cao kinh nghiệm thực tế và sản phẩm/thực hành.',
    color: 'border-yellow-300 bg-yellow-50 text-yellow-700',
  },
  balanced: {
    title: 'Xu hướng đánh giá cân bằng',
    description: 'Bạn có xu hướng kết hợp cả thành tích học thuật và kinh nghiệm thực tế trong đánh giá.',
    color: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  },
  mixed: {
    title: 'Dữ liệu chưa đủ để kết luận xu hướng rõ ràng',
    description: 'Không có xu hướng rõ rệt từ các lựa chọn — cần thêm kiểm nghiệm để kết luận.',
    color: 'border-gray-300 bg-gray-50 text-gray-600',
  },
};

const quadrantLabels: Record<string, string> = {
  Q1: 'GPA cao + Thực tập cao',
  Q2: 'GPA cao + Thực tập thấp',
  Q3: 'GPA thấp + Thực tập cao',
  Q4: 'GPA thấp + Thực tập thấp',
  WILD: 'Hồ sơ ngoại lệ',
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
    { name: 'Xu hướng ưu tiên học thuật', status: 'Lưu ý', color: 'text-rose-600', desc: 'Ưu tiên thành tích học thuật trong đánh giá' },
    { name: 'Xu hướng ưu tiên kinh nghiệm', status: 'Lưu ý', color: 'text-yellow-700', desc: 'Ưu tiên năng lực thực hành và sản phẩm' },
    { name: 'Đánh giá cân bằng', status: 'Khuyến khích', color: 'text-emerald-700', desc: 'Kết hợp học thuật và thực hành, ưu tiên kiểm nghiệm' },
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
            THỰC TIỄN GIÚP KIỂM NGHIỆM
          </h1>
          <PhilosophyBadge variant="practice" title="Kết quả · Bản chất dần bộc lộ" />
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
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm mb-3 text-gray-700">Tỷ lệ PASS theo nhóm hồ sơ</h3>
            {process.env.NODE_ENV === 'development' && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Dữ liệu minh họa</span>
            )}
          </div>
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
            Bảng này thống kê toàn bộ bộ ứng viên trong lượt chơi, không chỉ 5 ứng viên bạn đã chọn.
          </p>
        </motion.div>

        {/* 5 selected candidates results */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border p-4 mb-6"
        >
          <h3 className="font-bold text-sm mb-3 text-gray-700">Kết quả kiểm nghiệm 5 ứng viên bạn đã chọn</h3>

          <p className="text-xs text-gray-500 mb-3">
            PASS được xác định từ vòng kiểm nghiệm thực tiễn, gồm bài test tình huống, phỏng vấn phản biện, sản phẩm/kinh nghiệm thực tế và khả năng học tiếp.
            <br />Quy tắc hiển thị: PASS nếu practicalScore ≥ 70; CẦN XEM XÉT nếu 50 ≤ practicalScore &lt; 70; FAIL nếu practicalScore &lt; 50.
          </p>

          <div className="space-y-3">
            {candidates && candidates.length > 0 ? (
              candidates.map((c) => {
                const candidate = c as TrialCandidate;
                const name = candidate.name || candidate.label || candidate.id;
                const quadrant = quadrantLabels[candidate.quadrant || ''] || (candidate.quadrant || 'Không rõ');
                // derive practical score/result
                const derivePracticalResult = (cand: TrialCandidate) => {
                  const months = cand.internshipMonths ?? NaN;
                  const projects = cand.projects ?? NaN;
                  const skills = (cand.skills || []).length;

                  const hasEnough = Number.isFinite(months) || Number.isFinite(projects) || skills > 0;
                  if (!hasEnough) {
                    return { score: null as number | null, result: 'CẦN XEM XÉT', reason: 'Dữ liệu kiểm nghiệm chưa đủ.' };
                  }

                  const normMonths = Number.isFinite(months) ? Math.min(36, months) / 36 : 0; // cap at 36 months
                  const normProjects = Number.isFinite(projects) ? Math.min(10, projects) / 10 : 0; // cap

                  // weighted sum -> 100 scale: months 40%, projects 40%, skills 20%
                  const score = Math.round((normMonths * 40 + normProjects * 40 + Math.min(10, skills) / 10 * 20));
                  let result = 'CẦN XEM XÉT';
                  if (score >= 70) result = 'PASS';
                  else if (score < 50) result = 'FAIL';

                  const reasonParts: string[] = [];
                  if (Number.isFinite(months)) reasonParts.push(`${months} tháng thực tập`);
                  if (Number.isFinite(projects)) reasonParts.push(`${projects} dự án`);
                  if (skills > 0) reasonParts.push(`${skills} kỹ năng`);

                  return { score, result, reason: reasonParts.length ? reasonParts.join(' · ') : 'Dữ liệu kiểm nghiệm chưa đủ.' };
                };

                const res = derivePracticalResult(candidate);

                return (
                  <div key={candidate.id} className="border rounded-lg p-3 flex items-start justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-800">{name}</div>
                      <div className="text-xs text-gray-500">Nhóm: {quadrant}</div>
                      {candidate.selectionReason && (
                        <div className="text-xs text-gray-600 mt-1">Bạn chọn vì: {candidate.selectionReason}</div>
                      )}
                      <div className="text-xs text-gray-600 mt-1">Lý do: {res.reason}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-extrabold ${res.result === 'PASS' ? 'text-emerald-600' : res.result === 'FAIL' ? 'text-rose-600' : 'text-yellow-700'}`}>
                        {res.result}
                      </div>
                      <div className="text-xs text-gray-400">{res.score === null ? 'Không đủ dữ liệu' : `Practical ${res.score}`}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Không có ứng viên được chọn trong lượt chơi này.</p>
            )}
          </div>
        </motion.div>

        {/* 3 schools comparison */}
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-3 text-gray-700">Ba trường phái so sánh:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {schools.map((s, i) => {
              const toneClass = s.status === 'Khuyến khích' ? 'border-emerald-300 bg-emerald-50' : s.status === 'Lưu ý' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-white';
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={`rounded-xl border-2 p-4 text-center ${toneClass}`}
                >
                  <p className="text-xs font-bold text-gray-600 mb-1">{s.name}</p>
                  <p className="text-sm text-gray-600 mb-1">{s.desc}</p>
                  <p className={`font-extrabold text-sm ${s.color}`}>{s.status}</p>
                </motion.div>
              );
            })}
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
            Trong bộ dữ liệu này, nhóm GPA cao + thực hành tốt có tỷ lệ PASS cao hơn. Tuy vậy, nhóm GPA thấp + thực hành cao và hồ sơ ngoại lệ cho thấy không nên đánh giá ứng viên chỉ bằng một chỉ số đơn lẻ.
            <br />CV/GPA chỉ là hiện tượng ban đầu — phỏng vấn, bài test và thử việc là quá trình kiểm nghiệm để làm rõ năng lực thực tế. Thực tiễn giúp kiểm tra nhận thức; không tuyệt đối hóa một chỉ số.
          </p>
        </motion.div>

        <div className="text-xs text-gray-500 mb-6">
          <strong>Hồ sơ ngoại lệ:</strong> Hồ sơ ngoại lệ là các ứng viên không thuộc rõ 4 nhóm GPA/thực tập chính, nhưng có tín hiệu đặc thù như sản phẩm nổi bật, năng lực tự học, kinh nghiệm không chính quy hoặc dữ liệu chưa đầy đủ.
        </div>

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
