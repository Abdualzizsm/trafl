'use client';

import React from 'react';
import { useDevice } from '@/hooks/useDevice';
import MobileHome from '@/components/mobile/MobileHome';
import DesktopHome from '@/components/desktop/DesktopHome2';

export default function Home() {
  const { isMobile } = useDevice();

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
