'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      data-testid="home-page"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)]"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        data-testid="landing-hero"
        className="w-full max-w-4xl mx-auto"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="text-center lg:text-left">
            <div className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              <PhilosophyBadge variant="universal" title="Chương 2.2.2 · Cặp phạm trù" />
              <PhilosophyBadge variant="rational" title="Chương 2.3 · Lý luận nhận thức" />
              <PhilosophyBadge variant="practice" title="Thực tiễn là tiêu chuẩn chân lý" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent leading-tight">
              HireMe Philosophy Lab
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Công cụ lớp học giúp sinh viên trải nghiệm lý luận nhận thức qua mô phỏng tuyển dụng.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Cách sử dụng trong lớp học</p>
              <ol className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <li className="rounded-xl bg-slate-50 p-3"><span className="font-semibold text-slate-900">1.</span> Người thuyết trình mở slide.</li>
                <li className="rounded-xl bg-slate-50 p-3"><span className="font-semibold text-slate-900">2.</span> Sinh viên quét QR và tham gia.</li>
                <li className="rounded-xl bg-slate-50 p-3"><span className="font-semibold text-slate-900">3.</span> Mỗi người chọn ứng viên qua 3 vòng.</li>
                <li className="rounded-xl bg-slate-50 p-3"><span className="font-semibold text-slate-900">4.</span> Dashboard tổng hợp kết quả.</li>
                <li className="rounded-xl bg-slate-50 p-3 sm:col-span-2"><span className="font-semibold text-slate-900">5.</span> Cả lớp thảo luận vì sao nhận thức ban đầu có thể sai nếu chưa qua thực tiễn.</li>
              </ol>
            </div>

            <div className="mt-6 flex flex-col gap-3 lg:items-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStart}
                data-testid="start-experience"
                className="px-8 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full max-w-sm"
              >
                Bắt đầu trải nghiệm
              </motion.button>

              <div className="grid gap-2 w-full max-w-sm sm:grid-cols-2">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Mở Dashboard lớp
                </button>
                <button
                  onClick={() => onNavigate('presentation-slides')}
                  data-testid="slide-button"
                  className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Mở Slide thuyết trình
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg"
          >
            <div className="rounded-2xl bg-slate-50 p-4">
              <ClientOnlyQR />
            </div>
            <div className="mt-4 space-y-2 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Sinh viên tham gia</p>
              <p className="text-sm text-slate-600">Quét mã để vào flow và đi qua 3 giai đoạn mô phỏng tuyển dụng.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <footer className="mt-auto pt-8 text-center text-xs text-slate-400 pb-4">
        Đề tài: Mối quan hệ giữa nhận thức và thực tiễn · Triết học Mác-Lênin
      </footer>
    </motion.div>
  );
}

function ClientOnlyQR() {
  const [Module, setModule] = useState<{ QRCodeSVG: React.ComponentType<{ value: string; size: number; level: string }> } | null>(null);
  const qrValue = typeof window !== 'undefined' ? `${window.location.origin}/?join=1` : '';

  useEffect(() => {
    let isMounted = true;

    if (!Module) {
      void import('qrcode.react').then(mod => {
        if (!isMounted) return;
        setModule({ QRCodeSVG: mod.QRCodeSVG as React.ComponentType<{ value: string; size: number; level: string }> });
      });
    }

    return () => {
      isMounted = false;
    };
  }, [Module]);

  if (!Module) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#f9fafb" />
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="120" y="20" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="20" y="120" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="120" y="120" width="60" height="60" rx="8" fill="#e5e7eb" />
        </svg>
      </div>
    );
  }

  const { QRCodeSVG } = Module;

  if (!qrValue) {
    return (
      <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-50 rounded-lg">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#f9fafb" />
          <rect x="20" y="20" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="120" y="20" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="20" y="120" width="60" height="60" rx="8" fill="#e5e7eb" />
          <rect x="120" y="120" width="60" height="60" rx="8" fill="#e5e7eb" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg">
      <QRCodeSVG value={qrValue} size={200} level="M" />
    </div>
  );
}
