'use client';

import React from 'react';
import { useOrder } from '@/hooks/use-order';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';


export const CartList = () => {
const { products, changeAmount, deleteProduct } = useOrder(state => state);

if(products.length === 0) return null

  return (
    <ul className="">
      {products.map(product => (
        <li key={product.id} className="h-[160px] py-2 md:py-4 border-b border-face-popover last:border-transparent first:mt-0 flex space-x-2">
          <div className="h-full bg-face-card aspect-square relative">
            <Image src={product.imageUrl} alt={product.name} priority fill sizes="130px" className="w-[130px] h-auto object-contain" />
          </div>

          <div className="w-full flex flex-col justify-between md:flex-row space-y-2">
            <h2 className="line-clamp-1 md:flex-1">{product.name}</h2>

            <div className="hidden md:block self-center">
              <p>{formatCurrency(product.price)}</p>
              <p className="text-sm text-face-muted-foreground">Цена за 1 шт.</p>
            </div>

            <div className="w-24 h-8 md:mx-8 md:w-36 md:h-10 flex justify-between items-center px-2 md:px-3 self-center rounded-full bg-face-card">
              <button onClick={() => product.amount > 1 && changeAmount(product.id, product.amount - 1)}>
                <Minus size={20} />
              </button>
              <p>{product.amount}</p>
              <button onClick={() => product.amount < product.number && changeAmount(product.id, product.amount + 1)}>
                <Plus size={20} />
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className="w-20 self-center">{formatCurrency(product.price * product.amount)}</h3>

              <button onClick={() => deleteProduct(product.id)} className="self-center">
                <Trash2 className="text-destructive/70" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
