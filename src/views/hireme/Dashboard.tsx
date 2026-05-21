'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { createDemoDashboardStats, formatDashboardSourceLabel } from '@/lib/dashboardStats';

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

type DashboardViewMode = 'real' | 'simulated';

function SummaryCard({ label, value, caption }: { label: string; value: string | number; caption: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{caption}</p>
    </div>
  );
}

function DashboardEmptyState() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-lg font-semibold text-slate-900">
        Chưa có lượt chơi thật từ lớp này. Hãy cho sinh viên quét QR và hoàn thành trải nghiệm để tạo dữ liệu.
      </p>
    </div>
  );
}

function DashboardVisuals({ stats, mode, hasRealData }: { stats: DashboardStats; mode: DashboardViewMode; hasRealData: boolean }) {
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

  if (mode === 'real' && !hasRealData) {
    return <DashboardEmptyState />;
  }

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3 mb-6">
        <SummaryCard
          label={mode === 'simulated' ? 'Dữ liệu mô phỏng' : 'Tổng số lượt chơi'}
          value={stats.totalSessions}
          caption={mode === 'simulated'
            ? 'Dữ liệu giả lập phục vụ thuyết trình'
            : formatDashboardSourceLabel({ source: stats.source })}
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

      {mode === 'simulated' ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Dữ liệu giả lập phục vụ thuyết trình — không phải thống kê lớp thật.
        </div>
      ) : null}

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
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [viewMode, setViewMode] = useState<DashboardViewMode>('real');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Stats fetch error:', error);
        setLoading(false);
      }
    };

    void fetchStats();
    const interval = setInterval(fetchStats, 2500);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="min-h-screen px-4 py-8 pb-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-32 w-full mb-6 rounded-xl" />
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }
  const hasRealData = stats.source === 'db' || stats.source === 'memory';
  const simulatedStats = stats.source === 'demo'
    ? stats
    : createDemoDashboardStats('Dữ liệu giả lập phục vụ thuyết trình — không phải thống kê lớp thật.');
  const activeStats = viewMode === 'simulated' ? simulatedStats : stats;
  const sourceLabel = viewMode === 'simulated'
    ? 'Dữ liệu giả lập'
    : hasRealData
      ? formatDashboardSourceLabel({ source: stats.source })
      : 'Chưa có dữ liệu thật';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="dashboard-page"
      className="min-h-screen px-4 py-6 pb-24 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.05),_transparent_38%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_100%)]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Dashboard lớp</h1>
          <p className="text-sm text-slate-600">
            Tách rõ dữ liệu lớp thật và dữ liệu mô phỏng để giảng viên biết chính xác đang xem ngữ cảnh nào.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
            <span>Nguồn đang xem:</span>
            <span className="text-slate-900">{sourceLabel}</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('real')}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'real'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Dữ liệu lớp thật
            </button>
            <button
              type="button"
              onClick={() => setViewMode('simulated')}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                viewMode === 'simulated'
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Dữ liệu mô phỏng
            </button>
          </div>
          <div className="mt-4">
            <PhilosophyBadge variant="universal" title="📊 Cái chung trong cái riêng · Dashboard lớp" className="mx-auto" />
          </div>
        </div>

        <DashboardVisuals stats={activeStats} mode={viewMode} hasRealData={hasRealData} />
      </div>
    </motion.div>
  );
}
