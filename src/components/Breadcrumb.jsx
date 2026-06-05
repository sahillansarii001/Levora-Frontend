'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(p => p);
  
  return (
    <div className="bg-[var(--color-navy)] py-3 px-4 border-t border-slate-800">
      <div className="container mx-auto">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
          </li>
          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const title = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            return (
              <li key={path} className="flex items-center gap-2">
                <ChevronRight size={14} className="text-slate-600" />
                {isLast ? (
                  <span className="text-slate-200 font-medium">{title}</span>
                ) : (
                  <span className="text-slate-400 capitalize">{title}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
