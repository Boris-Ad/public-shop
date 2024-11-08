'use client';

import React from 'react';
import Image from 'next/image';
import { useOrder } from '@/hooks/use-order';
import { formatCurrency } from '@/lib/utils';

export const OrderList = () => {
  const { products } = useOrder(state => state);
  if (products.length === 0) return null;

  return (
    <ul className="md:hidden pt-1">
      {products.map(product => (
        <li key={product.id} className="h-[130px] py-2  border-t border-face-popover first:border-transparent flex space-x-2">
          <div className="h-full bg-face-card aspect-square relative">
            <Image src={product.imageUrl} alt={product.name} priority fill sizes="130px" className="w-[160px] h-auto object-contain" />
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <h2 className="line-clamp-1">{product.name}</h2>
            <h3 className="text-sm text-face-foreground/60">
              Количество: <span className="text-face-foreground">{product.amount}</span>
            </h3>
            <h3 className="text-sm text-face-foreground/60">
              Сумма: <span className="text-face-foreground">{formatCurrency(product.amount * product.price)}</span>
            </h3>
          </div>
        </li>
      ))}
    </ul>
  );
};
