'use client';

import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { type ScreenNarration } from '@/data/presentationScripts';

interface ScreenNarrationBlockProps {
  narration: ScreenNarration | undefined;
  onOpenNotes?: () => void;
}

export default function ScreenNarrationBlock({
  narration,
  onOpenNotes,
}: ScreenNarrationBlockProps) {
  const [expanded, setExpanded] = useState(false);

  if (!narration) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mb-3">
      <div className="rounded-xl border border-gray-200/80 bg-white p-3 shadow-sm md:p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-gray-700">
            {narration.title}
          </span>
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

        <p className="mb-1.5 text-sm font-bold leading-snug text-gray-800">
          {narration.headline}
        </p>

        <p
          className="text-xs leading-relaxed text-gray-600"
          style={
            expanded
              ? undefined
              : {
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                  overflow: 'hidden',
                }
          }
        >
          {narration.body}
        </p>

        {expanded ? (
          <>
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-100/60 bg-amber-50/60 px-3 py-2">
              <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                <span className="text-[9px] font-bold text-amber-700">T</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800/80">
                {narration.philosophyLink}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-2">
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
              <p className="text-xs font-medium leading-relaxed text-gray-500">
                {narration.action}
              </p>
            </div>
          </>
        ) : null}

        <button
          type="button"
          onClick={() => setExpanded(value => !value)}
          className="mt-2 text-xs font-semibold text-slate-600 hover:text-slate-950"
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      </div>
    </div>
  );
}
