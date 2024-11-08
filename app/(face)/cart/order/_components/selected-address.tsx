'use client';

import { useOrder } from '@/hooks/use-order';

export const SelectedAddress = () => {
  const { customerData } = useOrder(state => state);

  if (customerData == null) return null;

  return <p className="md:hidden line-clamp-2 pl-3 border-face-secondary border-l">{customerData?.customerAddress}</p>;
};
