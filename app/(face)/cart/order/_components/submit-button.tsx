'use client';

import { useButtonPending } from '@/hooks/use-button-pending';
import { Loader2 } from 'lucide-react';

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useButtonPending(state => state);

  return (
    <button
      form="order"
      disabled={pending}
      className="w-full h-10 px-3 bg-face-primary rounded-full hover:bg-face-primary/80 active:bg-face-primary disabled:bg-face-primary/50"
    >
      {pending ? (
        <div className="w-full flex justify-center items-center space-x-3">
          <Loader2 className="animate-spin" />
          <span>Проверка...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
