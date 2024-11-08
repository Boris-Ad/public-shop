'use client';

import { useOrder } from '@/hooks/use-order';
import { formatCurrency, numWord } from '@/lib/utils';

export const AddOrder = ({ children }: { children: React.ReactNode }) => {
  const { products } = useOrder(state => state);
  if(products.length === 0) return null
  
  const { price, quantity } = products.reduce(
    (sum, item): { price: number; quantity: number } => {
      sum.quantity = item.amount + sum.quantity;
      sum.price = sum.price + item.amount * item.price;
      return sum;
    },
    { price: 0, quantity: 0 }
  );

  return (
    <div className="h-40 p-4 bg-face-card shadow-lg select-none flex flex-col justify-between">
      <div className="space-y-2">
        <p className="text-face-muted">
          Итого: {quantity} {numWord(quantity, ['товар', 'товара', 'товаров'])}
        </p>
        <h3 className="text-xl">{formatCurrency(price)}</h3>
      </div>
      {children}
    </div>
  );
};
