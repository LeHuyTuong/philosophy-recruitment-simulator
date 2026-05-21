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
  productNavGroups,
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
const badgeableStatuses = new Set(['db', 'soon']);

function isActive(item: ProductNavItem, currentPage: string) {
  if (item.id === 'main-experience') return gamePages.has(currentPage);
  return item.targetPage === currentPage;
}

const groupedItems = productNavGroups.map(group => ({
  ...group,
  items: productNavItems.filter(item => item.group === group.id),
}));

export default function ProductNavbar({ currentPage, onSelect }: ProductNavbarProps) {
  return (
    <nav
      aria-label="Product modules"
      data-testid="product-navbar"
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div className="mx-auto max-w-7xl px-3 py-3 lg:py-4">
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible">
          {groupedItems.map(group => {
            const hasActiveItem = group.items.some(item => isActive(item, currentPage));

            return (
              <section
                key={group.id}
                data-testid={`product-nav-group-${group.id}`}
                className={`min-w-[18rem] rounded-2xl border bg-white/85 p-3 shadow-sm transition-colors lg:min-w-0 ${
                  hasActiveItem ? 'border-slate-900/20 ring-1 ring-slate-900/10' : 'border-slate-200'
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{group.label}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{group.description}</p>
                  </div>
                  {hasActiveItem ? <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-slate-900" aria-hidden="true" /> : null}
                </div>

                <div className="grid gap-2">
                  {group.items.map(item => {
                    const Icon = iconMap[item.icon] || iconMap.default;
                    const active = isActive(item, currentPage);
                    const showBadge = badgeableStatuses.has(item.status);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-testid={`product-nav-${item.id}`}
                        onClick={() => onSelect(item)}
                        className={`group flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                          active
                            ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        title={item.description}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="flex-1 whitespace-nowrap">{item.label}</span>
                        {showBadge ? (
                          <span
                            className={`rounded-md border px-1.5 py-0.5 text-[10px] font-black uppercase leading-none ${
                              active ? 'border-white/30 bg-white/10 text-white' : getStatusBadgeClass(item.status)
                            }`}
                          >
                            {getStatusBadgeLabel(item.status)}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
