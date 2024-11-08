'use client';

import React from 'react';
import { useOrder } from '@/hooks/use-order';
import { Product } from '@prisma/client';
import { Minus, Plus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const ProductAddingInCart = ({ product }: { product: Product }) => {
  const [count, setCount] = React.useState(1);
  const { setProduct } = useOrder(state => state);

  const addProductInOrder = () => {
    setProduct({ id: product.id, name: product.name, amount: count, price: product.price, imageUrl: product.rootImagePath, number: product.number });
  };
  return (
    <div className="space-y-6 ">
      <p className="">Количество: {product.number}</p>
      <div className="grid grid-cols-2 gap-x-3 select-none">
        <div className="px-3 md:px-6 flex justify-between items-center bg-face-card rounded-full">
          <button onClick={() => setCount(prev => (prev - 1 === 0 ? prev : prev - 1))}>
            <Minus size={20} className="cursor-pointer hover:text-gray-400 active:text-white transition-colors" />
          </button>
          <span>{count}</span>
          <button onClick={() => setCount(prev => (prev === product.number ? prev : prev + 1))}>
            <Plus size={20} className="hover:text-gray-400 active:text-white transition-colors" />
          </button>
        </div>
        <button onClick={addProductInOrder} className="p-2 bg-face-primary hover:bg-face-primary/80 rounded-full">
          В корзину
        </button>
      </div>
      <div className="h-8 border-t border-face-popover">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-face-popover">
            <AccordionTrigger className="focus:no-underline hover:no-underline">Описание:</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe corporis, molestias corrupti ab quas ad voluptas. Quas dignissimos, fugit ea
              debitis dicta eos. Quia eaque a, quasi numquam harum repudiandae? Recusandae, magnam perferendis quo rem doloremque delectus exercitationem sequi
              suscipit itaque perspiciatis eius aspernatur quam cum quod explicabo sunt cupiditate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-face-popover">
            <AccordionTrigger className="focus:no-underline hover:no-underline">Характеристики:</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe corporis, molestias corrupti ab quas ad voluptas. Quas dignissimos, fugit ea
              debitis dicta eos. Quia eaque a, quasi numquam harum repudiandae? Recusandae, magnam perferendis quo rem doloremque delectus exercitationem sequi
              suscipit itaque perspiciatis eius aspernatur quam cum quod explicabo sunt cupiditate.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
