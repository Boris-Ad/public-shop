'use client';

import { cn, shopBreadcrumb } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumbs = ({ productName }: { productName?: string }) => {
  const pathname = usePathname();
  const breadcrumbs = shopBreadcrumb(pathname, productName);

  return (
    <div className="h-10 md:min-h-14 container flex items-center">
      <ul className="sm:px-6 flex items-center text-xs md:text-sm text-face-primary">
        {breadcrumbs.map((breadcrumb, inx) => (
          <li key={inx} className="flex items-center sm:gap-x-1">
            <Link href={breadcrumb.path} className={cn('hover:underline', { 'text-face-secondary': breadcrumbs.length === inx + 1 })}>
              {breadcrumb.title}
            </Link>
            {breadcrumbs.length - 1 != inx && <ChevronRight size={16} />}
          </li>
        ))}
      </ul>
    </div>
  );
};
