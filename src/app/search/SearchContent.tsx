'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { generateTripPlan } from '@/services/gemini';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  features?: string[];
}

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

interface AIAnalysis {
  tripPlan: TripPlan;
  weatherInfo: string;
  culturalInfo: string[];
  packingList: string[];
  transportInfo: string[];
}

export default function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setAiAnalysis(null);
      
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
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(startDateObj);
        endDateObj.setDate(startDateObj.getDate() + duration);
        const endDate = endDateObj.toISOString().split('T')[0];

        const analysis = await generateTripPlan({
          destination,
          budget,
          startDate,
          endDate,
          travelers,
          tripType: tripPurpose
        });

        setAiAnalysis(analysis);
      } catch (error) {
        console.error('Error fetching results:', error);
        setError(error instanceof Error ? error.message : 'حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <IoArrowBack className="text-xl" />
              <span>العودة للصفحة السابقة</span>
            </motion.button>
          </div>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="animate-pulse"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text mb-4">
                جاري تخطيط رحلتك إلى {searchParams.get('destination')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                نقوم بتحليل البيانات وإنشاء خطة رحلة مخصصة لك...
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex justify-center"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">✈️</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mx-auto"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mx-auto"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mx-auto"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-md w-full text-center"
        >
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{error}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            العودة للصفحة الرئيسية
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm"
          >
            <IoArrowBack className="text-xl" />
            <span>العودة للصفحة السابقة</span>
          </motion.button>
        </motion.div>
        
        {aiAnalysis && (
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text">ملخص الرحلة</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{aiAnalysis.tripPlan.summary}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌤️</span>
                  <h3 className="text-xl md:text-2xl font-bold">معلومات الطقس</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{aiAnalysis.weatherInfo}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏛️</span>
                  <h3 className="text-xl md:text-2xl font-bold">معلومات ثقافية</h3>
                </div>
                <ul className="space-y-2.5 md:space-y-3">
                  {aiAnalysis.culturalInfo.map((info, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">قائمة التعبئة المقترحة</h3>
              <ul className="space-y-2.5 md:space-y-3">
                {aiAnalysis.packingList.map((item, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">معلومات النقل</h3>
              <ul className="space-y-2.5 md:space-y-3">
                {aiAnalysis.transportInfo.map((info, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-6">
              {aiAnalysis.tripPlan.dayPlans.map((day, dayIndex) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                  key={dayIndex} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">اليوم {dayIndex + 1} - {day.date}</h3>
                  <div className="space-y-4">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="border-b pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{activity.title}</h4>
                            <p className="text-gray-600">{activity.description}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          <div className="text-left">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {activity.type}
                            </span>
                            <p className="text-green-600 font-medium mt-1">
                              {activity.cost} ريال
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-right font-semibold">
                      إجمالي تكلفة اليوم: {day.totalCost} ريال
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">الميزانية</h3>
              <div className="space-y-2.5 md:space-y-3">
                <p className="flex justify-between">
                  <span>الميزانية الكلية:</span>
                  <span className="font-medium">{aiAnalysis.tripPlan.totalBudget} ريال</span>
                </p>
                <p className="flex justify-between">
                  <span>الميزانية المتبقية:</span>
                  <span className="font-medium">{aiAnalysis.tripPlan.remainingBudget} ريال</span>
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">توصيات إضافية</h3>
              <ul className="space-y-2.5 md:space-y-3">
                {aiAnalysis.tripPlan.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
