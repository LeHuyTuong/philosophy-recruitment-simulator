'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { type AudienceNarration } from '@/data/presentationScripts';

interface AudienceNarrationOverlayProps {
  narration: AudienceNarration | undefined;
  isPresentationMode: boolean;
  isVisible: boolean;
  onToggleOverlay: () => void;
  onOpenNotes: () => void;
}

export default function AudienceNarrationOverlay({
  narration,
  isPresentationMode,
  isVisible,
  onToggleOverlay,
  onOpenNotes,
}: AudienceNarrationOverlayProps) {
  if (!isPresentationMode || !narration) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Desktop: floating card at bottom center */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="hidden md:block fixed bottom-20 left-1/2 -translate-x-1/2 z-[55] w-full max-w-xl"
            >
              <div className="mx-4 bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-2xl shadow-xl shadow-black/8 overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/60">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Presentation
                    </span>
                    <span className="text-xs font-semibold text-gray-500">
                      — {narration.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={onOpenNotes}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                      title="Ghi chú thuyết trình (N)"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Ghi chú</span>
                    </button>
                    <button
                      onClick={onToggleOverlay}
                      className="flex items-center justify-center w-6 h-6 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      title="Ẩn (Esc)"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 py-4 space-y-3">
                  {/* Headline */}
                  <p className="text-sm font-bold text-gray-800 leading-snug">
                    {narration.headline}
                  </p>

                  {/* Philosophy link */}
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-amber-700">T</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {narration.philosophyLink}
                    </p>
                  </div>

                  {/* Transition */}
                  <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <p className="text-xs text-emerald-600 font-medium leading-relaxed">
                      {narration.transition}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile: bottom card (above BottomNav) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden fixed bottom-16 left-0 right-0 z-[55] px-3"
            >
              <div className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-xl shadow-lg shadow-black/8 overflow-hidden">
                {/* Compact header */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100/60">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {narration.title}
                    </span>
                  </div>
                  <button
                    onClick={onToggleOverlay}
                    className="flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <EyeOff className="w-3 h-3" />
                  </button>
                </div>

                {/* Content - compact */}
                <div className="px-3 py-2.5 space-y-2">
                  <p className="text-xs font-bold text-gray-800 leading-snug">
                    {narration.headline}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {narration.philosophyLink}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <ArrowRight className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <p className="text-[10px] text-emerald-600 font-medium leading-relaxed truncate">
                        {narration.transition}
                      </p>
                    </div>
                    <button
                      onClick={onOpenNotes}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-medium text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer flex-shrink-0 ml-2"
                      title="Ghi chú (N)"
                    >
                      <BookOpen className="w-2.5 h-2.5" />
                      <span>Ghi chú</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hidden state: small floating button to re-show overlay */}
      {isPresentationMode && !isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onToggleOverlay}
          className="fixed bottom-20 right-4 z-[55] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:text-emerald-700 hover:border-emerald-300 shadow-md cursor-pointer transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Hiện nội dung</span>
        </motion.button>
      )}
    </>
  );
}
