'use client';

import { numWord } from '@/lib/utils';
import { useOrder } from '@/hooks/use-order';
import { PageTitle } from '../../_components/page-title';

export const CartHeader = () => {
  const { products } = useOrder(state => state);
  return (
    <div className="mb-2 md:mb-8 relative inline-block">
      <span className="text-sm text-face-muted-foreground absolute -end-2 translate-x-full whitespace-nowrap">
        {products.length} {numWord(products.length, ['наименование', 'наименования', 'наименований'])}
      </span>
      <PageTitle>Корзина</PageTitle>
    </div>
  );
};
