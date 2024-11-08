'use server';

import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { registerSchema } from '@/lib/zod-schemas';
import { redirect } from 'next/navigation';

export const registerAction = async (_prevState: unknown, formData: FormData) => {
  const validatedFields = registerSchema.safeParse(Object.fromEntries(formData));

  if (validatedFields.success === false) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const { name, email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return {
      email: ['Этот email уже используется!'],
    };
  }
  const pwHash = await bcrypt.hash(password, 10);

  await prisma.user.create({ data: { name, email, password: pwHash } });

  return redirect('/auth/login');
};
