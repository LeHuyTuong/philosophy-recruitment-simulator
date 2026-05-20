'use client';

import { motion } from 'framer-motion';

interface PresenterModeToggleProps {
  isPresenterMode: boolean;
  onToggle: () => void;
  onTogglePanel: () => void;
  isPanelOpen: boolean;
}

export default function PresenterModeToggle({
  isPresenterMode,
  onToggle,
  onTogglePanel,
  isPanelOpen,
}: PresenterModeToggleProps) {
  if (!isPresenterMode) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={onToggle}
        className="fixed top-3 right-3 z-[60] flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all cursor-pointer"
        title="Bật Presenter Mode (P)"
      >
        <span className="text-base">🎤</span>
        <span className="hidden sm:inline">Presenter Mode</span>
        <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 text-[10px] font-mono bg-gray-100 border border-gray-200 rounded text-gray-400">
          P
        </kbd>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-3 right-3 z-[60] flex items-center gap-1.5"
    >
      <motion.button
        onClick={onTogglePanel}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border-2 border-emerald-300 rounded-full text-sm font-medium text-emerald-700 shadow-sm cursor-pointer"
        title={isPanelOpen ? 'Thu gọn script' : 'Mở script'}
      >
        <span className="text-base">🎤</span>
        <span className="hidden sm:inline">{isPanelOpen ? 'Script đang bật' : 'Script đang tắt'}</span>
        {isPanelOpen && (
          <span className="hidden sm:flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-emerald-200 rounded-full">
            ✓
          </span>
        )}
      </motion.button>

      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-8 h-8 bg-gray-100 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors cursor-pointer"
        title="Tắt Presenter Mode (P)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
