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
}

interface DayScheduleProps {
  day: string;
  activities: DayActivity[];
  totalCost: number;
}

export const DaySchedule = ({ day, activities, totalCost }: DayScheduleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Number(day) * 0.1 }}
      className="mb-5 mx-auto max-w-[428px] w-full"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg 
                   transition-all duration-200 ease-in-out border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/20 
                            flex items-center justify-center shadow-sm">
                <span className="text-xl">📅</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  اليوم {day}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activities.length} أنشطة
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
            >
              <span className="text-gray-500 dark:text-gray-300 text-sm">▼</span>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-between px-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">تكلفة اليوم</span>
            <span className="text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
              {totalCost.toLocaleString('ar-SA')} ريال
            </span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 overflow-hidden"
          >
            <div className="space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-md">
              {activities.map((activity, idx) => (
                <ActivityCard key={idx} activity={activity} index={idx} />
              ))}
              
              <div className="mt-6 space-y-4">
                <WeatherInfo day={day} />
                <TransportInfo />
              </div>

              {activities.some(activity => activity.tips && activity.tips.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-6"
                >
                  <h4 className="font-bold text-base mb-3 flex items-center gap-2">
                    <span className="text-amber-500">💡</span>
                    <span className="bg-gradient-to-r from-amber-600 to-amber-400 text-transparent bg-clip-text">نصائح لهذا اليوم</span>
                  </h4>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 rounded-xl p-4 shadow-inner">
                    <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                      {activities.flatMap((activity, activityIndex) => 
                        (activity.tips || []).map((tip, tipIndex) => (
                          <li key={`${activityIndex}-${tipIndex}`} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ActivityCard = ({ activity, index }: { activity: DayActivity; index: number }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // تحديد الأيقونة بناءً على عنوان النشاط
  const getActivityIcon = (title: string) => {
    if (title.includes('مطعم') || title.includes('غداء') || title.includes('عشاء') || title.includes('إفطار')) {
      return '🍽️';
    } else if (title.includes('متحف') || title.includes('معرض')) {
      return '🏛️';
    } else if (title.includes('تسوق') || title.includes('سوق')) {
      return '🛍️';
    } else if (title.includes('حديقة') || title.includes('منتزه')) {
      return '🌳';
    } else if (title.includes('شاطئ') || title.includes('بحر')) {
      return '🏖️';
    } else {
      return '📍';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-800/20 
                        flex items-center justify-center shadow-sm mt-1">
            <span className="text-lg">{getActivityIcon(activity.title)}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{activity.title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              <span>⏰</span> {activity.time} • <span>⏱️</span> {activity.duration}
            </p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-500 text-transparent bg-clip-text">
            {activity.cost}
          </p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDetails(!showDetails)}
        className="mt-3 w-full text-xs text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
      </motion.button>
      
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{activity.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span>📍</span> {activity.location}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WeatherInfo = ({ day }: { day: string }) => {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/20 p-4 rounded-xl shadow-sm border border-blue-100/50 dark:border-blue-800/30">
      <h4 className="font-bold text-base mb-2 flex items-center gap-2">
        <span>🌤️</span>
        <span className="bg-gradient-to-r from-sky-600 to-blue-500 text-transparent bg-clip-text">حالة الطقس</span>
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        متوقع أن يكون الطقس مشمسًا مع درجة حرارة تتراوح بين 25-30 درجة مئوية في اليوم {day}.
      </p>
    </div>
  );
};

const TransportInfo = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/20 p-4 rounded-xl shadow-sm border border-purple-100/50 dark:border-purple-800/30">
      <h4 className="font-bold text-base mb-2 flex items-center gap-2">
        <span>🚕</span>
        <span className="bg-gradient-to-r from-purple-600 to-indigo-500 text-transparent bg-clip-text">وسائل النقل</span>
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        يمكنك استخدام سيارات الأجرة أو خدمات النقل التشاركي للتنقل بين الأنشطة.
      </p>
    </div>
  );
};