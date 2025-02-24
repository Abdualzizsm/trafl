'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline, IoLocationOutline, IoCalendarOutline, IoPersonOutline } from 'react-icons/io5';

function DesktopHome() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8 rtl:space-x-reverse">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                رحلاتي
              </motion.h1>
              <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                {[
                  { href: '/', label: 'الرئيسية' },
                  { href: '/explore', label: 'استكشف' },
                  { href: '/offers', label: 'العروض' },
                  { href: '/about', label: 'عن رحلاتي' }
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                تسجيل الدخول
              </motion.button>
              <motion.button 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
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
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                اكتشف العالم بطريقة
                <span className="block text-blue-600 dark:text-blue-400">ذكية ومميزة</span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                نساعدك في تخطيط رحلتك المثالية باستخدام أحدث تقنيات الذكاء الاصطناعي. اكتشف وجهات جديدة، واحصل على خطط سفر مخصصة، واحجز بأفضل الأسعار.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4 md:col-span-1 relative">
                    <IoLocationOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="text"
                      className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 pr-10 text-right placeholder-gray-400 focus:ring-2 focus:ring-blue-500 border-none"
                      placeholder="إلى أين تريد السفر؟"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 relative">
                    <IoCalendarOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="date"
                      className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 pr-10 text-right border-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 relative">
                    <IoPersonOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <select
                      className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 pr-10 text-right border-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="1">مسافر واحد</option>
                      <option value="2">مسافران</option>
                      <option value="3">3 مسافرين</option>
                      <option value="4">4 مسافرين</option>
                      <option value="5+">5+ مسافرين</option>
                    </select>
                  </div>
                  <div className="col-span-4 md:col-span-1">
                    <button className="w-full bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <IoSearchOutline className="text-xl" />
                      <span>ابحث الآن</span>
                    </button>
                  </div>
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
    </div>
  );
}

export default DesktopHome;
