'use server';

import fs from 'fs/promises';
import sharp from 'sharp';
import prisma from '@/lib/db';
import { addProductSchema } from '@/lib/zod-schemas';
import { revalidatePath } from 'next/cache';

interface ActionResponse {
  categoryId?: string[] | undefined;
  name?: string[] | undefined;
  number?: string[] | undefined;
  price?: string[] | undefined;
  rootImage?: string[] | undefined;
  firstImage?: string[] | undefined;
  secondImage?: string[] | undefined;
  success?: string | undefined;
}

export const addProductAction = async (_prevState: unknown, formData: FormData): Promise<ActionResponse> => {
  const validatedField = addProductSchema.safeParse(Object.fromEntries(formData));

  if (validatedField.success === false) {
    return validatedField.error.formErrors.fieldErrors;
  }

  const data = validatedField.data;

  const response = await prisma.category.findUnique({ where: { id: data.categoryId }, select: { products: true } });

  if (response != null) {
    const checkAvailability = response.products.findIndex(product => product.name === data.name);
    if (checkAvailability >= 0) {
      return { name: ['Продукт с таким именем уже есть!'] };
    }
  }

  let firstImagePath;
  let secondImagePath;

  await fs.mkdir('public/' + data.categoryId, { recursive: true });

  const rootImagePath = '/' + data.categoryId + '/' + crypto.randomUUID() + '.webp';
  const buffer = Buffer.from(await data.rootImage.arrayBuffer());
  const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
  await fs.writeFile('public' + rootImagePath, convertToWebp);

  if (data.firstImage && data.firstImage.size > 0) {
    firstImagePath = '/' + data.categoryId + '/' + crypto.randomUUID() + '.webp';
    const buffer = Buffer.from(await data.firstImage.arrayBuffer());
    const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
    await fs.writeFile('public' + firstImagePath, convertToWebp);
  }

  if (data.secondImage && data.secondImage.size > 0) {
    secondImagePath = '/' + data.categoryId + '/' + crypto.randomUUID() + '.webp';
    const buffer = Buffer.from(await data.secondImage.arrayBuffer());
    const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
    await fs.writeFile('public' + secondImagePath, convertToWebp);
  }

  await prisma.product.create({
    data: {
      name: data.name,
      number: data.number,
      price: data.price,
      rootImagePath,
      firstImagePath,
      secondImagePath,
      categoryId: data.categoryId,
    },
  });

  revalidatePath('/admin/products');
  return { success: 'Продукт ' + data.name + ' создан!' };
};
