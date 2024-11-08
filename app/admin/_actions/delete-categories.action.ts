'use server';

import fs from 'fs/promises';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteCategoriesAction = async (formData: FormData) => {
  const categoriesArr = Object.keys(Object.fromEntries(formData));

  categoriesArr.forEach(async categoryId => {
    await prisma.category.delete({ where: { id: categoryId }, select: { products: true } });
    await fs.rm('public/' + categoryId, { recursive: true });
  });
  revalidatePath('/admin/products');
  revalidatePath('/');
};
