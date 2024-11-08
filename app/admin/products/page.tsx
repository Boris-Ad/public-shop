import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle2, MoreVertical, PackagePlus, XCircle } from 'lucide-react';
import prisma from '@/lib/db';
import { PageHeader } from '../_components/page-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';
import { ToggleAvailable } from './_components/toggle-available';
import { SelectNumber, SelectPrice, SelectProducts } from './_components/select-products';
import { DeleteCategories } from './_components/delete-categories';
import { DeleteProduct } from './_components/delete-product';
import { AdminPagination } from './_components/admin-pagination';
import { Button } from '@/components/ui/button';

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const [categories, productsCount] = await Promise.all([prisma.category.findMany(), prisma.product.count()]);

  return (
    <>
      <PageHeader>Продукты</PageHeader>
      <Button variant="outline" size="lg" asChild className="mb-6">
        <Link href="/admin/products/new" className="flex justify-between">
          <span className="text-base">Создать продукт</span>
          <PackagePlus />
        </Link>
      </Button>

      <SelectProducts />
      <Suspense fallback={<p>Loading...</p>}>
        <ProductTable searchParams={searchParams} />
      </Suspense>

      <AdminPagination productsCount={productsCount} />
      <div className="mt-auto">
        <DeleteCategories categories={categories} />
      </div>
    </>
  );
};

export default ProductsPage;

const ProductTable = async ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
  const price = searchParams.price === 'asc' ? 'asc' : searchParams.price === 'desc' ? 'desc' : undefined;
  const number = searchParams.number === 'asc' ? 'asc' : searchParams.number === 'desc' ? 'desc' : undefined;

  const take = searchParams.take ? parseInt(searchParams.take) : 10;
  const skipNumber = searchParams.page ? (parseInt(searchParams.page) - 1) * take : 0;
  const createdAt = price ? undefined : number ? undefined : 'desc';

  const products = await prisma.product.findMany({
    where: { available: searchParams.available ? true : undefined },
    orderBy: { price, number, createdAt },
    select: { category: { select: { name: true } }, id: true, available: true, name: true, price: true, number: true },
    take,
    skip: skipNumber,
  });

  if (products.length === 0) {
    return <h2 className="text-xl">Ничего нет!</h2>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0"></TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Категория</TableHead>

          <TableHead>
            <div className="flex items-center space-x-2">
              <p>Количество</p>
              <SelectNumber />
            </div>
          </TableHead>

          <TableHead>
            <div className="flex items-center space-x-2">
              <p>Цена</p>
              <SelectPrice />
            </div>
          </TableHead>

          <TableHead className="w-0"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>{product.available ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-destructive" />}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>{product.number}</TableCell>

            <TableCell>{formatCurrency(product.price)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-3">
                  <DropdownMenuItem asChild>
                    <Link href={'/admin/products/' + product.id + '/edit'}>Редактировать</Link>
                  </DropdownMenuItem>
                  <ToggleAvailable productId={product.id} available={!product.available} />
                  <DropdownMenuSeparator />
                  <DeleteProduct id={product.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
