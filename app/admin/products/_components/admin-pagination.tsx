'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminPagination = ({ productsCount }: { productsCount: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [page, setPage] = React.useState(1);

  const countOnPage = searchParams.get('take');
  const take = countOnPage == null ? 10 : parseInt(countOnPage);
  const totalPages = Math.ceil(productsCount / take);

  const pagesArr: number[] = [];

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

  if (totalPages === 1 || productsCount === 0) return null;

  return (
    <Pagination className="my-3 select-none">
      <PaginationContent>
        <PaginationItem>
          <Button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className="flex items-center gap-x-2" variant="outline">
            <ChevronLeft size={18} />
            Назад
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className={cn('flex items-center gap-x-2', { 'text-face-secondary': page === 1 })}
            variant="outline"
          >
            1
          </Button>
        </PaginationItem>
        {totalPages > 2 && page < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>{countOnPage}</PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button
            disabled={totalPages === page}
            onClick={() => setPage(totalPages)}
            className={cn('flex items-center gap-x-2', { 'text-face-secondary': totalPages === page })}
            variant="outline"
          >
            {totalPages}
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button onClick={() => setPage(prev => prev + 1)} disabled={totalPages === page} className="flex items-center gap-x-2" variant="outline">
            Вперед
            <ChevronRight size="18" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
