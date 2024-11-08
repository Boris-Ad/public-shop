'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { deleteProductAction } from '../../_actions/delete-product.action';

export const DeleteProduct = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      className="text-destructive focus:text-destructive"
      onClick={() => {
        startTransition(async () => {
          deleteProductAction(id);
        });
      }}
    >
      Удалить
    </DropdownMenuItem>
  );
};
