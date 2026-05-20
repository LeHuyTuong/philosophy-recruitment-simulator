'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, BookOpen, Brain, MessageSquare, Lightbulb, ArrowRight } from 'lucide-react';
import { type ScreenScript } from '@/data/presentationScripts';

interface PresenterScriptPanelProps {
  script: ScreenScript | undefined;
  isOpen: boolean;
  onClose: () => void;
}

interface SectionProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  content: string;
  defaultOpen?: boolean;
  accentColor?: string;
}

function Section({ id, icon, label, content, defaultOpen = false, accentColor = 'text-emerald-600' }: SectionProps) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors cursor-pointer"
      >
        <span className={`${accentColor} flex-shrink-0`}>{icon}</span>
        <span className="flex-1 text-sm font-semibold text-gray-700">{label}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed pl-7">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PresenterScriptPanel({ script, isOpen, onClose }: PresenterScriptPanelProps) {
  if (!script) return null;

  const sections: SectionProps[] = [
    {
      id: 'purpose',
      icon: <BookOpen className="w-4 h-4" />,
      label: 'Mục đích màn hình',
      content: script.purpose,
      defaultOpen: true,
      accentColor: 'text-purple-600',
    },
    {
      id: 'philosophy',
      icon: <Brain className="w-4 h-4" />,
      label: 'Liên hệ triết học',
      content: script.philosophy,
      defaultOpen: true,
      accentColor: 'text-red-600',
    },
    {
      id: 'talkTrack',
      icon: <MessageSquare className="w-4 h-4" />,
      label: 'Script thuyết trình',
      content: script.talkTrack,
      defaultOpen: true,
      accentColor: 'text-blue-600',
    },
    {
      id: 'productValue',
      icon: <Lightbulb className="w-4 h-4" />,
      label: 'Giá trị sản phẩm',
      content: script.productValue,
      accentColor: 'text-amber-600',
    },
    {
      id: 'transition',
      icon: <ArrowRight className="w-4 h-4" />,
      label: 'Câu chuyển tiếp',
      content: script.transition,
      accentColor: 'text-emerald-600',
    },
  ];

  // ─── Mobile: Bottom sheet ───────────────────
  const mobilePanel = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-[70] md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 z-[80] md:hidden bg-white rounded-t-2xl shadow-2xl max-h-[75vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 flex-shrink-0">
              <div>
                <h3 className="text-sm font-bold text-gray-800">{script.title}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Ghi chú thuyết trình</p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              {sections.map(s => (
                <Section key={s.id} {...s} />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // ─── Desktop: Side panel ───────────────────
  const desktopPanel = (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="hidden md:flex fixed top-0 right-0 z-[55] w-[400px] h-screen bg-white border-l border-gray-200 shadow-xl flex-col"
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-gray-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-base">🎤</span>
                  <h2 className="text-sm font-bold text-gray-800">{script.title}</h2>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider ml-7">
                  Ghi chú thuyết trình
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                title="Đóng (N)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {sections.map(s => (
              <Section key={s.id} {...s} />
            ))}
          </div>

          {/* Footer hint */}
          <div className="flex-shrink-0 border-t border-gray-100 px-5 py-2.5">
            <p className="text-[10px] text-gray-400 text-center">
              Nhấn <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono">N</kbd> để đóng · <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono">Esc</kbd> để đóng hoặc tắt
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopPanel}
      {mobilePanel}
    </>
  );
}
