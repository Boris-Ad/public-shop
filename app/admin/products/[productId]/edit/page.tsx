import { PageHeader } from '@/app/admin/_components/page-header';
import prisma from '@/lib/db';
import { CategoryForm } from '../../_components/category-form';
import { ProductForm } from '../../_components/product-form';

const EditProductPage = async ({ params: { productId } }: { params: { productId: string } }) => {
  const [product, categories] = await Promise.all([prisma.product.findUnique({ where: { id: productId } }), prisma.category.findMany()]);

  return (
    <>
      <PageHeader>Редактировать</PageHeader>
      <CategoryForm />
      <ProductForm categories={categories} product={product} />
    </>
  );
};

export default EditProductPage;
