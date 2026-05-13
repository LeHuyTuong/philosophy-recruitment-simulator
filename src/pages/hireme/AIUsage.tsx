'use client';

import { motion } from 'framer-motion';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

export default function AIUsage() {
  const tools = [
    { tool: 'ChatGPT', purpose: 'Gợi ý cấu trúc nội dung', percent: '15%' },
    { tool: 'Claude', purpose: 'Hỗ trợ viết code, debug', percent: '30%' },
    { tool: 'Gemini', purpose: 'Sinh boilerplate code', percent: '25%' },
    { tool: 'Canva AI', purpose: 'Thiết kế slide', percent: '10%' },
  ];

  const aiTasks = [
    'Boilerplate code, gợi ý câu phỏng vấn mẫu, fix syntax',
    'Tạo cấu trúc dự án ban đầu, tối ưu UI/UX',
  ];

  const humanTasks = [
    'TOÀN BỘ phân tích triết học',
    'Chọn trích dẫn giáo trình LLCT',
    'Thiết kế kịch bản game và logic biện chứng',
    'Viết script thuyết trình',
    'Kiểm chứng nguồn tài liệu',
    'Phân tích và thiết kế UX',
  ];

  const sources = [
    'Giáo trình Triết học Mác-Lênin, NXB Chính trị Quốc gia Sự thật, 2021',
    'Văn kiện Đại hội Đảng XIII',
    'V.I. Lênin, Bút ký Triết học',
    'K. Marx, Luận cương về Feuerbach (1845)',
    'Hồ Chí Minh toàn tập',
    'Khảo sát TopCV 2024 về tiêu chí tuyển dụng',
    'Tổng cục Thống kê — việc làm cử nhân',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            AI Usage — Minh bạch sử dụng công cụ
          </h1>
          <PhilosophyBadge variant="rational" title="📚 Liêm chính học thuật" className="mx-auto" />
        </div>

        {/* Section 1: Tools table */}
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3">
            <h2 className="font-bold text-sm text-gray-700">Công cụ AI đã sử dụng</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t">
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Công cụ</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-600">Mục đích</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-600">% đóng góp</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 font-medium">{t.tool}</td>
                  <td className="px-4 py-2 text-gray-600">{t.purpose}</td>
                  <td className="px-4 py-2 text-center font-semibold text-purple-600">{t.percent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: AI vs Human */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
            <h3 className="font-bold text-sm text-blue-700 mb-2">AI (hỗ trợ)</h3>
            <ul className="space-y-1">
              {aiTasks.map((t, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                  <span className="text-blue-400 mt-0.5">•</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 rounded-xl border-2 border-emerald-200 p-4">
            <h3 className="font-bold text-sm text-emerald-700 mb-2">Người (chủ động)</h3>
            <ul className="space-y-1">
              {humanTasks.map((t, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                  <span className="text-emerald-500 mt-0.5">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Sources */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <h2 className="font-bold text-sm text-gray-700 mb-3">Kiểm chứng nguồn chính thống:</h2>
          <ol className="space-y-1.5">
            {sources.map((s, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-purple-500 font-bold text-xs mt-0.5">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        {/* Section 4: Academic integrity pledge */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-300 p-6 mb-6">
          <h2 className="font-bold text-lg text-purple-800 mb-3 text-center">CAM KẾT LIÊM CHÍNH HỌC THUẬT</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Nhóm chúng tôi cam kết: AI chỉ đóng vai trò <strong>HỖ TRỢ</strong>, không thay thế 
            tư duy phản biện. Toàn bộ phân tích triết học, lập luận, kết luận 
            trong bài thuyết trình là sản phẩm tư duy của các thành viên nhóm. 
            Chúng tôi chịu trách nhiệm hoàn toàn về nội dung trình bày và sẵn 
            sàng giải trình mọi câu hỏi mà không sử dụng AI.
          </p>
          <div className="border-t border-purple-200 pt-3 space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Nhóm:</span> ___________________
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Ngày:</span> ___________________
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Chữ ký:</span> ___________________
            </p>
          </div>
        </div>

        {/* Section 5: Links */}
        <div className="bg-gray-50 rounded-xl border p-4">
          <h2 className="font-bold text-sm text-gray-700 mb-2">Link đoạn chat AI đã sử dụng:</h2>
          <div className="space-y-1.5">
            <p className="text-sm text-gray-400 italic">(Điền link vào đây trước khi nộp)</p>
            <p className="text-sm text-blue-600 underline cursor-pointer">Link ChatGPT session: ___________</p>
            <p className="text-sm text-blue-600 underline cursor-pointer">Link Claude session: ___________</p>
            <p className="text-sm text-blue-600 underline cursor-pointer">Link Gemini session: ___________</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
