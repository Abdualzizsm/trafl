'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IoHomeOutline, 
  IoSearchOutline, 
  IoCompassOutline,
  IoPersonOutline,
  IoHome,
  IoSearch,
  IoCompass,
  IoPerson
} from 'react-icons/io5';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'الرئيسية',
      href: '/',
      icon: IoHomeOutline,
      activeIcon: IoHome
    },
    {
      label: 'استكشف',
      href: '/explore',
      icon: IoCompassOutline,
      activeIcon: IoCompass
    },
    {
      label: 'بحث',
      href: '/search',
      icon: IoSearchOutline,
      activeIcon: IoSearch
    },
    {
      label: 'حسابي',
      href: '/profile',
      icon: IoPersonOutline,
      activeIcon: IoPerson
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom backdrop-blur-lg bg-white/80 dark:bg-gray-800/80">
      <div className="max-w-lg mx-auto grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-0.5 transition-all duration-200 bottom-nav-item ${
                isActive
                  ? 'text-[#0066ff] dark:text-[#3399ff] active'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {isActive ? (
                <item.activeIcon className="text-xl sm:text-2xl" />
              ) : (
                <item.icon className="text-xl sm:text-2xl" />
              )}
              <span className="text-[10px] sm:text-xs font-medium mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
