'use client';

import { BookOpen } from 'lucide-react';

interface PresenterModeToggleProps {
  isNotesPanelOpen: boolean;
  onToggleNotes: () => void;
}

export default function PresenterModeToggle({
  isNotesPanelOpen,
  onToggleNotes,
}: PresenterModeToggleProps) {
  return (
    <button
      onClick={onToggleNotes}
      className={`fixed top-16 right-3 z-[60] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all cursor-pointer border ${
        isNotesPanelOpen
          ? 'bg-gray-800 text-white border-gray-700'
          : 'bg-white/90 backdrop-blur-sm text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-50'
      }`}
      title={isNotesPanelOpen ? 'Đóng ghi chú (N)' : 'Ghi chú thuyết trình (N)'}
    >
      <BookOpen className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Ghi chú</span>
      <kbd className="hidden md:inline-flex items-center justify-center h-4 px-1 text-[9px] font-mono bg-gray-100 border border-gray-200 rounded text-gray-400">
        N
      </kbd>
    </button>
  );
}
