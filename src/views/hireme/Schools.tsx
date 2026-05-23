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
    thinker: 'Triết học Cổ đại (Thales, Democritus...)',
    view: 'Đồng nhất vật chất với các dạng vật thể cụ thể, cảm tính; nhận thức mang tính trực quan sinh động nhưng còn mộc mạc, cảm tính.',
    hire: 'Ví dụ tuyển dụng: Đồng nhất năng lực ứng viên hoàn toàn với một vật thể hữu hình cụ thể như tấm bằng tốt nghiệp loại xuất sắc hoặc một xấp chứng chỉ dày, coi vật thể đó chính là năng lực.',
    mistake: 'Dễ đồng nhất bản chất năng lực với vật thể biểu hiện bên ngoài.',
    color: 'border-sky-200 bg-sky-50',
    status: 'Chưa toàn diện',
    statusColor: 'text-sky-600',
  },
  {
    name: 'Duy vật siêu hình',
    icon: '📐',
    thinker: 'Các nhà duy vật thế kỷ XVII–XVIII, chịu ảnh hưởng tư duy cơ giới',
    view: 'Thừa nhận thế giới khách quan, nhưng nhìn sự vật trong trạng thái cô lập, tĩnh tại, máy móc; xem sự phát triển chủ yếu như sự tăng giảm thuần túy về mặt số lượng.',
    hire: 'Ví dụ tuyển dụng: Cộng điểm một cách cơ giới như GPA + số tháng thực tập + điểm test thành một tổng số rồi kết luận cứng; coi năng lực là một hằng số tĩnh tại, bỏ qua bối cảnh và khả năng phát triển của ứng viên.',
    mistake: 'Biến dữ liệu thành kết luận máy móc, xem năng lực con người như một đại lượng cố định, ít chú ý đến sự vận động và phát triển.',
    color: 'border-slate-200 bg-slate-50',
    status: 'Chưa toàn diện',
    statusColor: 'text-slate-600',
  },
  {
    name: 'Thuyết bất khả tri',
    icon: '🌫️',
    thinker: 'Hume, Kant',
    view: 'Nghi ngờ hoặc phủ nhận khả năng con người nhận thức được bản chất sự vật như nó vốn có; kết quả nhận thức thường chỉ là hình thức bề ngoài, hạn hẹp của đối tượng.',
    hire: 'CV và phỏng vấn chỉ là bề ngoài, không thể biết chắc năng lực thật.',
    mistake: 'Nếu tuyệt đối hóa quan điểm này, người tuyển dụng dễ rơi vào bế tắc và không thể ra quyết định.',
    note: 'Lưu ý: Hoài nghi luận có liên quan đến thuyết bất khả tri nhưng không đồng nhất. Hoài nghi luận nhấn mạnh việc nghi ngờ cơ sở của tri thức đã có.',
    color: 'border-gray-200 bg-gray-50',
    status: 'Chưa đầy đủ',
    statusColor: 'text-gray-600',
  },
  {
    name: 'Hoài nghi luận',
    icon: '❓',
    thinker: 'Truyền thống hoài nghi; Hume là đại biểu liên quan',
    view: 'Nâng sự hoài nghi thành nguyên tắc khi xem xét tri thức đã có.',
    hire: 'Luôn nghi ngờ mọi dữ liệu về ứng viên, từ CV đến phỏng vấn và bài test.',
    mistake: 'Nếu hoài nghi quá mức, người tuyển dụng không thể ra quyết định.',
    color: 'border-violet-200 bg-violet-50',
    status: 'Liên quan đến nhận thức',
    statusColor: 'text-violet-600',
  },
  {
    name: 'Thuyết khả tri',
    icon: '🔎',
    thinker: 'Đa số các nhà triết học thừa nhận khả năng nhận thức',
    view: 'Con người về nguyên tắc có thể nhận thức được thế giới và bản chất sự vật thông qua quá trình nhận thức.',
    hire: 'Năng lực ứng viên có thể được hiểu dần qua CV, phỏng vấn, bài test, sản phẩm thực tế và quá trình thử việc.',
    mistake: 'Không có nghĩa là biết ngay lập tức, mà là biết thông qua kiểm chứng từng bước.',
    color: 'border-emerald-100 bg-emerald-25',
    status: 'Cơ sở tích cực',
    statusColor: 'text-emerald-700',
  },
  {
    name: 'Nhị nguyên luận',
    icon: '⚖️',
    thinker: 'Descartes',
    view: 'Xem vật chất và tinh thần như hai bản nguyên cùng tồn tại.',
    hire: 'Vừa tin vào dữ liệu khách quan, vừa tin vào trực giác người phỏng vấn, nhưng chưa chỉ ra rõ yếu tố nào quyết định cuối cùng.',
    mistake: 'Dễ dao động giữa duy vật và duy tâm khi ra quyết định.',
    color: 'border-indigo-200 bg-indigo-50',
    status: 'Xem thêm',
    statusColor: 'text-indigo-600',
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
      data-testid="schools-page"
      className="min-h-screen px-4 py-5 pb-20 md:pb-8 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Các lập trường triết học về vật chất, ý thức và nhận thức
          </h1>
          <p className="text-sm text-gray-500 mb-3">
            Mỗi lập trường triết học có thể được minh họa bằng một cách đánh giá con người trong tuyển dụng.
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
              data-testid="philosophy-card"
              data-school-name={school.name}
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
            App vận hành gần với tinh thần duy vật biện chứng: không tuyệt đối hóa CV, GPA hay cảm giác ban đầu, mà xem năng lực ứng viên trong mối liên hệ giữa dữ liệu, bối cảnh, quá trình phát triển và kiểm nghiệm thực tiễn. Quy trình CV → phân tích → phỏng vấn → bài test/tình huống → thử việc phản ánh quan điểm: nhận thức phải được kiểm tra bằng thực tiễn.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
