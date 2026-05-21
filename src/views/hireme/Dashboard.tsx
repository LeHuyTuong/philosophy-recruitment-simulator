"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardStats } from '@/lib/dashboardStats';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#9ca3af'];
const INDUSTRY_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

interface DashboardStats {
  totalSessions: number;
  byIndustry: Record<string, number>;
  criteriaProfileDist: Record<string, number>;
  successRateByProfile: Record<string, number>;
  crossIndustry: { industry: string; gpa_heavy: number; exp_heavy: number; balanced: number; mixed: number }[];
  topPicked: { id: string; name: string; count: number }[];
  topSuccess: { id: string; name: string; count: number }[];
  finalPoll: { A: number; B: number; C: number };
  source?: 'db' | 'memory' | 'demo' | 'empty';
  fallbackReason?: string;
}

const industryLabels: Record<string, string> = {
  it: 'IT',
  marketing: 'Marketing',
  accounting: 'Kế toán',
  business: 'Kinh doanh',
  design: 'Thiết kế',
  education: 'Giáo dục',
};

const profileLabels: Record<string, string> = {
  gpa_heavy: 'Ưu tiên GPA',
  exp_heavy: 'Ưu tiên KN',
  balanced: 'Cân bằng',
  mixed: 'Hỗn hợp',
};

type ApiStatsResponse = {
  ok: boolean;
  source: 'db' | string;
  hasData: boolean;
  totalSessions: number;
  stats: DashboardStats | null;
  error?: string;
};

function SummaryCard({ label, value, caption }: { label: string; value: string | number; caption: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  );
}

function DashboardEmptyState({ onOpenQR, onStartExperience }: { onOpenQR: () => void; onStartExperience: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-base font-semibold text-slate-900">
        Chưa có dữ liệu lớp thật. Hãy cho sinh viên quét QR và hoàn thành trải nghiệm để tạo dữ liệu.
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" onClick={onOpenQR} className="rounded-full border px-4 py-2 text-sm font-semibold bg-slate-900 text-white">Mở QR tham gia</button>
        <button type="button" onClick={onStartExperience} className="rounded-full border px-4 py-2 text-sm font-semibold">Bắt đầu trải nghiệm</button>
      </div>
    </div>
  );
}

function DashboardVisuals({ stats }: { stats: DashboardStats }) {
  const profileDistData = Object.entries(stats.criteriaProfileDist).map(([key, value]) => ({
    name: profileLabels[key] || key,
    value,
  }));

  const successRateData = Object.entries(stats.successRateByProfile).map(([key, value]) => ({
    name: profileLabels[key] || key,
    value,
    fill: key === 'balanced' ? '#10b981' : '#94a3b8',
  }));

  const crossIndustryData = stats.crossIndustry.map(item => ({
    industry: industryLabels[item.industry] || item.industry,
    'Ưu tiên GPA': item.gpa_heavy,
    'Ưu tiên KN': item.exp_heavy,
    'Cân bằng': item.balanced,
    'Hỗn hợp': item.mixed,
  }));

  const pollData = [
    { name: 'A. Học điểm cao hơn', value: stats.finalPoll.A || 0 },
    { name: 'B. Học + thực hành', value: stats.finalPoll.B || 0 },
    { name: 'C. Kinh nghiệm thôi', value: stats.finalPoll.C || 0 },
  ].filter(d => d.value > 0);

  const hasData = stats.totalSessions > 0;

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        <SummaryCard
          label="Tổng số lượt chơi"
          value={stats.totalSessions}
          caption="Dữ liệu lớp thật từ Neon DB"
        />
        <SummaryCard
          label="Ứng viên được chọn nhiều nhất"
          value={stats.topPicked[0] ? stats.topPicked[0].name : 'Chưa có'}
          caption={stats.topPicked[0] ? `${stats.topPicked[0].count} lượt chọn` : 'Chưa có dữ liệu lớp'}
        />
        <SummaryCard
          label="Ứng viên thành công nhiều nhất"
          value={stats.topSuccess[0] ? stats.topSuccess[0].name : 'Chưa có'}
          caption={stats.topSuccess[0] ? `${stats.topSuccess[0].count} lượt pass` : 'Chưa có dữ liệu lớp'}
        />
      </div>

      {stats.fallbackReason ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {stats.fallbackReason}
        </div>
      ) : null}

      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-bold text-sm text-slate-700 mb-1">Cùng một nguyên lý — biểu hiện qua các ngành</h2>
          <p className="text-xs text-slate-400 mb-3">Mỗi ngành có cái riêng nhưng đều phản ánh một cái chung.</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={crossIndustryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="industry" width={80} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="Ưu tiên GPA" stackId="a" fill="#f59e0b" />
              <Bar dataKey="Ưu tiên KN" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Cân bằng" stackId="a" fill="#10b981" />
              <Bar dataKey="Hỗn hợp" stackId="a" fill="#9ca3af" />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-bold text-sm text-slate-700 mb-1">Tỷ lệ thành công theo tiêu chí</h2>
          <p className="text-xs text-slate-400 mb-3">Tiêu chí kết hợp luôn cho kết quả cao nhất — lý luận + thực tiễn.</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={successRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {successRateData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {pollData.length > 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-bold text-sm text-slate-700 mb-3">Kết quả khảo sát cuối</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pollData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}
                  labelLine={false}
                  dataKey="value"
                >
                  {pollData.map((_, index) => (
                    <Cell key={index} fill={['#ef4444', '#3b82f6', '#f59e0b'][index] || '#9ca3af'} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : null}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <h3 className="font-bold text-sm text-emerald-800 mb-2">Cái chung trong cái riêng</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Ở mọi ngành đã có người chơi, tiêu chí balanced (cân bằng lý luận + thực tiễn) luôn đạt tỷ lệ thành công cao nhất.
            Đây là một cách để lớp nhìn thấy biện chứng giữa lý luận và thực tiễn ngay trong dữ liệu của mình.
          </p>
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [apiResp, setApiResp] = useState<ApiStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    const t0 = performance.now();
    try {
      const res = await fetch('/api/stats');
      const data: ApiStatsResponse = await res.json();
      const dur = Math.round(performance.now() - t0);
      if (process.env.NODE_ENV !== 'production') console.debug(`[dashboard] fetch /api/stats ${res.status} ${dur}ms`);
      setApiResp(data);
    } catch (err) {
      console.error('Stats fetch error:', err);
      setApiResp({ ok: false, source: 'db', hasData: false, totalSessions: 0, stats: null, error: 'network' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // avoid calling setState synchronously inside effect body
    const t = setTimeout(() => {
      void fetchStats();
    }, 0);
    return () => clearTimeout(t);
    // intentionally no polling; fetch on mount and via refresh button only
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-6 pb-20 md:pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-32 w-full mb-6 rounded-xl" />
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const resp = apiResp;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="dashboard-page"
      className="min-h-screen px-4 py-4 pb-20 md:pb-8 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Dashboard lớp</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-600">Tổng hợp dữ liệu thật từ các lượt chơi đã hoàn thành.</p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="rounded-full border px-3 py-1 text-sm text-slate-700 bg-white">
              {resp?.ok && resp.source === 'db' && resp.hasData ? 'Dữ liệu Neon DB' : resp?.ok && !resp.hasData ? 'Chưa có dữ liệu thật' : 'DB unavailable'}
            </div>
            <button onClick={() => void fetchStats()} className="rounded-full border px-3 py-1 text-sm">Làm mới</button>
          </div>
        </div>

        {resp && resp.ok && resp.hasData && resp.stats ? (
          <DashboardVisuals stats={resp.stats} />
        ) : resp && resp.ok && !resp.hasData ? (
          <DashboardEmptyState onOpenQR={() => window.open('/', '_blank')} onStartExperience={() => (window.location.href = '/')} />
        ) : (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">Có lỗi khi đọc DB. Vui lòng kiểm tra kết nối DB.</div>
        )}
      </div>
    </motion.div>
  );
}
