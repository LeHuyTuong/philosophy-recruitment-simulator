export type ProductNavStatus = 'live' | 'db' | 'demo' | 'soon';

export type ProductNavItemId =
  | 'main-experience'
  | 'presentation-slides'
  | 'class-dashboard'
  | 'personal-report'
  | 'db-results'
  | 'candidate-comparison'
  | 'session-history'
  | 'schools'
  | 'criteria'
  | 'ai-usage'
  | 'teacher-mode'
  | 'export-report';

export interface ProductNavItem {
  id: ProductNavItemId;
  label: string;
  status: ProductNavStatus;
  icon: string;
  targetPage?: string;
  description: string;
}

export const productNavItems: ProductNavItem[] = [
  {
    id: 'main-experience',
    label: 'Trải nghiệm chính',
    status: 'live',
    icon: 'play',
    description: 'Mở lại flow tuyển dụng hiện tại mà không reset state.',
  },
  {
    id: 'presentation-slides',
    label: 'Slide thuyết trình',
    status: 'live',
    icon: 'presentation',
    description: 'Mở bộ slide trình bày trong modal.',
  },
  {
    id: 'class-dashboard',
    label: 'Dashboard lớp',
    status: 'db',
    icon: 'dashboard',
    targetPage: 'dashboard',
    description: 'Đọc thống kê thật từ DB, có fallback demo khi chưa có dữ liệu.',
  },
  {
    id: 'personal-report',
    label: 'Báo cáo cá nhân',
    status: 'demo',
    icon: 'report',
    description: 'Tóm tắt phiên chơi hiện tại nếu đã có dữ liệu.',
  },
  {
    id: 'db-results',
    label: 'Kết quả DB',
    status: 'db',
    icon: 'database',
    description: 'Kiểm tra kết nối DB qua health check an toàn.',
  },
  {
    id: 'candidate-comparison',
    label: 'So sánh ứng viên',
    status: 'demo',
    icon: 'compare',
    description: 'Preview so sánh shortlist Round 1 với kết quả Round 3.',
  },
  {
    id: 'session-history',
    label: 'Lịch sử phiên chơi',
    status: 'db',
    icon: 'history',
    description: 'Đọc các phiên chơi ẩn danh gần đây từ DB hoặc fallback.',
  },
  {
    id: 'schools',
    label: 'Trường phái',
    status: 'live',
    icon: 'schools',
    targetPage: 'schools',
    description: 'Mở màn Schools hiện tại.',
  },
  {
    id: 'criteria',
    label: 'Tiêu chí đánh giá',
    status: 'live',
    icon: 'criteria',
    targetPage: 'criteria',
    description: 'Mở màn Criteria hiện tại.',
  },
  {
    id: 'ai-usage',
    label: 'AI Usage',
    status: 'live',
    icon: 'ai',
    targetPage: 'ai-usage',
    description: 'Mở trang minh bạch sử dụng AI.',
  },
  {
    id: 'teacher-mode',
    label: 'Teacher Mode',
    status: 'soon',
    icon: 'teacher',
    description: 'Preview chế độ giáo viên cho bản sau.',
  },
  {
    id: 'export-report',
    label: 'Xuất báo cáo',
    status: 'soon',
    icon: 'export',
    description: 'Preview chức năng xuất PDF/CSV cho bản sau.',
  },
];

export function getStatusBadgeLabel(status: ProductNavStatus): string {
  const labels: Record<ProductNavStatus, string> = {
    live: 'Live',
    db: 'DB',
    demo: 'Demo',
    soon: 'Soon',
  };

  return labels[status];
}

export function getStatusBadgeClass(status: ProductNavStatus): string {
  const classes: Record<ProductNavStatus, string> = {
    live: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    db: 'border-blue-200 bg-blue-50 text-blue-700',
    demo: 'border-amber-200 bg-amber-50 text-amber-700',
    soon: 'border-slate-200 bg-slate-100 text-slate-600',
  };

  return classes[status];
}
