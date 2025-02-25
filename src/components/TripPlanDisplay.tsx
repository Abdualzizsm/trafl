'use client';

import dynamic from 'next/dynamic';
const DesktopTripPlan = dynamic(() => import('./desktop/DesktopTripPlan'));

import { TripPlanResponse } from '@/services/gemini';

interface TripPlanProps {
  plan: TripPlanResponse;
}

export const TripPlanDisplay = ({ plan }: TripPlanProps) => {
  return (
    <div className="min-h-screen">
      <DesktopTripPlan plan={plan} />
    </div>
  );
};

export default TripPlanDisplay;

const LocationCard = ({ item }: { item: string }) => {
  const [name, ...detailsParts] = item.split(':').map(s => s.trim());
  const details = detailsParts.join(':');
  const priceMatch = details.match(/\((\d+)\s*ريال[^)]*\)/);
  const price = priceMatch ? priceMatch[0] : '';
  const cleanDetails = details.replace(price, '').trim();
  const ratingMatch = details.match(/(\d(\.\d)?)\s*نجوم/);
  const rating = ratingMatch ? ratingMatch[1] : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h5 className="font-medium text-gray-900 dark:text-white">{name}</h5>
        {rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{rating}</span>
          </div>
        )}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{cleanDetails}</p>
      {price && (
        <div className="text-green-600 dark:text-green-400 font-mono text-lg">
          {price}
        </div>
      )}
    </div>
  );
};

const CostBreakdown = ({ costs }: { costs: string[] }) => {
  // التحقق من وجود البيانات
  if (!costs || !Array.isArray(costs)) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-800 dark:text-yellow-200">
        <div className="flex items-center gap-2">
          <span>⚠️</span>
          <span>لم يتم العثور على بيانات التكاليف</span>
        </div>
      </div>
    );
  }

  // تحويل النص إلى كائن التكاليف
  const costObject = costs.reduce((acc, item) => {
    if (!item.includes(':')) return acc;
    
    const [category, amountStr] = item.split(':').map(s => s.trim());
    // استخراج الرقم من النص
    const amount = parseInt(amountStr.match(/\d+/)?.[0] || '0');
    return { ...acc, [category]: amount };
  }, {} as Record<string, number>);

  const total = Object.values(costObject).reduce((a, b) => a + b, 0);
  
  // التحقق من وجود تكاليف
  if (total === 0) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-yellow-800 dark:text-yellow-200">
        <div className="flex items-center gap-2">
          <span>⚠️</span>
          <span>لم يتم العثور على تكاليف صحيحة</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(costObject).map(([category, amount], idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span>{getCategoryIcon(category)}</span>
              <span className="text-gray-600 dark:text-gray-300">{category}</span>
            </div>
            <span className="text-lg font-bold text-green-600 dark:text-green-400 font-mono">
              {amount.toLocaleString('ar-SA')} ريال
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(amount / total) * 100}%` }}
            />
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span className="text-lg">المجموع الكلي</span>
          </div>
          <span className="text-2xl font-bold font-mono">
            {total.toLocaleString('ar-SA')} ريال
          </span>
        </div>
      </div>
    </div>
  );
};

// دالة مساعدة لإضافة أيقونات للفئات
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'الإقامة': '🏨',
    'الطعام': '🍽️',
    'الأنشطة': '🎯',
    'المواصلات': '🚗',
    'مصاريف أخرى': '📝'
  };
  return icons[category] || '💰';
}; 