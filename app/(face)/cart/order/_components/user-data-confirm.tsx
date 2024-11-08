'use client';

import React from 'react';
import { useFormState } from 'react-dom';

import { useOrder } from '@/hooks/use-order';

import { useButtonPending } from '@/hooks/use-button-pending';
import { notFound, useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { orderAction } from '@/app/(face)/_actions/order.action';
import { FormFieldError } from './form-field-error';

export const UserDataConfirm = ({ user }: { user: User | undefined }) => {
  if (!user || !user.id) notFound();

  const { customerData, products } = useOrder(state => state);
  const [state, dispatch] = useFormState(orderAction.bind(null, { products, userId: user.id }), {});
  const [, setUpdate] = React.useState(false);

  const { setPending } = useButtonPending(state => state);
  const router = useRouter();

  const handleFocus = (error: keyof typeof state) => {
    delete state[error];
    setUpdate(prev => !prev);
    setPending(false);
  };

  const onSubmit = () => {
    setPending(true);
  };

  React.useEffect(() => {
    const errors = Object.keys(state);
    if (errors.length > 0) {
      router.push('#order');
    }
  }, [state]);

  React.useEffect(() => {
    return () => setPending(false);
  }, []);

  return (
    <>
      <h3>Введите данные получателя заказа</h3>
      <form onSubmit={onSubmit} id="order" action={dispatch} className="px-1 py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 relative bg-face-background">
          <label htmlFor="name" className="text-sm text-face-foreground/60">
            Имя*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onFocus={() => handleFocus('name')}
            className="px-3 py-1.5 text-sm block h-10 w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
          <FormFieldError error={state?.name} />
        </div>

        <div className="space-y-1 relative bg-face-background">
          <label htmlFor="phone" className="text-sm text-face-foreground/60">
            Телефон*
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onFocus={() => handleFocus('phone')}
            className="px-3 py-1.5 text-sm block h-10 w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
          <FormFieldError error={state?.phone} />
        </div>
        <div className="space-y-1 relative bg-face-background">
          <label htmlFor="address" className="text-sm text-face-foreground/60">
            Адрес*
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onFocus={() => handleFocus('address')}
            defaultValue={customerData?.customerAddress}
            className="px-3 py-1.5 text-sm block h-10 w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
          <FormFieldError error={state?.address} />
        </div>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-face-foreground/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="px-3 py-1.5 text-sm block h-10 w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
        </div>

        <div className="space-y-1 md:col-span-2">
          <label htmlFor="description" className="text-sm text-face-foreground/60">
            Комментарий к заказу
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="px-3 py-1.5 text-sm w-full rounded-md border border-face-popover outline-none bg-transparent focus-visible:ring"
          />
        </div>
      </form>
    </>
  );
};
