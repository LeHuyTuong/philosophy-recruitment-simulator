'use client';

import { useEffect, useState } from 'react';
import { History, RefreshCw } from 'lucide-react';
import FeaturePreviewModal from '@/components/hireme/FeaturePreviewModal';

interface RecentSession {
  id: string;
  clientSessionId: string;
  industry: string | null;
  currentStage: string;
  createdAt: string;
  updatedAt: string;
}

interface RecentSessionsResponse {
  ok: boolean;
  source: 'db' | 'memory' | 'empty';
  sessions: RecentSession[];
  error?: string;
}

interface SessionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sourceLabels: Record<string, string> = {
  db: 'DB thật',
  memory: 'Bộ nhớ tạm',
  empty: 'Chưa có phiên',
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

export default function SessionHistoryPanel({ isOpen, onClose }: SessionHistoryPanelProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecentSessionsResponse | null>(null);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sessions/recent?limit=10', { cache: 'no-store' });
      const payload = await res.json().catch(() => ({ ok: true, source: 'empty', sessions: [] }));
      setData(payload);
    } catch {
      setData({ ok: true, source: 'empty', sessions: [], error: 'recent sessions unavailable' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const timerId = window.setTimeout(() => {
      void loadSessions();
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [isOpen]);

  return (
    <FeaturePreviewModal
      isOpen={isOpen}
      onClose={onClose}
      title="Lịch sử phiên chơi"
      status="db"
      description="Danh sách phiên gần đây được ẩn danh, không cần login và không chứa dữ liệu cá nhân nhạy cảm."
    >
      <div data-testid="session-history-panel" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
            <History className="h-4 w-4" />
            {sourceLabels[data?.source || 'empty']}
          </div>
          <button
            type="button"
            onClick={loadSessions}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Tải lại
          </button>
        </div>

        {data?.error ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{data.error}</p>
        ) : null}

        {loading && !data ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Đang tải phiên gần đây...</div>
        ) : null}

        {!loading && data?.sessions.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Chưa có phiên chơi nào trong DB. App vẫn hoạt động bằng state hiện tại và dashboard mô phỏng.
          </div>
        ) : null}

        {data?.sessions.length ? (
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-[1.1fr_0.8fr_0.8fr] gap-2 bg-slate-50 px-3 py-2 text-xs font-black uppercase text-slate-500 sm:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
              <span>Session</span>
              <span>Ngành</span>
              <span>Stage</span>
              <span className="hidden sm:block">Cập nhật</span>
            </div>
            {data.sessions.map(session => (
              <div key={`${session.clientSessionId}-${session.updatedAt}`} className="grid grid-cols-[1.1fr_0.8fr_0.8fr] gap-2 border-t border-slate-100 px-3 py-3 text-sm sm:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
                <span className="font-mono text-xs text-slate-700">{session.clientSessionId}</span>
                <span className="text-slate-700">{session.industry || 'none'}</span>
                <span className="text-slate-700">{session.currentStage}</span>
                <span className="hidden text-xs text-slate-500 sm:block">{formatDate(session.updatedAt)}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </FeaturePreviewModal>
  );
}
