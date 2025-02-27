'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DayActivity {
  time: string;
  title: string;
  cost: string;
  duration: string;
  location: string;
  description: string;
  image?: string;
  tips?: string[];
  type: string;
}

interface DayScheduleProps {
  day: string;
  date: string;
  activities: DayActivity[];
  totalCost: string;
  tips: string[];
}

export const DaySchedule = ({ day, date, activities, totalCost, tips }: DayScheduleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // تحديد أيقونة مناسبة لكل نوع من الأنشطة
  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'مطعم':
      case 'طعام':
      case 'غداء':
      case 'عشاء':
      case 'إفطار':
        return '🍽️';
      case 'سياحة':
      case 'زيارة':
      case 'معلم سياحي':
        return '🏛️';
      case 'تسوق':
      case 'مول':
        return '🛍️';
      case 'ترفيه':
      case 'نشاط':
        return '🎭';
      case 'شاطئ':
      case 'بحر':
        return '🏖️';
      case 'رياضة':
      case 'مغامرة':
        return '🏄‍♂️';
      case 'حديقة':
      case 'منتزه':
        return '🌳';
      case 'متحف':
        return '🏛️';
      case 'نقل':
      case 'مواصلات':
        return '🚕';
      default:
        return '📍';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-900/30"
    >
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
              اليوم {day}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{date}</p>
          </div>
          <motion.button 
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
              isExpanded 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50'
            }`}
          >
            {isExpanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-700/50 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-600/30"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-xl">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white">{activity.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">⏰ {activity.time}</span>
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                              {activity.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-bold px-3 py-1 rounded-lg">
                          {activity.cost} ريال
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl"
                >
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span> نصائح لهذا اليوم
                  </h4>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-end mt-4"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md">
                    <span className="font-medium">إجمالي تكلفة اليوم:</span> {totalCost} ريال
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};