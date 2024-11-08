'use client';

import { useOrder } from '@/hooks/use-order';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';

export const OrderTable = () => {
  const { products } = useOrder(state => state);
  if(products.length === 0) return null
  return (
    <div className="hidden md:table w-full">
      <div className="table-header-group">
        <div className="h-12 table-row  text-muted-shop_foreground">
          <div className="align-middle border-b border-face-popover table-cell text-left">Наименование</div>
          <div className="align-middle border-b border-face-popover table-cell text-left">Количество</div>
          <div className="align-middle border-b border-face-popover table-cell text-left">Сумма</div>
        </div>
      </div>
      <div className="table-row-group">
        {products.map((product, inx) => (
          <div key={product.id} className="table-row">
            <div className="table-cell align-middle py-2 border-b border-face-popover">
              <div className="flex items-start space-x-3">
                <p>{inx + 1}.</p>
                <Image src={product.imageUrl} alt={product.name} width={130} height={130} className="w-[130px] h-auto aspect-square object-contain" />
                <p>{product.name}</p>
              </div>
            </div>
            <div className="table-cell pt-3 border-b border-face-popover">
              <p>{product.amount} шт.</p>
            </div>
            <div className="table-cell pt-3 border-b border-face-popover">
              <p>{formatCurrency(product.price * product.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
