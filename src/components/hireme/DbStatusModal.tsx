'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Database, RefreshCw, XCircle } from 'lucide-react';
import FeaturePreviewModal from '@/components/hireme/FeaturePreviewModal';

interface DbHealthResponse {
  ok: boolean;
  env?: {
    DATABASE_URL?: boolean;
    DATABASE_URL_UNPOOLED?: boolean;
  };
  db?: 'connected' | 'failed' | string;
  error?: string;
}

interface DbStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DbStatusModal({ isOpen, onClose }: DbStatusModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<DbHealthResponse | null>(null);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/db-health', { cache: 'no-store' });
      const data = await res.json().catch(() => ({ ok: false, db: 'failed' }));
      setStatus(data);
    } catch {
      setStatus({ ok: false, db: 'failed', error: 'health check unavailable' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const timerId = window.setTimeout(() => {
      void loadStatus();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [isOpen]);

  const connected = status?.ok && status.db === 'connected';

  return (
    <FeaturePreviewModal
      isOpen={isOpen}
      onClose={onClose}
      title="Kết quả DB"
      status="db"
      description="Health check chỉ hiển thị trạng thái kết nối và env flag dạng boolean, không hiển thị secret."
    >
      <div data-testid="db-status-modal" className="space-y-4">
        <div className={`flex items-center gap-3 rounded-lg border p-4 ${connected ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${connected ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {connected ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          </div>
          <div>
            <p className="font-bold text-slate-900">
              {loading ? 'Đang kiểm tra DB...' : connected ? 'DB connected' : 'DB failed hoặc chưa sẵn sàng'}
            </p>
            <p className="text-sm text-slate-600">
              Trạng thái hiện tại: {status?.db || 'unknown'}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {(['DATABASE_URL', 'DATABASE_URL_UNPOOLED'] as const).map(key => (
            <div key={key} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase text-slate-500">{key}</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {status?.env?.[key] ? 'Configured' : 'Missing or hidden'}
              </p>
            </div>
          ))}
        </div>

        {status?.error ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {status.error}
          </p>
        ) : null}

        <button
          type="button"
          onClick={loadStatus}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
          Kiểm tra lại
        </button>
      </div>
    </FeaturePreviewModal>
  );
}
