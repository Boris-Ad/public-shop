import { create } from 'zustand';

interface IButtonPending {
  pending: boolean;
  setPending: (value: boolean) => void;
}

export const useButtonPending = create<IButtonPending>()(set => ({
  pending: false,
  setPending: value => set({ pending: value }),
}));
