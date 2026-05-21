'use client';

import { motion } from 'framer-motion';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

const schools = [
  {
    name: 'Duy tâm chủ quan',
    icon: '🧠',
    thinker: 'George Berkeley, Ernst Mach',
    view: 'Ý thức hoặc cảm giác cá nhân được đặt trước; chân lý bị đặt vào kinh nghiệm chủ quan.',
    hire: 'Ví dụ tuyển dụng: chọn ứng viên vì “tôi cảm thấy bạn này giỏi”.',
    mistake: 'Dễ tuyệt đối hóa cảm giác cá nhân.',
    color: 'border-rose-200 bg-rose-50',
    status: 'Hạn chế',
    statusColor: 'text-rose-600',
  },
  {
    name: 'Duy tâm khách quan',
    icon: '🔵',
    thinker: 'Plato, Hegel',
    view: 'Ý niệm, tinh thần khách quan được xem là nguồn gốc; vật chất bị hiểu qua khái niệm có sẵn.',
    hire: 'Ví dụ tuyển dụng: tin rằng người tài có “tố chất có sẵn”, ít chú ý đến hoàn cảnh thực tiễn.',
    mistake: 'Dễ tách đánh giá khỏi điều kiện thực tiễn.',
    color: 'border-amber-200 bg-amber-50',
    status: 'Hạn chế',
    statusColor: 'text-amber-600',
  },
  {
    name: 'Duy vật chất phác',
    icon: '🔬',
    thinker: 'Trung tính/tiền-biện chứng',
    view: 'Nhấn mạnh vật chất hoặc các dữ kiện hiện thực một cách trực quan và đơn giản.',
    hire: 'Ví dụ tuyển dụng: chỉ dựa vào một chỉ số như số dự án hoặc số tháng kinh nghiệm.',
    mistake: 'Dễ đơn giản hóa, bỏ qua các khía cạnh liên hệ và phát triển.',
    color: 'border-sky-200 bg-sky-50',
    status: 'Chưa toàn diện',
    statusColor: 'text-sky-600',
  },
  {
    name: 'Duy vật siêu hình',
    icon: '📐',
    thinker: 'Feuerbach',
    view: 'Nhìn sự vật tách rời, tĩnh tại; coi các thuộc tính như các hằng số.',
    hire: 'Ví dụ tuyển dụng: cộng điểm GPA + thực tập + test rồi kết luận cứng.',
    mistake: 'Bỏ qua sự phát triển, mâu thuẫn và khả năng thay đổi.',
    color: 'border-slate-200 bg-slate-50',
    status: 'Chưa toàn diện',
    statusColor: 'text-slate-600',
  },
  {
    name: 'Bất khả tri luận',
    icon: '🌫️',
    thinker: 'Immanuel Kant',
    view: 'Nghi ngờ hoặc phủ nhận khả năng nhận thức bản chất; chỉ có thể biết hiện tượng.',
    hire: 'Ví dụ tuyển dụng: “CV chỉ là bề ngoài, không thể biết năng lực thật”.',
    mistake: 'Nếu tuyệt đối hóa sẽ dẫn đến bế tắc trong ra quyết định.',
    note: 'Ghi chú: các dạng hoài nghi luận (ví dụ Hume) nhấn mạnh nghi vấn về cơ sở khẳng định.',
    color: 'border-gray-200 bg-gray-50',
    status: 'Chưa đầy đủ',
    statusColor: 'text-gray-600',
  },
  {
    name: 'Duy vật biện chứng',
    icon: '⭐',
    thinker: 'Karl Marx, Friedrich Engels, V.I. Lenin',
    view: 'Nhận thức phải xuất phát từ hiện thực khách quan, xem xét mối liên hệ, sự phát triển và kiểm nghiệm bằng thực tiễn.',
    hire: 'Ví dụ tuyển dụng: đánh giá qua CV → phỏng vấn → thử việc/tình huống thực tế.',
    mistake: 'Không dừng ở hiện tượng; khuyến khích kiểm nghiệm thực tiễn.',
    color: 'border-emerald-300 bg-emerald-50 ring-2 ring-emerald-200',
    status: 'Phù hợp với bài học',
    statusColor: 'text-emerald-700',
  },
];

export default function Schools() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-5 pb-20 md:pb-8 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Các lập trường và phương pháp triết học liên quan đến nhận thức
          </h1>
          <p className="text-sm text-gray-500 mb-3">
            Mỗi lập trường đưa ra một cách nhìn khác nhau về quan hệ giữa vật chất, ý thức và khả năng nhận thức.
          </p>
          <PhilosophyBadge variant="rational" title="📚 Chương 1–2 · Nhập môn và Lý luận nhận thức" subtitle="Bản đồ lập trường triết học" className="mx-auto" />
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
                    <span className={`text-xs font-semibold ${school.statusColor}`}>{school.status}</span>
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
                <div className={`rounded-lg p-2 bg-gray-50`}>
                  <p className={`text-xs font-semibold text-gray-700`}>
                    {school.status ? `${school.status}:` : 'Lưu ý:'} {school.mistake}
                  </p>
                  {school.note ? (
                    <p className="text-[11px] text-gray-500 italic mt-2">{school.note}</p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-emerald-100 rounded-xl border-2 border-emerald-300 p-4 text-center">
          <p className="text-sm font-bold text-gray-700 mb-1">Cách app vận hành gần với lập trường nào?</p>
          <p className="text-sm text-emerald-700 font-semibold">
            App tiếp cận theo tinh thần duy vật biện chứng: không dừng ở CV/GPA ban đầu, mà đi qua phân tích, đối chiếu và kiểm nghiệm bằng tình huống thực tiễn.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
