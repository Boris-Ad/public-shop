'use client';

import React from 'react';
import Image from 'next/image';
import { cn, formatCurrency } from '@/lib/utils';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useOrder } from '@/hooks/use-order';

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { setProduct } = useOrder(state => state);

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setProduct({ id: product.id, amount: 1, name: product.name, imageUrl: product.rootImagePath, price: product.price, number: product.number });
  };

  return (
    <>
      <div
        onClick={() => router.push('/catalog/' + product.id)}
        className="transition-colors bg-face-card shadow-xl md:bg-transparent md:shadow-none hover:md:bg-face-card hover:md:shadow-lg group cursor-pointer"
      >
        <div
          className="m-2 aspect-square relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] md:from-[#333A47] from-[#424e64]
         to-transparent from-0% to-70% group-hover:md:from-[#424e64]"
        >
          <Image src={product.rootImagePath} alt={product.name} priority fill sizes="50vw" className="object-contain" />
        </div>
        <div className="p-2 md:p-3 lg:p-4">
          <h3 className="mb-1 font-light text-face-muted/60 line-clamp-1">{product.name}</h3>
          <p className={cn('text-xs mb-1', product.available ? 'text-face-secondary' : 'text-destructive')}>
            {product.available ? 'Есть в наличии' : 'Нет в наличии'}
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="md:text-lg lg:text-xl mb-2 md:m-0">{formatCurrency(product.price)}</h3>
            {product.available && (
              <button
                onClick={addToCart}
                className="px-5 py-1.5 md:py-2 h-full bg-face-primary rounded-full text-sm md:text-base hover:bg-face-primary/80 active:bg-face-primary
                         md:opacity-0 group-hover:md:opacity-100 transition-opacity"
              >
                В корзину
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
