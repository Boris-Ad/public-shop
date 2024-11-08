'use server';

import fs from 'fs/promises';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteProductAction = async (id: string) => {
  const product = await prisma.product.delete({ where: { id } });

  await fs.unlink('public/' + product.rootImagePath);

  if (product.firstImagePath) {
    await fs.unlink('public/' + product.firstImagePath);
  }
  if (product.secondImagePath) {
    await fs.unlink('public/' + product.secondImagePath);
  }

  revalidatePath('/admin/products');
  revalidatePath('/');
};
