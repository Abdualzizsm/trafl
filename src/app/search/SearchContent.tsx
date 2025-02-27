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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
        >
          <div className="text-amber-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">لم يتم العثور على نتائج</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.includes('API') 
              ? 'هناك مشكلة في الاتصال بخدمة البحث. يرجى المحاولة مرة أخرى لاحقًا.' 
              : error}
          </p>
          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              المحاولة مرة أخرى
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              العودة للصفحة الرئيسية
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text"
        >
          نتائج البحث
        </motion.h1>
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">جاري البحث عن أفضل الخيارات لك...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-red-100 dark:bg-red-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">حدث خطأ أثناء البحث</h3>
            <p className="text-red-600 dark:text-red-300 mb-4">لم نتمكن من العثور على نتائج لبحثك. يرجى المحاولة مرة أخرى.</p>
            <button 
              onClick={fetchResults}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              إعادة المحاولة
            </button>
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-2">لا توجد نتائج</h3>
            <p className="text-yellow-600 dark:text-yellow-300 mb-4">لم نتمكن من العثور على نتائج تطابق معايير بحثك. يرجى تجربة معايير مختلفة.</p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
            >
              العودة للبحث
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <Image
                    src={result.image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
                    alt={result.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h2 className="text-xl font-bold text-white">{result.title}</h2>
                    <p className="text-sm text-white/80">{result.subtitle}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-blue-600 dark:text-blue-400">⭐</span>
                      <span className="font-medium">{result.rating || '4.5'}</span>
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-bold">
                      {result.price} ريال
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {result.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                      <span>🗓️</span>
                      <span>{result.duration || '3 أيام'}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium"
                    >
                      عرض التفاصيل
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
