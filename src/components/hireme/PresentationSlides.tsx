'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { presentationSlides, type PresentationSlide } from '@/data/presentationSlides';

interface PresentationSlidesProps {
  isOpen: boolean;
  onClose: () => void;
}

function SlideBody({ slide }: { slide: PresentationSlide }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start">
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Slide thuyết trình
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
            {slide.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {slide.subtitle}
          </p>
        </div>

        <ul className="space-y-3">
          {slide.bullets.map(bullet => (
            <li key={bullet} className="flex gap-3 text-slate-700 leading-relaxed text-sm sm:text-base">
              <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm backdrop-blur-sm space-y-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Liên hệ triết học</p>
          <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
            {slide.philosophyLink}
          </p>
        </div>

        {slide.speakerNote ? (
          <div className="rounded-2xl bg-white border border-slate-200 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Speaker note</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{slide.speakerNote}</p>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

export default function PresentationSlides({ isOpen, onClose }: PresentationSlidesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setDirection(-1);
        setCurrentIndex(index => Math.max(0, index - 1));
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setDirection(1);
        setCurrentIndex(index => Math.min(presentationSlides.length - 1, index + 1));
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSlide = presentationSlides[currentIndex];
  const progress = ((currentIndex + 1) / presentationSlides.length) * 100;

  const moveSlide = (delta: number) => {
    setDirection(delta);
    setCurrentIndex(index => Math.min(presentationSlides.length - 1, Math.max(0, index + delta)));
  };

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 28 : -28,
      scale: 0.985,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -28 : 28,
      scale: 0.985,
    }),
  };

  return (
    <div className="fixed inset-0 z-[90]" data-testid="presentation-slides">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-[91] flex min-h-full items-center justify-center p-3 sm:p-4 lg:p-6">
        <motion.section
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.985 }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_24px_120px_rgba(15,23,42,0.35)] sm:h-[calc(100vh-2rem)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Presentation mode</p>
              <p className="mt-1 text-sm sm:text-base font-semibold text-slate-900 truncate">
                {currentSlide.title}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                <span>Slide {currentIndex + 1}/{presentationSlides.length}</span>
              </div>
              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                data-testid="presentation-close"
                aria-label="Thoát slide"
                title="Thoát slide"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700 sm:hidden">
                Slide {currentIndex + 1}/{presentationSlides.length}
              </p>
              <div className="hidden sm:block" />
              <div className="flex-1 max-w-md sm:max-w-xl lg:max-w-2xl ml-auto">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-slate-900 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="h-full overflow-y-auto pr-1"
                >
                  <SlideBody slide={currentSlide} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-col-reverse gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => moveSlide(-1)}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Trước
                </button>
                <button
                  onClick={() => moveSlide(1)}
                  disabled={currentIndex === presentationSlides.length - 1}
                  data-testid="presentation-next"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Tiếp
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Thoát slide
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
