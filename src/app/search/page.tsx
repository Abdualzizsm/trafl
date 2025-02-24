'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { generateTripPlan } from '@/services/gemini';

interface Activity {
  title: string;
  description: string;
  time: string;
  cost: number;
  type: 'سياحة' | 'تسوق' | 'طعام' | 'ترفيه' | 'ثقافة';
}

interface DayPlan {
  date: string;
  activities: Activity[];
  totalCost: number;
}

interface TripPlan {
  summary: string;
  totalBudget: number;
  remainingBudget: number;
  recommendations: string[];
  dayPlans: DayPlan[];
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  features?: string[];
}

interface AIAnalysis {
  tripPlan: TripPlan;
  weatherInfo: string;
  culturalInfo: string[];
  packingList: string[];
  transportInfo: string[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setAiAnalysis(null); // إعادة تعيين التحليل إلى null قبل البدء
      
      try {
        const destination = searchParams.get('destination');
        const budget = searchParams.get('budget');
        const tripPurpose = searchParams.get('tripPurpose');
        const startDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
        const duration = parseInt(searchParams.get('duration') || '3');
        const travelers = parseInt(searchParams.get('travelers') || '1');

        if (!destination || !budget || !tripPurpose) {
          throw new Error('الرجاء تعبئة جميع الحقول المطلوبة');
        }

        // حساب تاريخ النهاية
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);

        // استدعاء Gemini API
        const tripData = {
          destination,
          budget,
          startDate,
          endDate: endDate.toISOString().split('T')[0],
          travelers,
          tripType: tripPurpose
        };

        console.log('بيانات الرحلة:', tripData);
        console.log('Trip Data:', tripData);
        
        const response = await generateTripPlan(tripData);
        console.log('Gemini Response:', response);

        const analysis: AIAnalysis = {
          tripPlan: response.tripPlan,
          weatherInfo: response.weatherInfo,
          culturalInfo: response.culturalInfo,
          packingList: response.packingList,
          transportInfo: response.transportInfo
        };
        
        console.log('Analysis:', analysis);
        setAiAnalysis(analysis);
      } catch (error) {
        console.error('خطأ في استدعاء Gemini:', error);
        // لا نقوم بإظهار رسالة الخطأ للمستخدم
      } finally {
        setLoading(false);
      }
    };

    if (searchParams.get('destination')) {
      fetchResults();
    }
  }, [searchParams]);

  return (
    <motion.main
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg inline-flex items-center">
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            عودة
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              خطة رحلة إلى: {searchParams.get('destination')}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
                <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">المدة</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{searchParams.get('duration')} أيام</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center">
                <div className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">عدد المسافرين</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{searchParams.get('travelers')}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
                <div className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">نوع الرحلة</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{searchParams.get('tripPurpose')}</div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="mr-4 text-gray-600 dark:text-gray-300">جاري تحليل الرحلة...</span>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-8">
                {/* ملخص الرحلة */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    ملخص الرحلة
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-700 dark:text-gray-300">{aiAnalysis.tripPlan.summary}</p>
                  </div>
                </div>

                {/* الطقس */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    حالة الطقس
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-700 dark:text-gray-300">{aiAnalysis.weatherInfo}</p>
                  </div>
                </div>

                {/* خطة اليومية */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 ml-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    الخطة اليومية
                  </h2>
                  <div className="space-y-6">
                    {aiAnalysis.tripPlan.dayPlans.map((day, dayIndex) => (
                      <div key={dayIndex} className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">اليوم {dayIndex + 1}</h3>
                          <span className="text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full">{day.date}</span>
                        </div>
                        <div className="space-y-4">
                          {day.activities.map((activity, activityIndex) => (
                            <div key={activityIndex} className="relative pl-6 border-r-2 border-blue-200 dark:border-blue-800 pr-4">
                              <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 border-2 border-white dark:border-gray-800"></div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{activity.time}</span>
                                <span className="text-xs font-medium px-2 py-1 rounded-full" 
                                  style={{
                                    backgroundColor: activity.type === 'سياحة' ? 'rgb(219 234 254)' :
                                                  activity.type === 'تسوق' ? 'rgb(220 252 231)' :
                                                  activity.type === 'طعام' ? 'rgb(254 226 226)' :
                                                  activity.type === 'ترفيه' ? 'rgb(254 249 195)' : 'rgb(237 233 254)',
                                    color: activity.type === 'سياحة' ? 'rgb(29 78 216)' :
                                           activity.type === 'تسوق' ? 'rgb(21 128 61)' :
                                           activity.type === 'طعام' ? 'rgb(185 28 28)' :
                                           activity.type === 'ترفيه' ? 'rgb(161 98 7)' : 'rgb(109 40 217)'
                                  }}>
                                  {activity.type}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white text-lg mb-1">{activity.title}</h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{activity.description}</p>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                التكلفة: {activity.cost} ريال
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">إجمالي تكلفة اليوم</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">{day.totalCost} ريال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* توصيات */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <svg className="w-6 h-6 ml-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    توصيات خاصة
                  </h2>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 shadow-sm border border-purple-100 dark:border-purple-800/30">
                    <ul className="space-y-4">
                      {aiAnalysis.tripPlan.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start transform hover:scale-[1.01] transition-transform">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center ml-3">
                            <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">{index + 1}</span>
                          </span>
                          <div className="flex-grow">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{recommendation}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* معلومات إضافية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">معلومات النقل</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.transportInfo.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-700 dark:text-gray-300">• {tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">نصائح ثقافية</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.culturalInfo.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-700 dark:text-gray-300">• {tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">قائمة التجهيزات</h3>
                    <ul className="space-y-2">
                      {aiAnalysis.packingList.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-700 dark:text-gray-300">• {item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">لم يتم العثور على نتائج</p>
              </div>
            )}
          </div>
        </motion.div>


      </div>
    </motion.main>
  );
}
