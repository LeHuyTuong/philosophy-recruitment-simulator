'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

interface IndustrySelectorProps {
  onSelectIndustry: (industry: string) => void;
  onNavigate: (page: string) => void;
}

const industries = [
  {
    id: 'it',
    name: 'Công nghệ thông tin',
    icon: '💻',
    practice: 'Code chạy được, dự án deploy thật',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: '📱',
    practice: 'Campaign có conversion thật, content viral thật',
  },
  {
    id: 'accounting',
    name: 'Kế toán – Kiểm toán',
    icon: '📊',
    practice: 'Sổ sách lên đúng, audit pass, báo cáo chuẩn',
  },
  {
    id: 'business',
    name: 'Kinh doanh – Bán hàng',
    icon: '💼',
    practice: 'Đóng deal thật, đạt KPI doanh số',
  },
  {
    id: 'design',
    name: 'Thiết kế',
    icon: '🎨',
    practice: 'Sản phẩm dùng được, client duyệt',
  },
  {
    id: 'education',
    name: 'Giáo dục',
    icon: '📚',
    practice: 'Học sinh tiến bộ thật, lớp quản được',
  },
];

export default function IndustrySelector({ onSelectIndustry, onNavigate }: IndustrySelectorProps) {
  const [loading, setLoading] = useState(false);

  const handleSelect = async (industryId: string) => {
    setLoading(true);
    try {
      await onSelectIndustry(industryId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 py-8 pb-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Bạn là HR cho công ty thuộc ngành nào?
          </h1>
          <PhilosophyBadge
            variant="universal"
            title="📚 Cặp phạm trù: CÁI CHUNG – CÁI RIÊNG"
            subtitle="Cái chung = thực tiễn là tiêu chuẩn chân lý · Cái riêng = biểu hiện qua từng ngành"
            className="mx-auto"
          />
          <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto">
            Nguyên lý &ldquo;thực tiễn là tiêu chuẩn chân lý&rdquo; biểu hiện qua từng ngành (cái riêng), nhưng bản chất là chung.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => handleSelect(ind.id)}
                disabled={loading}
                className="w-full bg-white rounded-xl border-2 border-gray-100 p-5 text-left hover:border-purple-300 hover:shadow-lg transition-all group disabled:opacity-50"
              >
                <span className="text-4xl block mb-2">{ind.icon}</span>
                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">{ind.name}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Thực tiễn: {ind.practice}
                </p>
                <span className="inline-block text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
                  Chọn ngành này →
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
