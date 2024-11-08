'use server';

import fs from 'fs/promises';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import sharp from 'sharp';
import { updateProductSchema } from '@/lib/zod-schemas';

type ActionResponse = {
  categoryId?: string[] | undefined;
  name?: string[] | undefined;
  number?: string[] | undefined;
  price?: string[] | undefined;
  rootImage?: string[] | undefined;
  firstImage?: string[] | undefined;
  secondImage?: string[] | undefined;
  success?: string | undefined;
};

export const updateProductAction = async (
  value: { productId: string; imagesForDelete: { first: boolean; second: boolean } },
  _prevState: unknown,
  formData: FormData
): Promise<ActionResponse> => {
  const validatedFields = updateProductSchema.safeParse(Object.fromEntries(formData));
  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }
  const data = validatedFields.data;
  const product = await prisma.product.findUnique({ where: { id: value.productId } });

  if (product == null) notFound();

  let rootImagePath = product.rootImagePath;
  let firstImagePath = product.firstImagePath;
  let secondImagePath = product.secondImagePath;

  await fs.access('public/' + data.categoryId).catch(() => notFound());

  if (data.rootImage && data.rootImage.size > 0) {
    await fs.unlink('public/' + product.categoryId + '/' + rootImagePath);
    rootImagePath = '/' + product.categoryId + '/' + crypto.randomUUID() + '.webp';
    const buffer = Buffer.from(await data.rootImage.arrayBuffer());
    const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
    await fs.writeFile('public' + rootImagePath, convertToWebp);
  }

  if (data.firstImage && data.firstImage.size > 0) {
    if (firstImagePath != null) {
      await fs.unlink('public/' + product.categoryId + '/' + firstImagePath);
    }
    firstImagePath = '/' + product.categoryId + '/' + crypto.randomUUID() + '.webp';
    const buffer = Buffer.from(await data.firstImage.arrayBuffer());
    const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
    await fs.writeFile('public' + firstImagePath, convertToWebp);
  } else if (value.imagesForDelete.first) {
    if (firstImagePath != null) {
      await fs.unlink('public' + firstImagePath);
      firstImagePath = null;
    }
  }

  if (data.secondImage && data.secondImage.size > 0) {
    if (secondImagePath != null) {
      await fs.unlink('public/' + product.categoryId + '/' + secondImagePath);
    }
    secondImagePath = '/' + product.categoryId + '/' + crypto.randomUUID() + '.webp';
    const buffer = Buffer.from(await data.secondImage.arrayBuffer());
    const convertToWebp = await sharp(buffer).resize(600).webp().toBuffer();
    await fs.writeFile('public' + secondImagePath, convertToWebp);
  } else if (value.imagesForDelete.second) {
    if (secondImagePath != null) {
      await fs.unlink('public' + secondImagePath);
      secondImagePath = null;
    }
  }

  await prisma.product.update({
    where: { id: value.productId },
    data: {
      name: data.name,
      number: data.number,
      price: data.price,
      categoryId: data.categoryId,
      rootImagePath,
      firstImagePath,
      secondImagePath,
    },
  });

  revalidatePath('/admin/products/' + value.productId + '/edit');
  revalidatePath('/admin/products');
  return { success: 'Продукт ' + data.name + ' обновлен!' };
};
