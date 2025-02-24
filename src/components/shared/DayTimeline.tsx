'use client';

import { ACTIVITY_TYPES } from '@/config/constants';

interface DayTimelineProps {
  day: {
    activities: Array<{
      time: string;
      content: string;
      cost: string;
      type: 'morning' | 'afternoon' | 'evening';
      location?: string;
      duration?: string;
    }>;
  };
}

export const DayTimeline = ({ day }: DayTimelineProps) => {
  if (!day?.activities?.length) return null;

  return (
    <div className="space-y-4">
      {day.activities.map((activity, idx) => (
        <div key={idx} className="relative flex gap-4 pb-8">
          {/* خط الزمن */}
          <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900" />
          
          {/* النشاط */}
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 z-10">
              <span className="text-xl">{ACTIVITY_TYPES[activity.type].icon}</span>
            </div>
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                <p className="mt-1">{activity.content}</p>
                {activity.location && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    📍 {activity.location}
                  </p>
                )}
                {activity.duration && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ⏱️ {activity.duration}
                  </p>
                )}
                {activity.cost && (
                  <div className="mt-2 inline-block px-3 py-1 bg-green-50 dark:bg-green-900/30 
                                text-green-600 dark:text-green-400 rounded-full text-sm">
                    {activity.cost}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 