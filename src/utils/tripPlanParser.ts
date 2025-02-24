interface Activity {
  time: string;
  content: string;
  cost: string;
  type: 'morning' | 'afternoon' | 'evening';
  location?: string;
  duration?: string;
  image?: string;
}

interface Hotel {
  name: string;
  rating: number;
  price: number;
  features: string[];
  location: string;
  image?: string;
}

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  price: number;
  rating: number;
  specialDishes: string[];
  location: string;
  image?: string;
}

interface Cost {
  category: string;
  amount: number;
  details?: string[];
}

interface Day {
  number: string;
  activities: Activity[];
  weather?: {
    temp: number;
    condition: string;
    humidity: number;
  };
  tips?: string[];
}

interface ParsedTripPlan {
  days: Day[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  costs: Cost[];
  summary: {
    totalDays: number;
    totalCost: number;
    destination: string;
    startDate?: string;
    endDate?: string;
  };
}

import { TripPlanResponse } from '@/services/gemini';

export const parseTripPlan = (plan: TripPlanResponse): ParsedTripPlan => {
  // معالجة الأيام من TripPlanResponse
  const days = plan.tripPlan.dayPlans.map(dayPlan => ({
    number: dayPlan.date,
    activities: dayPlan.activities.map(activity => ({
      time: activity.time,
      content: activity.description,
      cost: activity.cost.toString(),
      type: (activity.type === 'طعام' ? 'morning' : activity.type === 'سياحة' ? 'afternoon' : 'evening') as 'morning' | 'afternoon' | 'evening',
      location: activity.title
    })),
    weather: {
      temp: 25, // قيم افتراضية للطقس
      condition: 'مشمس',
      humidity: 50
    }
  }));

  // إنشاء قائمة فنادق ومطاعم افتراضية
  const hotels: Hotel[] = [];
  const restaurants: Restaurant[] = [];

  // إنشاء قائمة تكاليف
  const costs: Cost[] = [{
    category: 'الميزانية الإجمالية',
    amount: plan.tripPlan.totalBudget,
    details: plan.tripPlan.recommendations
  }];

  return {
    days,
    hotels,
    restaurants,
    costs,
    summary: {
      totalDays: plan.tripPlan.dayPlans.length,
      totalCost: plan.tripPlan.totalBudget,
      destination: plan.tripPlan.summary.split('\n')[0] || 'وجهة غير محددة'
    }
  };
};

 