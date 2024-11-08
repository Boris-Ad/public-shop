import { auth } from '@/lib/auth';
import { IPositionByIp } from '@/my-types';
import { PageTitle } from '../../_components/page-title';
import { Breadcrumbs } from '../../_components/breadcrumb';
import { OrderSectionHeader } from './_components/order-section-header';
import { OrderTable } from './_components/order-table';
import { AddressConfirm } from './_components/address-confirm';
import { YandexMap } from './_components/yandex-map';
import { UserDataConfirm } from './_components/user-data-confirm';
import { AddOrder } from '../_components/add-order';
import { SubmitButton } from './_components/submit-button';
import { OrderList } from './_components/order-list';
import { SelectedAddress } from './_components/selected-address';

const getIp = async (): Promise<string | null> => {
  const res = await fetch('https://api.ipify.org');
  if (!res.ok) return null;
  return res.text();
};

const getPositionByIp = async (ip: string): Promise<IPositionByIp | null> => {
  const res = await fetch('https://ipwho.is/' + ip);
  if (!res.ok) return null;
  return res.json();
};

const OrderPage = async () => {
  const session = await auth();
  let myGeo: IPositionByIp | null = null;
  const myIp = await getIp();
  if (myIp != null) {
    myGeo = await getPositionByIp(myIp);
  }
  return (
    <>
      <Breadcrumbs />
      <div className="pb-2 container">
        <PageTitle>Оформление заказа</PageTitle>
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1fr,360px] gap-y-3 gap-x-6">
          <div className="space-y-6 ">
            <section>
              <OrderSectionHeader number={1} title="Заказ" />
              <OrderList />
              <OrderTable />
            </section>
            <section className="space-y-2">
              <OrderSectionHeader number={2} title="Доставка" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                <div className="space-y-4 flex flex-col">
                  <AddressConfirm myGeo={myGeo} />
                </div>
                <div className="aspect-video">
                  <YandexMap myGeo={myGeo} />
                </div>
                <SelectedAddress />
              </div>
            </section>
            <section className="space-y-2">
              <OrderSectionHeader number={3} title="Данные получателя" />
              <UserDataConfirm user={session?.user} />
            </section>
          </div>
          <AddOrder>
            <SubmitButton>Оформить заказ</SubmitButton>
          </AddOrder>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
