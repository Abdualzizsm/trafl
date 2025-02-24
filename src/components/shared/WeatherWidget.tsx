'use client';

import { WEATHER_ICONS } from '@/config/constants';

interface WeatherWidgetProps {
  day: {
    weather?: {
      temp: number;
      condition: string;
      humidity: number;
    };
  };
}

export const WeatherWidget = ({ day }: WeatherWidgetProps) => {
  if (!day?.weather) return null;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-3 text-white">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{WEATHER_ICONS[day.weather.condition as keyof typeof WEATHER_ICONS]}</span>
        <span className="text-2xl font-bold">{day.weather.temp}°</span>
      </div>
      <div className="mt-2 text-sm">
        <p>الرطوبة: {day.weather.humidity}%</p>
      </div>
    </div>
  );
}; 