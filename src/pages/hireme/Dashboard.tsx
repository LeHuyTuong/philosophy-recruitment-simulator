'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList
} from 'recharts';
import PhilosophyBadge from '@/components/hireme/PhilosophyBadge';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Stats fetch error:', error);
      }
    }, 2500);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-6 pb-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Biện chứng nhận thức — diễn ra ngay tại lớp
          </h1>
          <PhilosophyBadge variant="universal" title="📊 Cái chung trong cái riêng · Dashboard lớp" className="mx-auto" />
        </div>

        {/* Hero metric */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white text-center mb-6 shadow-lg"
        >
          <p className="text-sm font-medium opacity-90 mb-1">
            Tổng số người chơi
          </p>
          <p className="text-5xl font-extrabold mb-1">{stats.totalSessions}</p>
          <p className="text-xs opacity-80">
            Đây chính là phép biện chứng đang vận động
          </p>
        </motion.div>

        {!hasData && (
          <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 mb-6">
            <p className="text-lg">Chưa có dữ liệu</p>
            <p className="text-sm mt-1">Hãy hoàn thành một phiên chơi để xem dashboard</p>
          </div>
        )}

        {hasData && (
          <>
            {/* Section 1: Cross-industry stacked bar */}
            <div className="bg-white rounded-xl border p-4 mb-6">
              <h2 className="font-bold text-sm text-gray-700 mb-1">Cùng một nguyên lý — Biểu hiện qua các ngành</h2>
              <p className="text-xs text-gray-400 mb-3">Mỗi ngành có &ldquo;cái riêng&rdquo; nhưng đều phản ánh một &ldquo;cái chung&rdquo;.</p>
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

            {/* Section 2: Success rate by profile */}
            <div className="bg-white rounded-xl border p-4 mb-6">
              <h2 className="font-bold text-sm text-gray-700 mb-1">Tỷ lệ thành công theo tiêu chí</h2>
              <p className="text-xs text-gray-400 mb-3">Tiêu chí kết hợp luôn cho kết quả cao nhất — Lý luận + Thực tiễn.</p>
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

            {/* Section 3: Final poll */}
            {pollData.length > 0 && (
              <div className="bg-white rounded-xl border p-4 mb-6">
                <h2 className="font-bold text-sm text-gray-700 mb-3">Kết quả khảo sát cuối</h2>
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
            )}

            {/* Section 4: Universal in Particular */}
            <div className="bg-gradient-to-r from-purple-50 to-emerald-50 rounded-xl border-2 border-purple-200 p-5 mb-6">
              <h3 className="font-bold text-sm text-purple-700 mb-2">Cái chung trong cái riêng</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ở MỌI ngành đã có người chơi, tiêu chí BALANCED (cân bằng lý luận + thực tiễn) 
                luôn đạt tỷ lệ thành công cao nhất. Đây là biểu hiện của &ldquo;cái chung trong cái riêng&rdquo; 
                — một cặp phạm trù của phép biện chứng duy vật.
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
