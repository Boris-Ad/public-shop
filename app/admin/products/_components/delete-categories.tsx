'use client';

import React from 'react';
import { Category } from '@prisma/client';
import { PackageMinus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { deleteCategoriesAction } from '../../_actions/delete-categories.action';

export const DeleteCategories = ({ categories }: { categories: Category[] }) => {
  const [counter, setCounter] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    open === false && setCounter(0);
  };

  const handleSubmit = () => {
    setOpen(false);
  };
  if (categories.length === 0) return null;
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="w-full text-base justify-between">
          <span className="text-destructive">Удалить категорию</span>

          <PackageMinus />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[400px]">
        <form action={deleteCategoriesAction} onSubmit={handleSubmit} className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox name={category.id} onCheckedChange={checked => (checked ? setCounter(prev => prev + 1) : setCounter(prev => prev - 1))} />
              <p>{category.name}</p>
            </div>
          ))}
          <p className="text-sm text-destructive">Удаление категории приведет к удалению всех продуктов в этой категории!</p>
          <Button disabled={counter === 0} size="sm" className="w-full">
            Удалить
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
