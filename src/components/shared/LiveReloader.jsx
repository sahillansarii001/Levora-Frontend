'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveReloader() {
  const router = useRouter();

  useEffect(() => {
    // Poll every 3 seconds to seamlessly refresh Server Components without a hard page reload
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
