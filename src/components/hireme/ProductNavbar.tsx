'use client';

import {
  BarChart3,
  Bot,
  ClipboardList,
  Database,
  Download,
  FileText,
  GitCompare,
  GraduationCap,
  History,
  LibraryBig,
  PlayCircle,
  Presentation,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import {
  getStatusBadgeClass,
  getStatusBadgeLabel,
  productNavItems,
  type ProductNavItem,
} from '@/data/productNavItems';

interface ProductNavbarProps {
  currentPage: string;
  onSelect: (item: ProductNavItem) => void;
}

const iconMap: Record<string, LucideIcon> = {
  play: PlayCircle,
  presentation: Presentation,
  dashboard: BarChart3,
  report: FileText,
  database: Database,
  compare: GitCompare,
  history: History,
  schools: LibraryBig,
  criteria: Scale,
  ai: Bot,
  teacher: GraduationCap,
  export: Download,
  default: ClipboardList,
};

const gamePages = new Set(['landing', 'industry', 'round1', 'round2', 'round3', 'reveal', 'final-poll']);

function isActive(item: ProductNavItem, currentPage: string) {
  if (item.id === 'main-experience') return gamePages.has(currentPage);
  return item.targetPage === currentPage;
}

export default function ProductNavbar({ currentPage, onSelect }: ProductNavbarProps) {
  return (
    <nav
      aria-label="Product modules"
      data-testid="product-navbar"
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div className="mx-auto max-w-7xl px-3 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {productNavItems.map(item => {
            const Icon = iconMap[item.icon] || iconMap.default;
            const active = isActive(item, currentPage);

            return (
              <button
                key={item.id}
                type="button"
                data-testid={`product-nav-${item.id}`}
                onClick={() => onSelect(item)}
                className={`group inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border px-3 text-left text-sm font-semibold transition-colors ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
                title={item.description}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">{item.label}</span>
                <span
                  className={`ml-0.5 rounded-md border px-1.5 py-0.5 text-[10px] font-black uppercase leading-none ${
                    active ? 'border-white/30 bg-white/10 text-white' : getStatusBadgeClass(item.status)
                  }`}
                >
                  {getStatusBadgeLabel(item.status)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
