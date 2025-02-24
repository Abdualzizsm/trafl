import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
} 