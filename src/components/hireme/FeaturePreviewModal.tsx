'use client';

import { X } from 'lucide-react';
import { getStatusBadgeClass, getStatusBadgeLabel, type ProductNavStatus } from '@/data/productNavItems';

interface FeaturePreviewModalProps {
  isOpen: boolean;
  title: string;
  status: ProductNavStatus;
  description: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function FeaturePreviewModal({
  isOpen,
  title,
  status,
  description,
  onClose,
  children,
}: FeaturePreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-0 bottom-16 z-[80] flex items-center justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:inset-0">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-preview-title"
        data-testid="feature-preview-modal"
        className="max-h-[calc(100vh-6rem)] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100vh-2rem)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={`rounded-md border px-2 py-1 text-[11px] font-black uppercase ${getStatusBadgeClass(status)}`}>
                {getStatusBadgeLabel(status)}
              </span>
            </div>
            <h2 id="feature-preview-title" className="text-lg font-black text-slate-950">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
            aria-label="Đóng modal"
            data-testid="feature-preview-close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">{children}</div>
      </section>
    </div>
  );
}
