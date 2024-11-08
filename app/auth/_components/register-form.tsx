'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { registerAction } from '../_actions/register.action';

export const RegisterForm = () => {
  const [state, dispatch] = useFormState(registerAction, {});
  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <Label htmlFor="name">Имя</Label>
        <Input id="name" name="name" />
        {state.name && <p className="text-destructive text-sm">{state.name}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
        {state.email && <p className="text-destructive text-sm">{state.email}</p>}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" name="password" />
        {state.password && <p className="text-destructive text-sm">{state.password}</p>}
      </div>

      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      Зарегистрироваться
    </Button>
  );
};
