'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export const Pagination = ({ productsCount }: { productsCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = React.useState(1);
  const pagesArr: number[] = [];
  const totalPages = Math.ceil(productsCount / 12);

  for (let x = 0; x < totalPages; x++) {
    pagesArr.push(x + 1);
  }

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    if (page === 1) {
      params.delete('page');
    }
    router.push(pathname + '?' + params);
  }, [page]);

  return (
    <ul className="container h-12 flex items-center space-x-4">
      {pagesArr.map(p => (
        <li key={p}>
          <button
            onClick={() => setPage(p)}
            className={cn('px-4 md:px-6 py-1 md:py-2 rounded-full', { 'hover:text-face-foreground/60': p != page }, { 'bg-face-primary': p === page })}
          >
            {p}
          </button>
        </li>
      ))}
      {pagesArr.length != page && (
        <li onClick={() => setPage(prev => prev + 1)} className="hover:text-face-foreground/60 cursor-pointer">Следующая страница</li>
      )}
      
    </ul>
  );
};
