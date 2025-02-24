'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: '🏠', label: 'الرئيسية', path: '/' },
  { icon: '🔍', label: 'استكشف', path: '/explore' },
  { icon: '❤️', label: 'المفضلة', path: '/favorites' },
  { icon: '👤', label: 'حسابي', path: '/profile' }
];

export default function MobileNavBar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-3xl md:hidden z-50"
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => (
          <Link href={item.path} key={item.path}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center space-y-1 ${
                pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
