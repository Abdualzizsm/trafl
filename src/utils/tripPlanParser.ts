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

export const parseTripPlan = (plan: string): ParsedTripPlan => {
  // تحسين التقسيم والمعالجة
  const sections = plan.split('##').filter(Boolean);
  
  // معالجة الأيام
  const days = sections
    .find(s => s.includes('الجدول اليومي'))
    ?.split('اليوم')
    .filter(Boolean)
    .map(parseDay) || [];

  // معالجة الفنادق
  const hotels = sections
    .find(s => s.includes('أماكن الإقامة'))
    ?.split('\n')
    .filter(line => line.includes('🏨'))
    .map(parseHotel) || [];

  // معالجة المطاعم
  const restaurants = sections
    .find(s => s.includes('المطاعم'))
    ?.split('\n')
    .filter(line => line.includes('🍽'))
    .map(parseRestaurant) || [];

  // معالجة التكاليف
  const costs = sections
    .find(s => s.includes('التكاليف'))
    ?.split('\n')
    .filter(line => line.includes('ريال'))
    .map(parseCost) || [];

  return {
    days,
    hotels,
    restaurants,
    costs,
    summary: {
      totalDays: days.length,
      totalCost: costs.reduce((sum, cost) => sum + cost.amount, 0),
      destination: extractDestination(plan)
    }
  };
};

// دوال المساعدة للتحليل
const parseDay = (dayContent: string): Day => {
  // تنفيذ التحليل المفصل لليوم
  // ...
};

const parseHotel = (hotelLine: string): Hotel => {
  // تحليل معلومات الفندق
  // ...
};

const parseRestaurant = (restaurantLine: string): Restaurant => {
  // تحليل معلومات المطعم
  // ...
};

const parseCost = (costLine: string): Cost => {
  // تحليل معلومات التكلفة
  // ...
};

const extractDestination = (plan: string): string => {
  // استخراج الوجهة من الخطة
  // ...
}; 