'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { loginAction } from '../_actions/login.action';
import { useSearchParams } from 'next/navigation';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') === 'OAuthAccountNotLinked';
  const [state, dispatch] = useFormState(loginAction, {});

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" name="password" />
      </div>
      {state?.alert && <p className="text-destructive">{state.alert}</p>}
      {error && <p className="text-destructive">Этот email уже используется!</p>}
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Войти
    </Button>
  );
};
