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
    <div className="mb-3 mx-auto max-w-[428px] w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg 
                   active:scale-98 transition-all duration-200 ease-in-out"
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 
                            flex items-center justify-center">
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
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-gray-400 text-lg"
            >
              ▼
            </motion.span>
          </div>
          
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">تكلفة اليوم</span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              {totalCost.toLocaleString('ar-SA')} ريال
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mt-2"
          >
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900 rounded-2xl p-4">
              {activities.map((activity, idx) => (
                <ActivityCard key={idx} activity={activity} index={idx} />
              ))}
              
              <div className="mt-4 space-y-3">
                <WeatherInfo day={day} />
                <TransportInfo />
              </div>

              <div className="mt-4">
                <h4 className="font-bold text-base mb-2 flex items-center gap-2">
                  <span>💡</span>
                  نصائح لهذا اليوم
                </h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3">
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {activity.tips?.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActivityCard = ({ activity, index }: { activity: DayActivity; index: number }) => {
  const timeIcons = ['🌅', '☀️', '🌙'];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 
                      flex items-center justify-center shrink-0">
          <span className="text-xl">{timeIcons[index]}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">
                {activity.title}
              </h4>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            <span className="px-2 py-1 bg-green-50 dark:bg-green-900/30 
                           text-green-600 rounded-full text-xs font-medium shrink-0">
              {activity.cost}
            </span>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span className="shrink-0">⏱️</span>
              <span className="truncate">{activity.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
              <span className="shrink-0">📍</span>
              <span className="truncate">{activity.location}</span>
            </div>
            {activity.image && (
              <img 
                src={activity.image} 
                alt={activity.title}
                className="w-full h-32 object-cover rounded-lg mt-2"
              />
            )}
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">
              {activity.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherInfo = ({ day }: { day: string }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4">
    <h4 className="font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
      <span>🌤️</span>
      <span>حالة الطقس</span>
    </h4>
    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 space-y-1">
      <p>درجة الحرارة: 24°C</p>
      <p>نسبة الرطوبة: 45%</p>
      <p>فرصة الأمطار: 10%</p>
    </div>
  </div>
);

const TransportInfo = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4">
    <h4 className="font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
      <span>🚗</span>
      <span>خيارات التنقل</span>
    </h4>
    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 space-y-1">
      <p>مترو: محطة العليا (5 دقائق سيراً)</p>
      <p>باص: خط 15 (10 دقائق)</p>
      <p>سيارة أجرة: متوفرة</p>
    </div>
  </div>
); 