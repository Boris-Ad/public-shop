'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-x-4">
      <Link href="/admin" className={cn(pathname === '/admin' ? 'text-active' : 'hover:text-muted-foreground', 'flex items-center gap-x-1')}>
        Главная
      </Link>
      <Link href="/admin/products" className={cn(pathname.startsWith('/admin/products') ? 'text-active' : 'hover:text-muted-foreground')}>
        Продукты
      </Link>
      <Link href="/admin/orders" className={cn(pathname.startsWith('/admin/orders') ? 'text-active' : 'hover:text-muted-foreground')}>
        Заказы
      </Link>
      <Link href="/admin/customers" className={cn(pathname.startsWith('/admin/customers') ? 'text-active' : 'hover:text-muted-foreground')}>
        Клиенты
      </Link>
    </nav>
  );
};
