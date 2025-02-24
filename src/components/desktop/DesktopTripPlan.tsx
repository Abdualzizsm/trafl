'use client';

import { useState } from 'react';
import { parseTripPlan } from '@/utils/tripPlanParser';
import { TripPlanResponse } from '@/services/gemini';
import { LocationCard } from '../shared/LocationCard';
import { CostBreakdown } from '../shared/CostBreakdown';
import { WeatherWidget } from '../shared/WeatherWidget';
import { DayTimeline } from '../shared/DayTimeline';

interface DesktopTripPlanProps {
  plan: TripPlanResponse;
}

export const DesktopTripPlan = ({ plan }: DesktopTripPlanProps) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const { days, hotels, restaurants, costs, summary } = parseTripPlan(plan);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-12 gap-6">
        {/* القائمة الجانبية */}
        <div className="col-span-3 space-y-4 sticky top-4 self-start">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">ملخص الرحلة</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>المدة</span>
                <span className="font-bold">{summary.totalDays} أيام</span>
              </div>
              <div className="flex items-center justify-between">
                <span>التكلفة الإجمالية</span>
                <span className="font-bold text-green-600">
                  {summary.totalCost.toLocaleString('ar-SA')} ريال
                </span>
              </div>
              <WeatherWidget day={days[selectedDay]} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-bold mb-3">الفنادق المقترحة</h3>
            <div className="space-y-2">
              {hotels.map((hotel, idx) => (
                <LocationCard key={idx} item={hotel} type="hotel" />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-bold mb-3">المطاعم الموصى بها</h3>
            <div className="space-y-2">
              {restaurants.map((restaurant, idx) => (
                <LocationCard key={idx} item={restaurant} type="restaurant" />
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="col-span-9 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">✈️ رحلتك إلى {summary.destination}</h1>
              <div className="flex gap-2">
                {days.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                              ${selectedDay === idx 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}
                  >
                    اليوم {idx + 1}
                  </button>
                ))}
              </div>
            </div>
            
            <DayTimeline day={days[selectedDay]} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">تفاصيل التكاليف</h2>
            <CostBreakdown costs={costs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopTripPlan; 