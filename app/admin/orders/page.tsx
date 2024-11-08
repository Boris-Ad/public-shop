import prisma from '@/lib/db';
import { PageHeader } from '../_components/page-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import { DeliveryToggle } from '../_components/delivery-toggle';
import { IProduct } from '@/my-types';

const OrdersPage = async () => {
  const [deliveredOrders, notDeliveredOrders] = await Promise.all([
    prisma.order.findMany({ where: { delivered: true } }),
    prisma.order.findMany({ where: { delivered: false } }),
  ]);
  return (
    <>
      <PageHeader>Заказы</PageHeader>
      {notDeliveredOrders.length > 0 ? (
        <DeliveryOrders title="Недоставленные заказы" orders={notDeliveredOrders} />
      ) : (
        <h3 className="mb-6">Недоставленных заказов нет</h3>
      )}
      {deliveredOrders.length > 0 ? <DeliveryOrders title="Доставленные заказы" orders={deliveredOrders} /> : <h3>Доставленных заказов нет</h3>}
    </>
  );
};

export default OrdersPage;

export const DeliveryOrders = async ({ title, orders }: { title: string; orders: Order[] }) => {
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-lg">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата покупки</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Имя получателя</TableHead>
            <TableHead>Телефон получателя</TableHead>
            <TableHead>Список</TableHead>
            <TableHead className="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        {orders.map(order => (
          <TableBody key={order.id}>
            <TableRow>
              <TableCell className="align-top">{order.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="align-top">{order.address}</TableCell>
              <TableCell className="align-top">{order.name}</TableCell>
              <TableCell className="align-top">{order.phone}</TableCell>
              <TableCell className="align-top">
              {getListProducts(order.info).map(product => (
                <p key={product.id}>{product.name} : {product.amount} шт.</p>
              ))}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-3">
                    <DeliveryToggle orderId={order.id} delivered={order.delivered} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

function getListProducts(infoProductsJson: string) {
  const products: IProduct[] = JSON.parse(infoProductsJson).products;
  return products;
}
