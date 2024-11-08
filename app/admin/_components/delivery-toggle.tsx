'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toggleDeliveryAction } from '../_actions/toggle-delivery.action';

export const DeliveryToggle = ({ orderId, delivered }: { orderId: string; delivered: boolean }) => {
  return <DropdownMenuItem onClick={() => toggleDeliveryAction(orderId, !delivered)}>{delivered ? 'Не доставлено' : 'Доставлено'}</DropdownMenuItem>;
};
