'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseTripPlan } from '@/utils/tripPlanParser';
import { TripPlanResponse } from '@/services/gemini';

interface MobileTripPlanProps {
  plan: TripPlanResponse;
}

export const MobileTripPlan = ({ plan }: MobileTripPlanProps) => {
  const { days, hotels, restaurants, costs, summary } = parseTripPlan(plan);
  const [activeTab, setActiveTab] = useState('schedule');
  const scrollRef = useRef<HTMLDivElement>(null);

  // منع السحب للتحديث
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* رأس الصفحة */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50">
        <div className="safe-area-top" />
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">✈️ رحلة {summary.destination}</h1>
            <button className="ios-btn w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800/80 active-scale">
              <span>⚙️</span>
            </button>
          </div>
          
          {/* شريط التقدم */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-gray-100 dark:bg-gray-800">
              <div 
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${(summary.totalDays / days.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">
              {summary.totalDays} / {days.length} أيام
            </span>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div 
        ref={scrollRef}
        className="pt-24 pb-24 px-4 smooth-scroll h-screen overflow-y-auto"
      >
        {/* بطاقة الملخص */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">التكلفة الإجمالية</p>
              <p className="text-xl font-bold text-green-600">
                {summary.totalCost.toLocaleString('ar-SA')} ريال
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">المدة</p>
              <p className="text-xl font-bold">
                {summary.totalDays} أيام
              </p>
            </div>
          </div>
        </motion.div>

        {/* الأيام */}
        <div className="space-y-4">
          {days.map((day, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg active-scale"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">اليوم {idx + 1}</h3>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                  {day.activities.length} أنشطة
                </span>
              </div>
              
              <div className="space-y-3">
                {day.activities.map((activity, actIdx) => (
                  <div 
                    key={actIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{
                        actIdx === 0 ? '🌅' : 
                        actIdx === 1 ? '☀️' : '🌙'
                      }</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <p className="mt-1 font-medium">{activity.content}</p>
                      {activity.cost && (
                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                          {activity.cost}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* شريط التنقل السفلي */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t dark:border-gray-800/50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            { id: 'schedule', icon: '📅', label: 'الجدول' },
            { id: 'hotels', icon: '🏨', label: 'الإقامة' },
            { id: 'restaurants', icon: '🍽️', label: 'المطاعم' },
            { id: 'costs', icon: '💰', label: 'التكاليف' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 rounded-xl transition-colors
                        ${activeTab === tab.id 
                          ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-500'}`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="safe-area-bottom" />
      </div>
    </div>
  );
};

export default MobileTripPlan; 