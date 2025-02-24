'use client';

import { useState } from 'react';
import { TRIP_TYPES } from '@/config/constants';
import { generateTripPlan } from '@/services/gemini';
import TripPlanDisplay from './TripPlanDisplay';

export const TripForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    travelers: 1,
    startDate: '',
    endDate: '',
    tripType: ''
  });
  const [tripPlan, setTripPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const plan = await generateTripPlan(formData);
      setTripPlan(plan);
    } catch (error) {
      console.error('Error generating trip plan:', error);
      alert('حدث خطأ أثناء إنشاء خطة الرحلة. الرجاء المحاولة مرة أخرى.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative h-[30vh] bg-gradient-to-b from-blue-600 to-blue-400">
        <img 
          src="/travel-bg.jpg" 
          alt="خلفية"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl font-bold text-right">إلى أين تريد الذهاب؟</h1>
        </div>
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 transition-all duration-300 ease-in-out">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* حقل الوجهة */}
            <div className="relative">
              <div className="absolute right-4 top-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="مثال: دبي، المالديف، تركيا..."
                required
                className="w-full bg-gray-50 dark:bg-gray-700 rounded-2xl px-12 py-4 text-right
                         text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 
                         focus:ring-blue-500 focus:outline-none transition-all"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>

            {/* الميزانية وعدد المسافرين */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                  الميزانية (ريال سعودي)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-right"
                  placeholder="أدخل الميزانية"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                  عدد المسافرين
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-right"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                />
              </div>
            </div>

            {/* تواريخ الرحلة */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-right"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl px-4 py-3 text-right"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
            </div>

            {/* نوع الرحلة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                نوع الرحلة
              </label>
              <div className="grid grid-cols-2 gap-4">
                {TRIP_TYPES.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => setFormData({ ...formData, tripType: type.id })}
                    className={`p-3 rounded-xl text-center transition-all
                              ${formData.tripType === type.id 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* زر التخطيط */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium
                       py-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  جاري إنشاء خطة الرحلة...
                </div>
              ) : (
                'تخطيط الرحلة'
              )}
            </button>
          </form>
        </div>
      </div>

      {tripPlan && <TripPlanDisplay plan={tripPlan} />}
    </div>
  );
};

export default TripForm; 