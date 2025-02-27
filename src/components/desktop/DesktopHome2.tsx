'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoSearchOutline, IoLocationOutline, IoCalendarOutline, IoPersonOutline } from 'react-icons/io5';
import dynamic from 'next/dynamic';

const BottomNavigation = dynamic(() => import('../BottomNavigation'), { ssr: false });

export default function DesktopHome2() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    travelers: '1',
    tripPurpose: 'سياحة',
    budget: '2000-5000',
    duration: '3',
    preferences: [] as string[]
  });

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      // تحقق من وجود وجهة السفر على الأقل
      if (!searchParams.destination.trim()) {
        alert('الرجاء إدخال وجهة السفر');
        return;
      }

    // تحويل البيانات إلى معلمات URL
    const queryParams = new URLSearchParams({
      destination: searchParams.destination,
      date: searchParams.date || new Date().toISOString().split('T')[0],
      travelers: searchParams.travelers,
      tripPurpose: searchParams.tripPurpose,
      budget: searchParams.budget,
      duration: searchParams.duration
    }).toString();

    // الانتقال إلى صفحة النتائج
    await router.push(`/search?${queryParams}`);
    } catch (error) {
      console.error('Error during search:', error);
      alert('حدث خطأ أثناء البحث');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  رحلاتي
                </h1>
              </motion.div>
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                {[
                  { href: '/', label: 'الرئيسية', icon: '🏠' },
                  { href: '/explore', label: 'استكشف', icon: '🌎' },
                  { href: '/offers', label: 'العروض', icon: '🎁' },
                  { href: '/about', label: 'عن رحلاتي', icon: 'ℹ️' }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={link.href} 
                      className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
              >
                تسجيل الدخول
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                إنشاء حساب
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight"
              >
                اكتشف العالم بطريقة
                <span className="block text-blue-600 dark:text-blue-400">ذكية ومميزة</span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed"
              >
                نساعدك في تخطيط رحلتك المثالية باستخدام أحدث تقنيات الذكاء الاصطناعي. اكتشف وجهات جديدة، واحصل على خطط سفر مخصصة، واحجز بأفضل الأسعار.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="space-y-4">
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                    <IoSearchOutline className="text-blue-500" />
                    ابحث عن رحلتك المثالية
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">الوجهة</label>
                      <div className="relative">
                        <IoLocationOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors text-xl" />
                        <input
                          type="text"
                          dir="rtl"
                          value={searchParams.destination}
                          onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-700/70 rounded-xl p-3 pr-10 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 border border-gray-200 dark:border-gray-600 transition-all focus:border-blue-500"
                          placeholder="إلى أين تريد السفر؟"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">تاريخ السفر</label>
                      <div className="relative">
                        <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors text-xl" />
                        <input
                          type="date"
                          dir="rtl"
                          value={searchParams.date}
                          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-700/70 rounded-xl p-3 pr-10 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">عدد المسافرين</label>
                      <div className="relative">
                        <IoPersonOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors text-xl" />
                        <select
                          dir="rtl"
                          value={searchParams.travelers}
                          onChange={(e) => setSearchParams({ ...searchParams, travelers: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-700/70 rounded-xl p-3 pr-10 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                        >
                          <option value="1">1 مسافر</option>
                          <option value="2">2 مسافر</option>
                          <option value="3">3 مسافر</option>
                          <option value="4">4 مسافر</option>
                          <option value="5+">5+ مسافر</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">مدة الرحلة (أيام)</label>
                      <div className="relative">
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 group-hover:text-blue-600 transition-colors text-xl">🕒</span>
                        <select
                          dir="rtl"
                          value={searchParams.duration}
                          onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
                          className="w-full bg-gray-50 dark:bg-gray-700/70 rounded-xl p-3 pr-10 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                        >
                          <option value="1">يوم واحد</option>
                          <option value="2">يومان</option>
                          <option value="3">3 أيام</option>
                          <option value="4">4 أيام</option>
                          <option value="5">5 أيام</option>
                          <option value="7">أسبوع</option>
                          <option value="14">أسبوعان</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 px-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري البحث...
                      </>
                    ) : (
                      <>
                        <IoSearchOutline className="text-xl" />
                        ابحث الآن
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/hero-image.jpg"
                alt="رحلات مميزة"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 right-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">اكتشف دبي</h3>
                <p className="text-white/90">رحلة مميزة تبدأ من 2,500 ريال</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              لماذا تختار <span className="text-blue-600 dark:text-blue-400">رحلاتي</span>؟
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              نقدم لك تجربة سفر فريدة تجمع بين التكنولوجيا المتطورة والخدمة الشخصية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✈️',
                title: 'حجز سهل وسريع',
                description: 'احجز رحلتك في دقائق معدودة مع واجهة سهلة الاستخدام وخيارات دفع متعددة'
              },
              {
                icon: '🤖',
                title: 'تخطيط ذكي',
                description: 'نستخدم الذكاء الاصطناعي لتقديم توصيات مخصصة تناسب تفضيلاتك واهتماماتك'
              },
              {
                icon: '💰',
                title: 'أفضل الأسعار',
                description: 'نضمن لك أفضل الأسعار مع خيارات متنوعة تناسب جميع الميزانيات'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              اكتشف المزيد عن خدماتنا
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      {/* Bottom Navigation for Mobile */}
      <div className="block lg:hidden">
        <BottomNavigation />
      </div>
    </main>
  );
}
