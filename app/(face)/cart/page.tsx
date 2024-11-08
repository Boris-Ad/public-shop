import { CartHeader } from './_components/cart-title';
import { Breadcrumbs } from '../_components/breadcrumb';
import { CartList } from './_components/cart-list';
import Link from 'next/link';
import { AddOrder } from './_components/add-order';

const CartPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="pb-2 container">
        <CartHeader />
        <div className="mt-2 grid grid-cols-1 xl:grid-cols-[1fr,360px] gap-y-3 gap-x-6">
          <CartList />
          <AddOrder>
            <Link
              href={'/cart/order'}
              className="w-full h-10 px-4 text-sm flex justify-center items-center bg-face-primary rounded-full hover:bg-face-primary/80 active:bg-face-primary"
            >
              Оформить заказ
            </Link>
          </AddOrder>
        </div>
      </div>
    </>
  );
};

export default CartPage;
