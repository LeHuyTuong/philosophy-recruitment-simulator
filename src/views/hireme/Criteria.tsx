'use client';

import { motion } from 'framer-motion';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import QuoteBlock from '@/components/hireme/QuoteBlock';

interface CriteriaProps {
  criteriaProfile: string;
  onNavigate: (page: string) => void;
}

const profileLabels: Record<string, string> = {
  gpa_heavy: 'HỌC ĐƯỜNG — ưu tiên điểm số',
  exp_heavy: 'THỰC TẾ — ưu tiên kinh nghiệm',
  balanced: 'BIỆN CHỨNG — kết hợp lý luận + thực tiễn',
  mixed: 'KHÔNG RÕ RÀNG — chọn ngẫu nhiên',
};

export default function Criteria({ criteriaProfile, onNavigate }: CriteriaProps) {
  const profile = criteriaProfile || 'mixed';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <PhilosophyBadge
            variant="essence"
            title="📚 Cặp phạm trù: BẢN CHẤT – HIỆN TƯỢNG"
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Đúng – Đủ – Hiệu quả: Nhận thức trong học đường vs nghề nghiệp
        </h1>

        {/* Comparison table */}
        <div className="bg-white rounded-xl border overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Tiêu chí</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">HỌC ĐƯỜNG</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">NGHỀ NGHIỆP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">ĐÚNG (correct)</td>
                <td className="text-center px-4 py-3"><span className="text-emerald-600 font-bold">✅✅✅ Tối đa</span></td>
                <td className="text-center px-4 py-3"><span className="text-yellow-600 font-medium">⚠️ Cần, chưa đủ</span></td>
              </tr>
              <tr className="border-t bg-gray-50/50">
                <td className="px-4 py-3 font-medium">ĐỦ (sufficient)</td>
                <td className="text-center px-4 py-3"><span className="text-emerald-500 font-bold">✅✅ Quan trọng</span></td>
                <td className="text-center px-4 py-3"><span className="text-yellow-500 font-medium">⚠️ Quá thì thừa</span></td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">HIỆU QUẢ</td>
                <td className="text-center px-4 py-3"><span className="text-yellow-500 font-medium">⚠️ Ít đo lường</span></td>
                <td className="text-center px-4 py-3"><span className="text-emerald-600 font-bold">✅✅✅ Số 1</span></td>
              </tr>
              <tr className="border-t bg-gray-50/50">
                <td className="px-4 py-3 font-medium">Đo bằng</td>
                <td className="text-center px-4 py-3 text-gray-600">GPA, điểm thi</td>
                <td className="text-center px-4 py-3 text-gray-600">KPI, kết quả</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium">Đo cái gì</td>
                <td className="text-center px-4 py-3"><span className="text-purple-600 font-semibold">HIỆN TƯỢNG</span></td>
                <td className="text-center px-4 py-3"><span className="text-emerald-600 font-semibold">BẢN CHẤT</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Personal diagnosis */}
        <div className="bg-white rounded-xl border-2 border-purple-200 p-5 mb-6">
          <h3 className="font-bold text-sm text-purple-700 mb-2">Chẩn đoán tiêu chí của bạn:</h3>
          <p className="text-base font-semibold text-gray-800">
            Tiêu chí bạn áp dụng phản ánh tư duy: <span className="text-purple-600">{profileLabels[profile]}</span>
          </p>
        </div>

        {/* Signature quote */}
        <QuoteBlock
          text="Học đường đo nhận thức bằng đúng + đủ — đó là đo HIỆN TƯỢNG. Nghề nghiệp đo nhận thức bằng hiệu quả — đó là đo BẢN CHẤT. Bản chất chỉ lộ ra qua thực tiễn. Đây là lý do GPA cao ≠ thành công."
          author="Vận dụng cặp phạm trù Bản chất–Hiện tượng"
          source="Giáo trình Triết học Mác-Lênin, 2.2.2"
          variant="marx"
        />

        <QuoteBlock
          text="Lý luận mà không liên hệ với thực tiễn là lý luận suông. Thực tiễn mà không có lý luận hướng dẫn thì là thực tiễn mù quáng."
          author="Hồ Chí Minh"
          variant="hcm"
        />

        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('final-poll')}
            className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg"
          >
            Đi đến khảo sát cuối →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
