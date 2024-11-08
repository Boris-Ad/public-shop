'use server';

import prisma from '@/lib/db';
import { IProduct, IYResponse } from '@/my-types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { orderDataSchema } from '@/lib/zod-schemas';



export const orderAction = async ({ products, userId }: { products: IProduct[]; userId: string }, _prevState: unknown, formData: FormData) => {
  const validatedField = orderDataSchema.safeParse(Object.fromEntries(formData));

  if (validatedField.success === false) {
    return validatedField.error.formErrors.fieldErrors;
  }

  const data = validatedField.data;

  const amount = products.reduce((sum, product) => sum + product.amount * product.price, 0);

  const payData = await yPay(amount);
  if (!payData) return {};

  const info = JSON.stringify({
    name: data.name,
    phone: data.phone,
    address: data.address,
    price: amount,
    products,
  });

  try {
    products.map(async product => await prisma.product.update({ where: { id: product.id }, data: { number: { decrement: product.amount } } }));

    await prisma.order.create({
      data: { payment_id: payData.id, name: data.name, phone: data.phone, address: data.address, price: amount, userId, info },
    });
  } catch (error) {
    return {};
  }
  revalidatePath('/catalog');
  revalidatePath('/admin/products');
  redirect(payData.confirmation.confirmation_url);
};

async function yPay(amount: number): Promise<IYResponse | undefined> {
  const username = process.env.YOOKASSA_SHOP_ID;
  const password = process.env.YOOKASSA_API_KEY;

  const response = await fetch('https://api.yookassa.ru/v3/payments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotence-Key': Date.now().toString(),
      Authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
    },

    body: JSON.stringify({
      amount: {
        value: amount,
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/catalog',
      },
      capture: true,
      description: 'Test',
    }),
  });

  if (!response.ok) return;

  return await response.json();
}
