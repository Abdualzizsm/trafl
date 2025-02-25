'use client';

import { Suspense } from 'react';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>}>
      <SearchContent />
    </Suspense>
  );
}
