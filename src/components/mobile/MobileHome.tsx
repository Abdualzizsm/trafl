'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { IoAirplaneOutline, IoMapOutline, IoCalendarOutline, IoHomeOutline, IoSearchOutline, IoPersonOutline, IoMenuOutline, IoNotificationsOutline } from 'react-icons/io5';

export default function MobileHome() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', icon: IoHomeOutline, label: 'الرئيسية' },
    { id: 'trips', icon: IoAirplaneOutline, label: 'رحلاتي' },
    { id: 'explore', icon: IoMapOutline, label: 'استكشف' },
    { id: 'calendar', icon: IoCalendarOutline, label: 'التقويم' },
  ];

  const handlePlanTrip = async () => {
    if (!prompt.trim()) {
      alert('الرجاء إدخال تفاصيل الرحلة');
      return;
    }
    setIsLoading(true);
    try {
      // هنا سيتم إضافة منطق التخطيط للرحلة
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('تخطيط الرحلة:', prompt);
    } catch (error) {
      console.error('حدث خطأ:', error);
      alert('عذراً، حدث خطأ أثناء تخطيط الرحلة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 relative pb-20">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center">
            <IoMenuOutline className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </motion.button>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center">
              <IoNotificationsOutline className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
              <IoPersonOutline className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </motion.button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 bg-gradient-to-b from-blue-500 to-blue-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2">
          مرحباً بك 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-blue-100">
          إلى أين تريد السفر اليوم؟
        </motion.p>
      </div>
          
      
      <div className="px-4 -mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
          <textarea
            className="w-full px-4 py-3 rounded-xl text-right bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-sm"
            placeholder="يرجى إدخال تفاصيل رحلتك (المدة، عدد المسافرين، الوجهة، الاهتمامات...)"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePlanTrip}
            disabled={isLoading}
            className={`mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <span>جاري التخطيط...</span>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </>
            ) : (
              <>
                <span>خطط رحلتي</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>



      <section className="mt-6 px-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">استكشف الوجهات</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'دبي', image: '/dubai.jpg', price: '2,500' },
            { title: 'القاهرة', image: '/cairo.jpg', price: '1,800' },
            { title: 'اسطنبول', image: '/istanbul.jpg', price: '2,200' },
            { title: 'الرياض', image: '/riyadh.jpg', price: '1,500' }
          ].map((destination, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-md aspect-[4/5]">
              <Image
                src={destination.image}
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{destination.title}</h3>
                  <p className="text-sm opacity-90">يبدأ من {destination.price} ريال</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-8 px-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">الخدمات السريعة</h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: IoAirplaneOutline, label: 'طيران', color: 'bg-blue-500' },
            { icon: IoMapOutline, label: 'فنادق', color: 'bg-purple-500' },
            { icon: IoCalendarOutline, label: 'برامج', color: 'bg-pink-500' },
            { icon: IoSearchOutline, label: 'المزيد', color: 'bg-orange-500' }
          ].map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-2">
                <span className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center text-white`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{service.label}</span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 px-4 mb-24">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">العروض المميزة</h2>
        <div className="space-y-4">
          {[
            { title: 'باريس الساحرة', image: '/paris.jpg', days: 7, price: '7,500', rating: 4.8 },
            { title: 'جزر المالديف', image: '/maldives.jpg', days: 5, price: '8,900', rating: 4.9 },
            { title: 'لندن التاريخية', image: '/london.jpg', days: 6, price: '6,800', rating: 4.7 }
          ].map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
              <div className="relative h-48">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-900 dark:text-white">
                  {offer.days} أيام
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{offer.title}</h3>
                  <div className="flex items-center text-sm text-yellow-500">
                    <span>⭐</span>
                    <span className="ml-1 text-gray-700 dark:text-gray-300">{offer.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{offer.price} ريال</span>
                  <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-6 backdrop-blur-xl bg-opacity-90 shadow-lg">
        <div className="flex justify-around items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
