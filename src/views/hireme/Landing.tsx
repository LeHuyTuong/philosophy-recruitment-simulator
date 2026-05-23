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
              <PhilosophyBadge variant="practice" title="Thực tiễn giúp kiểm nghiệm" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-transparent leading-tight">
              HireMe Philosophy Lab
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Công cụ lớp học giúp sinh viên trải nghiệm lý luận nhận thức qua mô phỏng tuyển dụng.
            </p>

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

      {/* 3 khâu nhận thức biện chứng */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        data-testid="landing-three-stages"
        className="w-full max-w-5xl mx-auto mt-10"
      >
        <div className="text-center mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Ba khâu nhận thức biện chứng</p>
          <p className="mt-1 text-sm text-slate-600">Trang này không chỉ minh hoạ — bản thân cấu trúc của nó vận hành theo đúng quy luật nhận thức.</p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">①</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Lý luận</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Nhận thức bắt đầu từ tri thức đã được tổng kết</h3>
            <p className="mt-2 text-sm text-slate-600">CV, bằng cấp, GPA — tri thức tĩnh, đã được hệ thống hoá. Sinh viên duyệt hồ sơ ở Vòng 1.</p>
            <p className="mt-3 text-xs italic text-slate-500">&ldquo;Trực quan sinh động → tư duy trừu tượng&rdquo;</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">②</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Thực tiễn</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Thực tiễn là tiêu chuẩn của chân lý</h3>
            <p className="mt-2 text-sm text-slate-600">Phỏng vấn và thử việc kiểm nghiệm tri thức — tri thức động, phải được kiến tạo qua hành động.</p>
            <p className="mt-3 text-xs italic text-slate-500">&ldquo;Tư duy trừu tượng → thực tiễn&rdquo;</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">③</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Phản tư</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Nhận thức hoàn thành ở cấp cao hơn</h3>
            <p className="mt-2 text-sm text-slate-600">Khoảng cách Tri thức – Thực tiễn được đo lường. Vòng xoáy ốc đi lên bắt đầu từ đây.</p>
            <p className="mt-3 text-xs italic text-slate-500">&ldquo;Thực tiễn → nhận thức ở cấp cao hơn&rdquo;</p>
          </div>
        </div>
      </motion.section>

      <footer className="mt-10 w-full max-w-5xl mx-auto px-4 pb-4 text-center">
        <blockquote className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm italic text-slate-700">
          &ldquo;Quan điểm về đời sống, về thực tiễn, phải là quan điểm thứ nhất và cơ bản của lý luận về nhận thức.&rdquo;
          <span className="mt-1 block not-italic text-xs font-semibold tracking-wider text-slate-500">— V.I. Lênin</span>
        </blockquote>
        <p className="mt-3 text-xs text-slate-400">Đề tài: Mối quan hệ giữa nhận thức và thực tiễn · Triết học Mác-Lênin</p>
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
