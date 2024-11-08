'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export const loginAction = async (_prevState: unknown, formData: FormData): Promise<{ alert?: string } | undefined> => {
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof AuthError) {
      return { alert: 'Неверные данные!' };
    }
    throw err;
  }
};
