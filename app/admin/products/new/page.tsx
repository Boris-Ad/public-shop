import prisma from '@/lib/db';
import { PageHeader } from '../../_components/page-header';
import { ProductForm } from '../_components/product-form';
import { CategoryForm } from '../_components/category-form';


const NewProductPage = async () => {
  const categories = await prisma.category.findMany();

  return (
    <>
      <PageHeader>Новый продукт</PageHeader>
      <CategoryForm />
      <ProductForm categories={categories} />
    </>
  );
};

export default NewProductPage;
