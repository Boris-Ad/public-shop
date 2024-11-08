'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React from 'react';
import { toggleAvailableAction } from '../../_actions/toggle-available.action';

export const ToggleAvailable = ({ productId, available }: { productId: string; available: boolean }) => {
  const [isPending, startTransition] = React.useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await toggleAvailableAction(productId, available);
    });
  };
  return (
    <DropdownMenuItem onClick={handleClick} disabled={isPending}>
      {available ? 'Выставить на продажу' : 'Снять с продажи'}
    </DropdownMenuItem>
  );
};
