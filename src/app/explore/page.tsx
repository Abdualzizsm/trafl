'use client';

import { useState } from 'react';
import SwipeableCard from '@/components/SwipeableCard';
import { motion } from 'framer-motion';

const demoTrips = [
  {
    id: 1,
    title: 'رحلة إلى دبي',
    image: '/dubai.jpg',
    price: '3,500 ريال',
    rating: 4.8,
    location: 'الإمارات العربية المتحدة'
  },
  {
    id: 2,
    title: 'جزر المالديف',
    image: '/maldives.jpg',
    price: '8,900 ريال',
    rating: 4.9,
    location: 'المالديف'
  },
  // يمكن إضافة المزيد من الرحلات هنا
];

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // حفظ في المفضلة
      console.log('Added to favorites:', demoTrips[currentIndex].title);
    }
    
    // الانتقال إلى البطاقة التالية
    setCurrentIndex((prev) => Math.min(prev + 1, demoTrips.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-right mb-2">
            استكشف الوجهات
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-right">
            اسحب يميناً للإعجاب أو يساراً للتخطي
          </p>
        </motion.div>

        <div className="relative h-[70vh] flex items-center justify-center">
          {demoTrips.map((trip, index) => (
            index >= currentIndex && (
              <div
                key={trip.id}
                className={`absolute w-full ${
                  index === currentIndex ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `scale(${1 - (index - currentIndex) * 0.05})`,
                  opacity: 1 - (index - currentIndex) * 0.3
                }}
              >
                <SwipeableCard
                  {...trip}
                  onSwipe={index === currentIndex ? handleSwipe : undefined}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
