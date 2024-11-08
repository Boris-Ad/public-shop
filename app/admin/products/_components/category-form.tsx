'use client';

import React from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addCategoryAction } from '../../_actions/add-category.action';

export const CategoryForm = () => {
  const [state, dispatch] = useFormState(addCategoryAction, {});
  const [, setUpdate] = React.useState(false);
  const { toast } = useToast();

  const formRef = React.useRef<HTMLFormElement>(null)

  const clearError = (nameField: keyof typeof state) => {
    delete state[nameField];
    setUpdate(prev => !prev);
  };

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      toast({ title: state.success });
    }
  }, [state]);
  return (
    <form ref={formRef} action={dispatch} className="mb-3 flex gap-x-3">
      <div className="space-y-1">
        <Input type="text" name="category" placeholder="Новая категория" onFocus={() => clearError('category')} className="w-[400px]" />
        {state.category && <p className="text-sm text-destructive">{state.category}</p>}
      </div>

      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Добавить категорию
    </Button>
  );
};
