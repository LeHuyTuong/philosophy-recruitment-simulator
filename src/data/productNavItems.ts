export type ProductNavStatus = 'live' | 'db' | 'demo' | 'soon';

export type ProductNavGroupId = 'experience' | 'classroom' | 'presentation' | 'learning' | 'extensions';

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
  group: ProductNavGroupId;
  label: string;
  status: ProductNavStatus;
  icon: string;
  targetPage?: string;
  description: string;
}

export interface ProductNavGroup {
  id: ProductNavGroupId;
  label: string;
  description: string;
}

export const productNavGroups: ProductNavGroup[] = [
  {
    id: 'experience',
    label: 'Trải nghiệm',
    description: 'Flow tuyển dụng mô phỏng dành cho sinh viên.',
  },
  {
    id: 'classroom',
    label: 'Lớp học',
    description: 'Tổng hợp dữ liệu và điều phối thảo luận trên lớp.',
  },
  {
    id: 'presentation',
    label: 'Thuyết trình',
    description: 'Màn hình trình chiếu cho giảng viên hoặc nhóm thuyết trình.',
  },
  {
    id: 'learning',
    label: 'Học liệu',
    description: 'Tài liệu nền để giải thích trường phái và tiêu chí.',
  },
  {
    id: 'extensions',
    label: 'Mở rộng',
    description: 'Các màn hình demo, preview và tính năng sắp ra mắt.',
  },
];

export const productNavItems: ProductNavItem[] = [
  {
    id: 'main-experience',
    group: 'experience',
    label: 'Trải nghiệm chính',
    status: 'live',
    icon: 'play',
    description: 'Mở lại flow tuyển dụng hiện tại mà không reset state.',
  },
  {
    id: 'presentation-slides',
    group: 'presentation',
    label: 'Slide thuyết trình',
    status: 'live',
    icon: 'presentation',
    description: 'Mở bộ slide trình bày trong modal.',
  },
  {
    id: 'class-dashboard',
    group: 'classroom',
    label: 'Dashboard lớp',
    status: 'db',
    icon: 'dashboard',
    targetPage: 'dashboard',
    description: 'Đọc thống kê thật từ DB, có fallback demo khi chưa có dữ liệu.',
  },
  {
    id: 'personal-report',
    group: 'extensions',
    label: 'Báo cáo cá nhân',
    status: 'demo',
    icon: 'report',
    description: 'Tóm tắt phiên chơi hiện tại nếu đã có dữ liệu.',
  },
  {
    id: 'db-results',
    group: 'classroom',
    label: 'Kết quả DB',
    status: 'db',
    icon: 'database',
    description: 'Kiểm tra kết nối DB qua health check an toàn.',
  },
  {
    id: 'candidate-comparison',
    group: 'extensions',
    label: 'So sánh ứng viên',
    status: 'demo',
    icon: 'compare',
    description: 'Preview so sánh shortlist Round 1 với kết quả Round 3.',
  },
  {
    id: 'session-history',
    group: 'classroom',
    label: 'Lịch sử phiên chơi',
    status: 'db',
    icon: 'history',
    description: 'Đọc các phiên chơi ẩn danh gần đây từ DB hoặc fallback.',
  },
  {
    id: 'schools',
    group: 'learning',
    label: 'Trường phái',
    status: 'live',
    icon: 'schools',
    targetPage: 'schools',
    description: 'Mở màn Schools hiện tại.',
  },
  {
    id: 'criteria',
    group: 'learning',
    label: 'Tiêu chí đánh giá',
    status: 'live',
    icon: 'criteria',
    targetPage: 'criteria',
    description: 'Mở màn Criteria hiện tại.',
  },
  {
    id: 'ai-usage',
    group: 'learning',
    label: 'AI Usage',
    status: 'live',
    icon: 'ai',
    targetPage: 'ai-usage',
    description: 'Mở trang minh bạch sử dụng AI.',
  },
  {
    id: 'teacher-mode',
    group: 'extensions',
    label: 'Teacher Mode',
    status: 'soon',
    icon: 'teacher',
    description: 'Preview chế độ giáo viên cho bản sau.',
  },
  {
    id: 'export-report',
    group: 'extensions',
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
