'use client';

import { motion } from 'framer-motion';

interface GapCandidate {
  id: string;
  gpa?: number;
  outcome?: 'success' | 'fail';
}

interface KnowledgePracticeGapProps {
  candidates: GapCandidate[];
  successCount: number;
}

type GroupKey = 'dogmatic' | 'empiricist' | 'mature' | 'unfinished' | 'developing';

const GROUPS: Record<GroupKey, {
  title: string;
  short: string;
  description: string;
  philosophy: string;
  tone: string;
}> = {
  dogmatic: {
    title: 'Giỏi lý luận — Yếu vận dụng',
    short: 'Giáo điều tiềm năng',
    description:
      'Bạn nắm vững khái niệm theo sách vở, nhưng tri thức chưa kịp "đi vào" tình huống thực tế. Đây là tín hiệu của khuynh hướng giáo điều — cần thêm thực tiễn để hoàn thành vòng tròn nhận thức.',
    philosophy:
      'Tri thức của bạn dừng ở giai đoạn lý tính, chưa được thực tiễn cá nhân kiểm nghiệm và chuyển hoá thành năng lực hành động.',
    tone: 'border-rose-300 bg-rose-50 text-rose-900',
  },
  empiricist: {
    title: 'Kinh nghiệm thuần tuý — Thiếu khung lý luận',
    short: 'Kinh nghiệm chủ nghĩa tiềm năng',
    description:
      'Bạn nắm bắt tốt thực tiễn nhưng ít dựa vào tiêu chí lý luận. Đây là tín hiệu của khuynh hướng kinh nghiệm chủ nghĩa — cần thêm khung tri thức hệ thống để mở rộng phạm vi vận dụng.',
    philosophy:
      'Thực tiễn của bạn vận hành tốt nhưng thiếu lý luận làm "kim chỉ nam" — chân lý vẫn tương đối và dễ chỉ đúng trong phạm vi đã trải nghiệm.',
    tone: 'border-amber-300 bg-amber-50 text-amber-900',
  },
  mature: {
    title: 'Học chắc — Hành chắc',
    short: 'Vòng tròn nhận thức đang khép kín',
    description:
      'Bạn đang hoàn thành tốt vòng tròn nhận thức biện chứng: lý luận – thực tiễn – phản tư. Hãy tiếp tục đưa tri thức ra kiểm nghiệm để vòng xoáy ốc đi lên.',
    philosophy:
      'Đây là trạng thái thống nhất biện chứng giữa nhận thức và thực tiễn — đích đến mà chủ nghĩa duy vật biện chứng hướng tới.',
    tone: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  },
  unfinished: {
    title: 'Chưa hoàn thiện cả hai phía',
    short: 'Điểm khởi đầu, không phải kết luận',
    description:
      'Cả lý luận và thực tiễn của bạn còn ở giai đoạn đầu. Đây là điểm khởi đầu để bắt đầu vòng tròn nhận thức — không phải đánh giá năng lực.',
    philosophy:
      'Quá trình nhận thức là một chặng đường dài. Mỗi lần kiểm nghiệm là một bước nhảy nhỏ trên đường xoáy ốc đi lên.',
    tone: 'border-slate-300 bg-slate-50 text-slate-700',
  },
  developing: {
    title: 'Đang trên đường — tiếp tục kiểm nghiệm',
    short: 'Cân bằng nhưng cần thêm trải nghiệm',
    description:
      'Lý luận và thực tiễn của bạn tương đối cân nhau nhưng chưa đủ "sâu". Hãy tiếp tục đưa tri thức ra kiểm nghiệm trong nhiều bối cảnh khác nhau.',
    philosophy:
      'Cân bằng chỉ là điều kiện cần — chiều sâu nhận thức đến từ số lần thực tiễn quay lại điều chỉnh lý luận.',
    tone: 'border-blue-300 bg-blue-50 text-blue-900',
  },
};

function classify(theoryScore: number, practiceScore: number): GroupKey {
  const gap = theoryScore - practiceScore;
  if (gap >= 25) return 'dogmatic';
  if (gap <= -25) return 'empiricist';
  if (theoryScore >= 70 && practiceScore >= 70) return 'mature';
  if (theoryScore < 50 && practiceScore < 50) return 'unfinished';
  return 'developing';
}

function computeScores(candidates: GapCandidate[], successCount: number) {
  const valid = candidates.filter(c => typeof c.gpa === 'number');
  const avgGpa = valid.length > 0
    ? valid.reduce((sum, c) => sum + (c.gpa || 0), 0) / valid.length
    : 0;
  // Normalize GPA 2.0-4.0 → 0-100; cap to [0, 100]
  const theoryScore = Math.max(0, Math.min(100, Math.round(((avgGpa - 2.0) / 2.0) * 100)));
  const practiceScore = candidates.length > 0
    ? Math.round((successCount / candidates.length) * 100)
    : 0;
  return { theoryScore, practiceScore, avgGpa };
}

export default function KnowledgePracticeGap({ candidates, successCount }: KnowledgePracticeGapProps) {
  const { theoryScore, practiceScore, avgGpa } = computeScores(candidates, successCount);
  const gap = theoryScore - practiceScore;
  const group = GROUPS[classify(theoryScore, practiceScore)];

  // Quadrant position for scatter (0-100 → percentage)
  const dotLeft = `${theoryScore}%`;
  const dotBottom = `${practiceScore}%`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      data-testid="knowledge-practice-gap"
      className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm"
    >
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Báo cáo nhận thức cá nhân</p>
        <h3 className="mt-1 text-lg font-extrabold text-slate-900">Khoảng cách Tri thức – Thực tiễn</h3>
        <p className="mt-1 text-xs text-slate-500">Đo chênh lệch giữa nhận thức lý tính (Vòng 1) và kiểm nghiệm thực tiễn (Vòng 3).</p>
      </div>

      {/* Two scores side by side */}
      <div className="grid gap-3 sm:grid-cols-2 mb-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Vòng 1 · Lý luận</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">{theoryScore}<span className="text-sm font-medium text-slate-500">/100</span></p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-slate-900 transition-all" style={{ width: `${theoryScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">GPA trung bình shortlist: {avgGpa.toFixed(2)} — chuẩn &ldquo;học đường&rdquo;</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Vòng 3 · Thực tiễn</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-700">{practiceScore}<span className="text-sm font-medium text-slate-500">/100</span></p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-emerald-600 transition-all" style={{ width: `${practiceScore}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{successCount}/{candidates.length} ứng viên PASS thử việc — chuẩn &ldquo;nghề nghiệp&rdquo;</p>
        </div>
      </div>

      {/* Gap headline */}
      <div className={`rounded-xl border-2 px-4 py-3 mb-4 ${group.tone}`} data-testid="kpg-verdict">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wider opacity-70">Gap</p>
          <p className="text-2xl font-extrabold">{gap > 0 ? '+' : ''}{gap}</p>
        </div>
        <p className="mt-1 text-sm font-bold">{group.title}</p>
        <p className="mt-1 text-xs opacity-80">{group.short}</p>
        <p className="mt-2 text-xs leading-relaxed">{group.description}</p>
      </div>

      {/* 4-quadrant scatter */}
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Vị trí của bạn (★) trên bản đồ nhận thức</p>
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
          {/* axes background grid */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            <div className="border border-slate-200 bg-rose-50/40 flex items-end justify-start p-1.5">
              <span className="text-[10px] font-semibold text-slate-500 leading-tight">Chưa hoàn thiện</span>
            </div>
            <div className="border border-slate-200 bg-rose-50/60 flex items-end justify-end p-1.5">
              <span className="text-[10px] font-semibold text-rose-700 leading-tight text-right">Giỏi lý luận<br />Yếu vận dụng</span>
            </div>
            <div className="border border-slate-200 bg-amber-50/60 flex items-start justify-start p-1.5">
              <span className="text-[10px] font-semibold text-amber-800 leading-tight">Kinh nghiệm<br />thuần tuý</span>
            </div>
            <div className="border border-slate-200 bg-emerald-50/60 flex items-start justify-end p-1.5">
              <span className="text-[10px] font-semibold text-emerald-800 leading-tight text-right">Học chắc<br />Hành chắc</span>
            </div>
          </div>
          {/* dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="absolute -translate-x-1/2 translate-y-1/2 text-2xl"
            style={{ left: dotLeft, bottom: dotBottom }}
            aria-label="Vị trí của bạn"
          >
            <span className="drop-shadow-md">★</span>
          </motion.div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase text-slate-500">
          <span>← Lý luận thấp</span>
          <span>Lý luận cao →</span>
        </div>
        <div className="mt-0.5 text-center text-[10px] font-semibold uppercase text-slate-500">↑ Thực tiễn cao · ↓ Thực tiễn thấp</div>
      </div>

      <p className="mt-3 text-xs italic text-slate-500">
        {group.philosophy}
      </p>
    </motion.section>
  );
}
