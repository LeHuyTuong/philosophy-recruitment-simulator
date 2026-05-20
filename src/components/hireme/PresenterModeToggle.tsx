'use client';

import { motion } from 'framer-motion';
import { BookOpen, Mic, MicOff } from 'lucide-react';

interface PresenterModeToggleProps {
  isPresentationMode: boolean;
  isNotesPanelOpen: boolean;
  onTogglePresentation: () => void;
  onOpenNotes: () => void;
  onCloseNotes: () => void;
}

export default function PresenterModeToggle({
  isPresentationMode,
  isNotesPanelOpen,
  onTogglePresentation,
  onOpenNotes,
  onCloseNotes,
}: PresenterModeToggleProps) {
  // Off state: single button to turn on
  if (!isPresentationMode) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={onTogglePresentation}
        className="fixed top-3 right-3 z-[60] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all cursor-pointer"
        title="Bật thuyết trình (P)"
      >
        <Mic className="w-4 h-4" />
        <span className="hidden sm:inline">Bật thuyết trình</span>
        <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-gray-100 border border-gray-200 rounded text-gray-400">
          P
        </kbd>
      </motion.button>
    );
  }

  // On state: two buttons — notes + turn off
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-3 right-3 z-[60] flex items-center gap-1.5"
    >
      {/* Notes toggle button */}
      <motion.button
        onClick={isNotesPanelOpen ? onCloseNotes : onOpenNotes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1.5 px-3 py-1.5 border-2 rounded-full text-sm font-medium shadow-sm cursor-pointer transition-colors ${
          isNotesPanelOpen
            ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
            : 'bg-white/90 backdrop-blur-sm border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-200'
        }`}
        title={isNotesPanelOpen ? 'Đóng ghi chú (N)' : 'Ghi chú thuyết trình (N)'}
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">
          {isNotesPanelOpen ? 'Đang mở ghi chú' : 'Ghi chú'}
        </span>
        {isNotesPanelOpen && (
          <span className="hidden sm:flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-emerald-200 rounded-full">
            ✓
          </span>
        )}
        <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-gray-100/80 border border-gray-200/60 rounded text-gray-400">
          N
        </kbd>
      </motion.button>

      {/* Status badge + turn off button */}
      <motion.button
        onClick={onTogglePresentation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border-2 border-emerald-300 rounded-full text-sm font-medium text-emerald-700 shadow-sm cursor-pointer"
        title="Tắt thuyết trình (P)"
      >
        <Mic className="w-4 h-4" />
        <span className="hidden sm:inline">Đang thuyết trình</span>
        <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-emerald-200/60 border border-emerald-200 rounded text-emerald-500">
          P
        </kbd>
      </motion.button>
    </motion.div>
  );
}
