'use client';

interface CostBreakdownProps {
  costs: Array<{
    category: string;
    amount: number;
    details?: string[];
  }>;
}

export const CostBreakdown = ({ costs }: CostBreakdownProps) => {
  const total = costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div className="space-y-4">
      {costs.map((cost, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span>{getCategoryIcon(cost.category)}</span>
              <span className="text-gray-700 dark:text-gray-300">{cost.category}</span>
            </div>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {cost.amount.toLocaleString('ar-SA')} ريال
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(cost.amount / total) * 100}%` }}
            />
          </div>
          {cost.details && cost.details.length > 0 && (
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              <ul className="list-disc list-inside space-y-1">
                {cost.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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