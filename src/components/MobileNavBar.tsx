'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  IoHomeOutline, IoHome, 
  IoSearchOutline, IoSearch, 
  IoHeartOutline, IoHeart, 
  IoPersonOutline, IoPerson,
  IoSettingsOutline, IoSettings
} from 'react-icons/io5';

export default function MobileNavBar() {
  const pathname = usePathname();

  const navItems = [
    {
      path: '/',
      activeIcon: <IoHome className="text-2xl" />,
      inactiveIcon: <IoHomeOutline className="text-2xl" />,
      label: 'الرئيسية'
    },
    {
      path: '/explore',
      activeIcon: <IoSearch className="text-2xl" />,
      inactiveIcon: <IoSearchOutline className="text-2xl" />,
      label: 'استكشف'
    },
    {
      path: '/favorites',
      activeIcon: <IoHeart className="text-2xl" />,
      inactiveIcon: <IoHeartOutline className="text-2xl" />,
      label: 'المفضلة'
    },
    {
      path: '/profile',
      activeIcon: <IoPerson className="text-2xl" />,
      inactiveIcon: <IoPersonOutline className="text-2xl" />,
      label: 'حسابي'
    },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-t-2xl border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link href={item.path} key={item.path} className="block w-full">
                <motion.div 
                  className="flex flex-col items-center py-2 px-1"
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ 
                      y: isActive ? -5 : 0,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {isActive ? item.activeIcon : item.inactiveIcon}
                  </motion.div>
                  
                  <motion.span 
                    animate={{ 
                      opacity: isActive ? 1 : 0.7,
                      scale: isActive ? 1 : 0.9
                    }}
                    className={`text-xs mt-1 ${isActive ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {item.label}
                  </motion.span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
