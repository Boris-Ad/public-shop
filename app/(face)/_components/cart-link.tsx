'use client';

import { useOrder } from '@/hooks/use-order';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export const CartLink = () => {
  const { products } = useOrder(state => state);
  if (products.length === 0) return null;
  return (
    <Link href={'/cart'} className="py-1 border-red-500 border-b-2">
      <ShoppingBag size={24} />
    </Link>
  );
};
