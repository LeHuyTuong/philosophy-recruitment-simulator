'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  ChevronDown,
  ClipboardList,
  Database,
  Download,
  FileText,
  GitCompare,
  GraduationCap,
  History,
  LibraryBig,
  Menu,
  PlayCircle,
  Presentation,
  Scale,
  X,
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
const dropdownBadgeStatuses = new Set(['db', 'demo', 'soon']);

function isActive(item: ProductNavItem, currentPage: string) {
  if (item.id === 'main-experience') return gamePages.has(currentPage);
  return item.targetPage === currentPage;
}

const groupedItems = productNavGroups.map(group => ({
  ...group,
  items: productNavItems.filter(item => item.group === group.id),
}));

const itemById = new Map(productNavItems.map(item => [item.id, item]));

const desktopActions: Array<
  | { type: 'direct'; label: string; itemId: ProductNavItem['id']; groupId: string }
  | { type: 'menu'; label: string; groupId: string }
> = [
  { type: 'direct', label: 'Trải nghiệm', itemId: 'main-experience', groupId: 'experience' },
  { type: 'menu', label: 'Lớp học', groupId: 'classroom' },
  { type: 'direct', label: 'Slide', itemId: 'presentation-slides', groupId: 'presentation' },
  { type: 'menu', label: 'Học liệu', groupId: 'learning' },
  { type: 'menu', label: 'Mở rộng', groupId: 'extensions' },
];

export default function ProductNavbar({ currentPage, onSelect }: ProductNavbarProps) {
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDesktopGroup(null);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const selectItem = (item: ProductNavItem) => {
    onSelect(item);
    setOpenDesktopGroup(null);
    setMobileMenuOpen(false);
  };

  const renderDropdownItem = (item: ProductNavItem) => {
    const Icon = iconMap[item.icon] || iconMap.default;
    const active = isActive(item, currentPage);
    const showBadge = dropdownBadgeStatuses.has(item.status);

    return (
      <button
        key={item.id}
        type="button"
        role="menuitem"
        data-testid={`product-nav-${item.id}`}
        onClick={() => selectItem(item)}
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
          active ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
        }`}
        title={item.description}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="flex-1">{item.label}</span>
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
  };

  return (
    <nav
      ref={navRef}
      aria-label="Product modules"
      data-testid="product-navbar"
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <button
          type="button"
          data-testid="product-nav-brand"
          onClick={() => {
            const item = itemById.get('main-experience');
            if (item) selectItem(item);
          }}
          className="shrink-0 text-base font-black tracking-normal text-slate-950"
        >
          HireMe Lab
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {desktopActions.map(action => {
            const group = groupedItems.find(item => item.id === action.groupId);
            const hasActiveItem = group?.items.some(item => isActive(item, currentPage)) ?? false;

            if (action.type === 'direct') {
              const item = itemById.get(action.itemId);
              if (!item) return null;

              return (
                <button
                  key={action.label}
                  type="button"
                  data-testid={`product-nav-${item.id}`}
                  onClick={() => selectItem(item)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                    isActive(item, currentPage)
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {action.label}
                </button>
              );
            }

            return (
              <div key={action.groupId} className="relative">
                <button
                  type="button"
                  data-testid={`product-nav-trigger-${action.groupId}`}
                  aria-expanded={openDesktopGroup === action.groupId}
                  onClick={() => setOpenDesktopGroup(group => (group === action.groupId ? null : action.groupId))}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors ${
                    hasActiveItem
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {action.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDesktopGroup === action.groupId ? 'rotate-180' : ''}`} />
                </button>

                {openDesktopGroup === action.groupId && group ? (
                  <div
                    role="menu"
                    data-testid={`product-nav-menu-${action.groupId}`}
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                  >
                    {group.items.map(renderDropdownItem)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          data-testid="product-nav-mobile-menu-button"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(open => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 md:hidden"
          title="Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div data-testid="product-nav-mobile-menu" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-lg gap-3">
            {groupedItems.map(group => (
              <section key={group.id} data-testid={`product-nav-group-${group.id}`} className="grid gap-1">
                <p className="px-1 text-[11px] font-black uppercase text-slate-400">{group.label}</p>
                <div className="grid gap-1">{group.items.map(renderDropdownItem)}</div>
              </section>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
