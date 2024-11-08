'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useOrder } from '@/hooks/use-order';

export const NavbarNav = () => {
  const pathname = usePathname();
  const { reset } = useOrder(state => state);

  React.useEffect(() => {
    return () => reset();
  }, []);

  return (
    <nav className="hidden sm:flex gap-x-4">
      <Link href="/" className={cn(pathname === '/' ? 'text-active' : 'hover:text-muted-foreground', 'flex items-center gap-x-1')}>
        Главная
      </Link>
      <Link href="/catalog" className={cn(pathname.startsWith('/catalog') ? 'text-active' : 'hover:text-muted-foreground')}>
        Каталог
      </Link>
    </nav>
  );
};
