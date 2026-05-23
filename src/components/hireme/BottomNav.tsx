'use client';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navItems = [
  { page: 'dashboard', label: 'Dashboard', icon: '📊' },
  { page: 'schools', label: 'Trường phái', icon: '🏛️' },
  { page: 'criteria', label: 'Tiêu chí', icon: '⚖️' },
];

export default function BottomNav({ onNavigate, currentPage }: BottomNavProps) {
  const hiddenPages = ['landing', 'industry'];
  if (hiddenPages.includes(currentPage)) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom md:hidden">
      <div className="max-w-lg mx-auto flex items-center justify-around h-14 px-2">
        {navItems.map(item => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors min-w-[64px] ${
              currentPage === item.page
                ? 'text-purple-700 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
