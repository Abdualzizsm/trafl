'use client';

interface LocationCardProps {
  item: {
    name: string;
    rating: number;
    price: number;
    features?: string[];
    location: string;
    image?: string;
    cuisine?: string;
    priceRange?: string;
    specialDishes?: string[];
  };
  type: 'hotel' | 'restaurant';
}

export const LocationCard = ({ item, type }: LocationCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">{type === 'hotel' ? '🏨' : '🍽️'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.rating}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
            {item.location}
          </p>
          {type === 'hotel' ? (
            <p className="text-green-600 dark:text-green-400 font-medium mt-2">
              {item.price} ريال / ليلة
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {item.priceRange}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; 