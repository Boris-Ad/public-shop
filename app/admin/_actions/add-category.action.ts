'use server';

import prisma from '@/lib/db';
import { addCategorySchema } from '@/lib/zod-schemas';
import { revalidatePath } from 'next/cache';

export const addCategoryAction = async (_prevState: unknown, formData: FormData): Promise<{ category?: string[] | undefined; success?: string }> => {
  const validatedField = addCategorySchema.safeParse(Object.fromEntries(formData));

  if (validatedField.success === false) {
    return validatedField.error.formErrors.fieldErrors;
  }

  const { category } = validatedField.data;

  const existCategory = await prisma.category.findFirst({ where: { name: category } });

  if (existCategory != null) {
    return { category: ['Эта категория уже существует!'] };
  }

  await prisma.category.create({ data: { name: category }, select: { id: true } });

  revalidatePath('/admin/products/new');
  return { success: 'Категория создана!' };
};
