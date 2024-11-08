import prisma from '@/lib/db';
import { numWord } from '@/lib/utils';
import { ProductCard } from './_components/product-card';
import { Breadcrumbs } from '../_components/breadcrumb';
import { PageTitle } from '../_components/page-title';
import { SortProducts } from './_components/sort-products';
import { Pagination } from '../_components/pagination';
import { Scroll } from '../_components/scroll';

const CatalogPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const products = await sortProducts(searchParams);
  const productsCount = await prisma.product.count();
  const categories = await prisma.category.findMany();

  return (
    <>
      <Breadcrumbs />
      <div className="pb-2 container">
        <div className="mb-2 md:mb-8 relative inline-block">
          <span className="text-sm text-face-muted-foreground absolute -end-2 translate-x-full whitespace-nowrap">
            {products.length} {numWord(products.length, ['товар', 'товара', 'товаров'])}
          </span>
          <PageTitle>Каталог</PageTitle>
        </div>
        <SortProducts categories={categories} />
      </div>
      <div className="container py-2 grid grid-cols-2 auto-rows-auto gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {productsCount > 12 && <Pagination productsCount={productsCount} />}
      <Scroll />
    </>
  );
};

export default CatalogPage;

async function sortProducts(searchParams: Record<string, string | undefined>) {
  const sortParams: {
    name: 'asc' | undefined;
    updatedAt: 'desc' | undefined;
    price: 'asc' | 'desc' | undefined;
    available: boolean | undefined;
    page: string | undefined;
  } = {
    name: undefined,
    updatedAt: undefined,
    price: undefined,
    available: undefined,
    page: undefined,
  };

  const skipNumber = searchParams.page ? (parseInt(searchParams.page) - 1) * 12 : 0;
  const minPriceParam: number | undefined = searchParams['min-price'] ? parseInt(searchParams['min-price']) : undefined;
  const maxPriceParam: number | undefined = searchParams['max-price'] ? parseInt(searchParams['max-price']) : undefined;
  const categoryParam: string | undefined = searchParams.category === 'all' ? undefined : searchParams.category;

  switch (searchParams.sort) {
    case 'abc':
      sortParams.name = 'asc';
      break;
    case 'new':
      sortParams.updatedAt = 'desc';
      break;
    case 'min-price':
      sortParams.price = 'asc';
      break;
    case 'max-price':
      sortParams.price = 'desc';
      break;
    case 'available':
      sortParams.available = true;
      break;
    default:
      break;
  }

  return await prisma.product.findMany({
    skip: skipNumber,
    take: 12,
    where: { price: { gt: minPriceParam, lte: maxPriceParam }, available: sortParams.available, category: { id: categoryParam } },
    orderBy: { name: sortParams.name, updatedAt: sortParams.updatedAt, price: sortParams.price },
  });
}
