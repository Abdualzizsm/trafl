'use client';

// تحديث لإعادة النشر - 27 فبراير 2025
import React, { useEffect, useState } from 'react';
import DesktopHome from '@/components/desktop/DesktopHome2';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// استيراد مكون MobileHome بشكل ديناميكي
const MobileNavBar = dynamic(() => import('@/components/MobileNavBar'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // التحقق من حجم الشاشة عند التحميل وعند تغيير حجم النافذة
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // التحقق الأولي
    checkDevice();
    setIsLoading(false);

    // إضافة مستمع لتغيير حجم النافذة
    window.addEventListener('resize', checkDevice);

    // إزالة المستمع عند تفكيك المكون
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">جاري التحميل...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <DesktopHome />
      {isMobile && <MobileNavBar />}
    </>
  );
}
