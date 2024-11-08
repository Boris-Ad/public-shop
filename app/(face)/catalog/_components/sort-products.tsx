import { Category } from '@prisma/client';
import { SelectCategory, SelectPrice, SelectSort } from './selects';
import { MobileSortProducts } from './mobile-sortProducts';

export const SortProducts = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      <MobileSortProducts categories={categories} />
      <div className="h-10 hidden md:flex justify-between">
        <div className="flex space-x-4">
          <SelectCategory categories={categories} />
          <SelectPrice />
        </div>
        <SelectSort />
      </div>
    </>
  );
};
