'use client';

import { motion } from 'framer-motion';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

const schools = [
  {
    name: 'Duy tâm chủ quan',
    icon: '🧠',
    thinker: 'George Berkeley, Ernst Mach',
    view: '"Tồn tại là được cảm giác. Chân lý phụ thuộc cảm nhận cá nhân."',
    hire: 'Ứng viên có GPA cao — vì tôi CẢM THẤY họ giỏi.',
    mistake: 'Lấy hiện tượng chủ quan làm bản chất.',
    color: 'border-red-200 bg-red-50',
    label: 'SAI',
    labelColor: 'text-red-600',
  },
  {
    name: 'Duy tâm khách quan',
    icon: '🔵',
    thinker: 'Plato, Hegel',
    view: '"Ý niệm có trước, vật chất có sau. Chân lý có sẵn trong ý niệm tuyệt đối."',
    hire: 'Người tài là người trời sinh, được số phận chọn.',
    mistake: 'Tách rời chân lý khỏi thực tiễn vật chất.',
    color: 'border-orange-200 bg-orange-50',
    label: 'SAI',
    labelColor: 'text-orange-600',
  },
  {
    name: 'Hoài nghi luận',
    icon: '❓',
    thinker: 'Pyrrho, David Hume',
    view: '"Chúng ta không thể biết chắc điều gì là đúng."',
    hire: '"Ai biết được. Tuyển đại."',
    mistake: 'Phủ nhận khả năng nhận thức → bế tắc.',
    color: 'border-yellow-200 bg-yellow-50',
    label: 'BẾ TẮC',
    labelColor: 'text-yellow-700',
  },
  {
    name: 'Bất khả tri luận',
    icon: '🌫️',
    thinker: 'Immanuel Kant',
    view: '"Chỉ biết được hiện tượng, không biết được vật tự nó."',
    hire: '"CV chỉ là bề ngoài, không thể biết bản chất con người."',
    mistake: 'Dừng ở hiện tượng, không tiến đến bản chất.',
    color: 'border-gray-200 bg-gray-50',
    label: 'THIẾU',
    labelColor: 'text-gray-600',
  },
  {
    name: 'Duy vật siêu hình',
    icon: '📐',
    thinker: 'Feuerbach',
    view: '"Nhận thức là sự phản ánh tĩnh, máy móc của vật chất vào ý thức."',
    hire: '"Cứ đo GPA + làm test IQ là biết hết."',
    mistake: 'Bỏ qua tính biện chứng và vai trò thực tiễn.',
    color: 'border-slate-200 bg-slate-50',
    label: 'THIẾU',
    labelColor: 'text-slate-600',
  },
  {
    name: 'Duy vật biện chứng ⭐',
    icon: '⭐',
    thinker: 'Karl Marx, Friedrich Engels, V.I. Lenin',
    view: '"Nhận thức là quá trình biện chứng đi từ trực quan sinh động → tư duy trừu tượng → thực tiễn. Thực tiễn là tiêu chuẩn của chân lý."',
    hire: '"Phải qua 3 vòng (CV → Phỏng vấn → Thử việc) — thực tiễn phán quyết."',
    correct: true,
    mistake: 'Khắc phục cả duy tâm + hoài nghi + siêu hình.',
    color: 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-300',
    label: 'ĐÚNG',
    labelColor: 'text-emerald-600',
  },
];

export default function Schools() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            6 Trường phái Nhận thức trong Lịch sử Triết học
          </h1>
          <p className="text-sm text-gray-500 mb-3">
            Mỗi trường phái sẽ trả lời câu hỏi &ldquo;ai sẽ thành công?&rdquo; khác nhau
          </p>
          <PhilosophyBadge variant="rational" title="📚 Chương 2.3 · Lý luận nhận thức" subtitle="Trường phái nhận thức" className="mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`rounded-xl border-2 p-5 ${school.color} ${
                school.correct ? 'md:col-span-2 max-w-lg mx-auto w-full' : ''
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{school.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base">{school.name}</h3>
                    <span className={`text-xs font-bold ${school.labelColor}`}>{school.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{school.thinker}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Quan điểm:</p>
                  <p className="text-gray-700 italic">{school.view}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Trường phái này tuyển ai?</p>
                  <p className="text-gray-700">{school.hire}</p>
                </div>
                <div className={`rounded-lg p-2 ${school.correct ? 'bg-emerald-100' : 'bg-red-100/50'}`}>
                  <p className={`text-xs font-semibold ${school.correct ? 'text-emerald-700' : 'text-red-600'}`}>
                    {school.correct ? '✓ Đúng đắn:' : '✗ Sai lầm:'} {school.mistake}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-emerald-100 rounded-xl border-2 border-emerald-300 p-4 text-center">
          <p className="text-sm font-bold text-gray-700 mb-1">Bạn vừa chơi game theo trường phái nào?</p>
          <p className="text-sm text-emerald-700 font-semibold">
            Duy vật biện chứng — bằng cách kiểm nghiệm qua 3 vòng thực tiễn.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
