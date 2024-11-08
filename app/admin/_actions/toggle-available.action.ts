'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const toggleAvailableAction = async (productId: string, available: boolean) => {
  await prisma.product.update({ where: { id: productId }, data: { available } });

  revalidatePath('/');
  revalidatePath('/admin/products');
};
