'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 600); // Adjust duration to match animation timing

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-[3px] w-full overflow-hidden transition-opacity duration-300 ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full w-full animate-loading-bar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_100%]" />
    </div>
  );
}