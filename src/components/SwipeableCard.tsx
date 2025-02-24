'use client';

import { motion, useAnimation } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface SwipeableCardProps {
  title: string;
  image: string;
  price: string;
  rating: number;
  location: string;
  onSwipe?: (direction: 'left' | 'right') => void;
}

export default function SwipeableCard({
  title,
  image,
  price,
  rating,
  location,
  onSwipe
}: SwipeableCardProps) {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const bind = useGesture({
    onDrag: ({ movement: [x], direction: [xDir], down }) => {
      setIsDragging(down);
      controls.start({
        x: down ? x : 0,
        rotate: down ? x * 0.03 : 0,
        scale: down ? 1.05 : 1
      });

      if (!down && Math.abs(x) > 100) {
        onSwipe?.(x > 0 ? 'right' : 'left');
        controls.start({ x: x > 0 ? 500 : -500, transition: { duration: 0.5 } });
      }
    }
  });

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
      animate={controls}
      whileTap={{ scale: 0.95 }}
      {...bind()}
      style={{ touchAction: 'none' }}
    >
      <div className="relative h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {price}
          </p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
          >
            احجز الآن
          </motion.button>
        </div>
      </div>

      {isDragging && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4">
            <span className="text-2xl">
              {controls.get()?.x > 50 ? '❤️' : controls.get()?.x < -50 ? '✖️' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
