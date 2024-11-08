import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IProduct {
  id: string;
  name: string;
  amount: number;
  price: number;
  imageUrl: string;
  number: number;
}
type CustomerData = {
  customerName?: string;
  customerSurname?: string;
  customerPhone?: number;
  customerEmail?: string;
  customerComments?: string;
  customerAddress?: string;
  customerCity?: string;
  customerStreet?: string;
  customerHouse?: string;
};

interface IOrder {
  userId: string | null;
  customerData: CustomerData | null;
  products: IProduct[];
  setUserId: (id: string) => void;
  setCustomerData: (data: CustomerData | null) => void;
  setProduct: (product: IProduct) => void;
  deleteProduct: (id: string) => void;
  changeAmount: (id: string, amount: number) => void;
  reset: () => void;
}

export const useOrder = create<IOrder>()(
  persist(
    set => ({
      userId: null,
      customerData: null,
      products: [],
      setUserId:(id) => set({userId:id}),
      setCustomerData: data => set({ customerData: data }),
      setProduct: newProduct =>
        set(state => {
          const products = state.products.filter(p => p.id != newProduct.id);
          return { products: [...products, newProduct] };
        }),
      deleteProduct: id =>
        set(state => {
          const res = state.products.filter(product => product.id !== id);
          return { products: res };
        }),
      changeAmount: (id, amount) =>
        set(state => {
          const products = state.products.map(product => (product.id === id ? { ...product, amount } : product));
          return { products };
        }),
      reset: () => set({ products: [],userId: null,customerData: null }),
    }),
    { name: 'order' }
  )
);
