import prisma from '@/lib/db';
import { formatCurrency, numWord } from '@/lib/utils';
import { SalesChart } from './_components/charts/sales-chart';
import { DashboardCard } from './_components/dashboard-card';
import { ChartCard } from './_components/charts/chart-card';
import { createChartData, dbRange, getChartData, getTickFormatDate } from './_components/charts/chart-utils';
import { PieChartCard } from './_components/charts/pie-chart-card';
import { CategoriesChart } from './_components/charts/categories-chart';

const getSalesData = async (startDate?: string, endDate?: string) => {
  const dateArray = getChartData(startDate, endDate);
  const { gte, lte } = dbRange(startDate, endDate);

  const [result, chartData] = await Promise.all([
    prisma.order.aggregate({ _sum: { price: true }, _count: true }),
    prisma.order.findMany({ select: { createdAt: true, price: true }, where: { createdAt: { gte, lte } }, orderBy: { createdAt: 'asc' } }),
  ]);
  const chartDataArray = createChartData(chartData, dateArray, startDate, endDate);

  return {
    amount: result._sum.price || 0,
    numberOfSales: result._count,
    chartData: chartDataArray,
  };
};

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { available: true } }),
    prisma.product.count({ where: { available: false } }),
  ]);
  return { activeCount, inactiveCount };
};

const getCategories = async () => {
  const prod = await prisma.product.findMany({ select: { category: true } });
  const map = prod.reduce((map, item) => map.set(item.category.name, (map.get(item.category.name) ?? 0) + 1), new Map<string, number>());
  const productsObj = Object.fromEntries(map);
  return Object.entries(productsObj).map(([key, value]) => ({ name: key, value }));
};

const AdminPage = async ({ searchParams: { from, to } }: { searchParams: { [key: string]: string | undefined } }) => {
  const [salesData, productData, categoriesData] = await Promise.all([getSalesData(from, to), getProductData(), getCategories()]);
  const tickFormatDate = getTickFormatDate(from, to);

  return (
    <>
      <section className="mb-6 grid lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Продано"
          subtitle={salesData.numberOfSales.toString() + ' ' + numWord(salesData.numberOfSales, ['Заказ', 'Заказа', 'Заказов'])}
          text={formatCurrency(salesData.amount)}
          path="/admin/orders"
        />
        <DashboardCard
          title="Всего продуктов"
          subtitle={'Снятых с продажи: ' + productData.inactiveCount.toString()}
          text={productData.activeCount.toString()}
          path="/admin/products"
        />
      </section>
      <section className="h-[400px] grid lg:grid-cols-2 gap-4">
        <ChartCard title="Продажи">
          <SalesChart data={salesData.chartData} tickFormatDate={tickFormatDate} />
        </ChartCard>
        <PieChartCard title="Количество">
          <CategoriesChart categories={categoriesData} />
        </PieChartCard>
      </section>
    </>
  );
};

export default AdminPage;
