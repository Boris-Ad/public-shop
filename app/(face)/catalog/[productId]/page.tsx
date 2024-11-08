import prisma from '@/lib/db';
import { Breadcrumbs } from '../../_components/breadcrumb';
import { notFound } from 'next/navigation';
import { cn, formatCurrency } from '@/lib/utils';
import { ProductCarousel } from './_components/product-carousel';
import { ProductAddingInCart } from './_components/product-addingInCart';

const ProductPage = async ({ params: { productId } }: { params: { productId: string } }) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (product == null) notFound();

  const images: string[] = [product.rootImagePath];
  if (product.firstImagePath) {
    images.push(product.firstImagePath);
  }
  if (product.secondImagePath) {
    images.push(product.secondImagePath);
  }

  return (
    <>
      <Breadcrumbs productName={product.name} />
      <div className="container grid grid-cols-1 md:grid-cols-3 md:gap-6">
        <div className="h-[400px] md:h-auto aspect-auto md:aspect-video relative col-span-2">
          <ProductCarousel images={images} />
        </div>
        <div className="p-4 space-y-4">
          <h2 className="text-xl md:text-2xl line-clamp-1">{product.name}</h2>
          <h3 className="text-face-secondary text-xl md:text-2xl">{formatCurrency(product.price)}</h3>
          <p className={cn(product.available ? 'text-face-secondary' : 'text-destructive', 'text-sm')}>
            {product.available ? 'Есть в наличии' : 'Нет в наличии'}
          </p>
          {product.available && <ProductAddingInCart product={product} />}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
