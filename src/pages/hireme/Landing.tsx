'use client';

import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';

interface LandingProps {
  onStart: () => void;
  onNavigate: (page: string) => void;
}

export default function Landing({ onStart, onNavigate }: LandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-slate-50 to-white"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          Học giỏi có chắc thành công?
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          Một thí nghiệm tuyển dụng dưới góc nhìn Triết học Mác-Lênin
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <PhilosophyBadge variant="universal" title="Chương 2.2.2 · Cặp phạm trù" />
          <PhilosophyBadge variant="rational" title="Chương 2.3 · Lý luận nhận thức" />
          <PhilosophyBadge variant="practice" title="Thực tiễn là tiêu chuẩn chân lý" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-block p-4 bg-white rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <div suppressHydrationWarning>
            <QRCodeSVG
              value="https://hireme-simulator.vercel.app"
              size={200}
              level="M"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Quét mã để tham gia</p>
        </motion.div>

        <div className="flex flex-col gap-3 items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs"
          >
            Bắt đầu trải nghiệm →
          </motion.button>

          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
            <button
              onClick={() => onNavigate('schools')}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Xem lịch sử nhận thức luận
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Bảng xếp hạng lớp
            </button>
          </div>
        </div>
      </motion.div>

      <footer className="mt-auto pt-8 text-center text-xs text-gray-400 pb-4">
        Đề tài: Mối quan hệ giữa nhận thức và thực tiễn · Triết học Mác-Lênin
      </footer>
    </motion.div>
  );
}
