'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoSearchOutline, IoHeartOutline, IoPersonOutline } from 'react-icons/io5';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'الرئيسية',
      href: '/',
      icon: IoHomeOutline,
    },
    {
      label: 'المفضلة',
      href: '/favorites',
      icon: IoHeartOutline,
    },
    {
      label: 'استكشف',
      href: '/explore',
      icon: IoSearchOutline,
    },
    {
      label: 'حسابي',
      href: '/profile',
      icon: IoPersonOutline,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <item.icon className="text-2xl" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
