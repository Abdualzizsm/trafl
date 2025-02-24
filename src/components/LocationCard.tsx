const LocationCard = ({ data }: { data: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">{data.name}</h5>
        <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          <span className="text-yellow-500">⭐</span>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {data.rating}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        {data.features?.map((feature: string, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-xs text-blue-600 dark:text-blue-400">✓</span>
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">{data.location}</div>
        <div className="text-lg font-bold text-green-600 dark:text-green-400">
          {data.price} ريال
        </div>
      </div>
    </div>
  );
}; 