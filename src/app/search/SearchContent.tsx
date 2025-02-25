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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <IoArrowBack className="text-xl" />
              <span>العودة للصفحة السابقة</span>
            </button>
          </div>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="animate-pulse">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                جاري تخطيط رحلتك إلى {searchParams.get('destination')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                نقوم بتحليل البيانات وإنشاء خطة رحلة مخصصة لك...
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-white dark:bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <IoArrowBack className="text-xl" />
          <span>العودة للصفحة السابقة</span>
        </button>
      </div>
      {aiAnalysis && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">ملخص الرحلة</h2>
            <p className="text-gray-700">{aiAnalysis.tripPlan.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">معلومات الطقس</h3>
              <p className="text-gray-700">{aiAnalysis.weatherInfo}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">معلومات ثقافية</h3>
              <ul className="list-disc list-inside space-y-2">
                {aiAnalysis.culturalInfo.map((info, index) => (
                  <li key={index} className="text-gray-700">{info}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">قائمة التعبئة المقترحة</h3>
            <ul className="list-disc list-inside space-y-2">
              {aiAnalysis.packingList.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">معلومات النقل</h3>
            <ul className="list-disc list-inside space-y-2">
              {aiAnalysis.transportInfo.map((info, index) => (
                <li key={index} className="text-gray-700">{info}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            {aiAnalysis.tripPlan.dayPlans.map((day, dayIndex) => (
              <div key={dayIndex} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">اليوم {dayIndex + 1} - {day.date}</h3>
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
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">الميزانية</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>الميزانية الكلية:</span>
                <span className="font-medium">{aiAnalysis.tripPlan.totalBudget} ريال</span>
              </p>
              <p className="flex justify-between">
                <span>الميزانية المتبقية:</span>
                <span className="font-medium">{aiAnalysis.tripPlan.remainingBudget} ريال</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">توصيات إضافية</h3>
            <ul className="list-disc list-inside space-y-2">
              {aiAnalysis.tripPlan.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
