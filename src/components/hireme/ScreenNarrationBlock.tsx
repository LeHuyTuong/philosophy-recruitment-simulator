'use client';

import { BookOpen, ArrowRight } from 'lucide-react';
import { type ScreenNarration } from '@/data/presentationScripts';

interface ScreenNarrationBlockProps {
  narration: ScreenNarration | undefined;
  onOpenNotes?: () => void;
}

export default function ScreenNarrationBlock({
  narration,
  onOpenNotes,
}: ScreenNarrationBlockProps) {
  if (!narration) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-5">
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200/80 rounded-xl p-4 md:p-5">
        {/* Header: badge + title + optional notes button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 rounded-md">
              <BookOpen className="w-3 h-3" />
              Gợi ý thuyết trình
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {narration.title}
            </span>
          </div>
          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              title="Ghi chú chi tiết (N)"
            >
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline">Ghi chú</span>
            </button>
          )}
        </div>

        {/* Headline */}
        <p className="text-sm font-bold text-gray-800 leading-snug mb-2">
          {narration.headline}
        </p>

        {/* Body */}
        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          {narration.body}
        </p>

        {/* Philosophy link */}
        <div className="flex items-start gap-2 mb-3 px-3 py-2 bg-amber-50/60 rounded-lg border border-amber-100/60">
          <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-700">T</span>
          </div>
          <p className="text-[11px] text-amber-800/80 leading-relaxed">
            {narration.philosophyLink}
          </p>
        </div>

        {/* Action */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500 font-medium leading-relaxed">
            {narration.action}
          </p>
        </div>
      </div>
    </div>
  );
}
