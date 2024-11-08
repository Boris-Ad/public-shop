'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@prisma/client';
import { ChevronsUpDown, ListCheck, ArrowDownAZ, BadgeRussianRuble, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { DropSelect } from '../../_components/drop-select';

export const SelectCategory = ({ categories }: { categories: Category[] }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = React.useState(false);

  const categoryName = categories.find(category => category.id === searchParams.get('category'))?.name;

  const onCategory = (categoryValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryValue);
    router.push(pathname + '?' + params);
    setIsVisible(false);
  };

  const handleClick = () => {
    setIsVisible(true);
  };

  return (
    <div ref={divRef} className="w-full h-full relative bg-face-card rounded-md">
      <div className="f-full md:w-[280px] h-full px-2 py-1.5 flex justify-between items-center gap-x-2 cursor-pointer" onClick={handleClick}>
        <div>
          <ListCheck size={20} strokeWidth={1.5} />
        </div>
        <p className="line-clamp-1 mr-auto">{categoryName || 'Все категории'}</p>
        <div>
          <ChevronsUpDown size={18} />
        </div>
      </div>
      <DropSelect isVisible={isVisible} setIsVisible={setIsVisible} elementRef={divRef}>
        <ul className="absolute top-[110%] inset-x-0 rounded-md bg-face-popover text-face-popover-foreground overflow-hidden">
          <li onClick={() => onCategory('all')} className="p-2 grid grid-cols-[28px,1fr] hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{(searchParams.has('category', 'all') || !searchParams.has('category')) && <Check size={20} className="text-primary-shop" />}</div>
            Все категории
          </li>
          {categories.map(category => (
            <li
              onClick={() => onCategory(category.id)}
              key={category.id}
              className="p-2 grid grid-cols-[28px,1fr] hover:bg-face-popover-foreground/10 cursor-pointer transition-colors"
            >
              <div>{searchParams.has('category', category.id) && <Check size={20} className="text-primary-shop" />}</div>
              {category.name}
            </li>
          ))}
        </ul>
      </DropSelect>
    </div>
  );
};

export const SelectPrice = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(0);

  const handleClick = () => {
    setIsVisible(true);
  };

  const onSearchPrice = (formData: FormData) => {
    const params = new URLSearchParams(searchParams.toString());
    const minPrice = formData.get('min-price');
    const maxPrice = formData.get('max-price');

    if (minPrice && parseInt(minPrice.toString()) > 0) {
      params.set('min-price', minPrice.toString());
    } else if (minPrice && parseInt(minPrice.toString()) == 0) {
      params.delete('min-price');
    }
    if (maxPrice && parseInt(maxPrice.toString()) > 0) {
      params.set('max-price', maxPrice.toString());
    } else if (maxPrice && parseInt(maxPrice.toString()) == 0) {
      params.delete('max-price');
    }
    
    router.push(pathname + '?' + params);
    setIsVisible(false);
  };

  return (
    <div ref={divRef} className="w-full h-full relative bg-face-card rounded-md">
      <div className="w-full md:w-[280px] h-full px-2 py-1.5 flex justify-between items-center gap-x-2 cursor-pointer" onClick={handleClick}>
        <div>
          <BadgeRussianRuble size={20} strokeWidth={1.5} />
        </div>
        <p className="line-clamp-1 mr-auto">Цена</p>
        <div>
          <ChevronsUpDown size={18} />
        </div>
      </div>
      <DropSelect isVisible={isVisible} setIsVisible={setIsVisible} elementRef={divRef}>
        <div className="p-2 absolute top-[110%] inset-x-0 rounded-md bg-face-popover text-face-popover-foreground overflow-hidden">
          <form action={onSearchPrice} className="space-y-3">
            <div className="flex gap-x-3 ">
              <div className="flex-1 space-y-1">
                <label htmlFor="minPrice" className="text-sm">
                  От
                  <span> {formatCurrency(minPrice)}</span>
                </label>
                <input
                  id="minPrice"
                  name="min-price"
                  type="text"
                  value={minPrice}
                  onChange={e => setMinPrice(prev => (e.target.value.length < 6 ? parseInt(e.target.value) || 0 : prev))}
                  className="w-full px-2 py-1.5 text-sm text-black/70 bg-face-muted rounded-md outline-none"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label htmlFor="maxPrice" className="text-sm">
                  До
                  <span> {formatCurrency(maxPrice)}</span>
                </label>
                <input
                  id="maxPrice"
                  name="max-price"
                  type="text"
                  value={maxPrice}
                  onChange={e => setMaxPrice(prev => (e.target.value.length < 6 ? parseInt(e.target.value) || 0 : prev))}
                  className="w-full px-2 py-1.5 text-sm bg-face-muted text-black/70 rounded-md outline-none"
                />
              </div>
            </div>
            <button className="w-full p-1.5 rounded-md bg-face-primary text-sm hover:bg-face-primary/70 transition-colors">Готово</button>
          </form>
        </div>
      </DropSelect>
    </div>
  );
};

export const SelectSort = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  const onSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    router.push(pathname + '?' + params);
    setIsVisible(false);
  };

  return (
    <div ref={divRef} className="w-full md:w-min h-full relative bg-face-card  rounded-md">
      <div className="w-full md:w-[280px] h-full px-2 py-1.5 flex justify-between items-center gap-x-2 cursor-pointer" onClick={handleClick}>
        <div>
          <ArrowDownAZ size={20} strokeWidth={1.5} />
        </div>
        <p className="line-clamp-1 mr-auto">Сортировка</p>
        <div>
          <ChevronsUpDown size={18} />
        </div>
      </div>
      <DropSelect isVisible={isVisible} setIsVisible={setIsVisible} elementRef={divRef}>
        <ul className="absolute top-[110%] inset-x-0 rounded-md bg-face-popover text-face-popover-foreground overflow-hidden">
          <li onClick={() => onSort('abc')} className="p-2 grid grid-cols-[28px,1fr] items-center hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{(searchParams.has('sort', 'abc') || !searchParams.has('sort')) && <Check size={20} className="text-primary-shop" />}</div>
            По алфавиту
          </li>
          <li onClick={() => onSort('new')} className="p-2 grid grid-cols-[28px,1fr] items-center hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{searchParams.has('sort', 'new') && <Check size={20} className="text-primary-shop" />}</div>
            Новинки
          </li>
          <li onClick={() => onSort('min-price')} className="p-2 grid grid-cols-[28px,1fr] items-center hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{searchParams.has('sort', 'min-price') && <Check size={20} className="text-primary-shop" />}</div>
            Сначала дешевые
          </li>
          <li onClick={() => onSort('max-price')} className="p-2 grid grid-cols-[28px,1fr] items-center hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{searchParams.has('sort', 'max-price') && <Check size={20} className="text-primary-shop" />}</div>
            Сначала дорогие
          </li>
          <li onClick={() => onSort('available')} className="p-2 grid grid-cols-[28px,1fr] items-center hover:bg-face-popover-foreground/10 cursor-pointer transition-colors">
            <div>{searchParams.has('sort', 'available') && <Check size={20} className="text-primary-shop" />}</div>
            Есть в наличии
          </li>
        </ul>
      </DropSelect>
    </div>
  );
};
