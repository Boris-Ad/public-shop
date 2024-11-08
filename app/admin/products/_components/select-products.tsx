'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SelectProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [take, setTake] = React.useState(10);

  const createQueryPath = (checked: boolean | 'indeterminate') => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('available', 'true');
    } else {
      params.delete('available');
    }
    router.push(pathname + '?' + params);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (take === 10) {
      params.delete('take');
    } else {
      params.set('take', take.toString());
    }
    router.push(pathname + '?' + params);
  }, [take]);

  return (
    <div className="mb-4 flex items-center space-x-6">
      <div className="flex items-center space-x-3">
        <Checkbox onCheckedChange={checked => createQueryPath(checked)} />
        <p className="text-sm">Показать только доступные к продаже</p>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox checked={take === 10} onCheckedChange={checked => checked && setTake(10)} />
        <p className="text-sm">Показать 10</p>
      </div>
      <div className="flex items-center space-x-3">
        <Checkbox checked={take === 20} onCheckedChange={checked => checked && setTake(20)} />
        <p className="text-sm">Показать 20</p>
      </div>
    </div>
  );
};

export const SelectNumber = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const price = params.has('price');
    if (price) params.delete('price');
    const number = params.get('number');

    if (number === 'desc') {
      params.set('number', 'asc');
    } else {
      params.set('number', 'desc');
    }

    router.push(pathname + '?' + params);
  };

  return (
    <ChevronDown
      size={18}
      onClick={handleClick}
      className={cn(
        'cursor-pointer rounded hover:bg-slate-100 transition-transform',
        { 'rotate-180': searchParams.get('number') === 'desc' },
        { 'text-green-500': searchParams.has('number') }
      )}
    />
  );
};

export const SelectPrice = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    const price = params.has('number');
    if (price) params.delete('number');
    const number = params.get('price');

    if (number === 'desc') {
      params.set('price', 'asc');
    } else {
      params.set('price', 'desc');
    }

    router.push(pathname + '?' + params);
  };
  return (
    <ChevronDown
      size={18}
      onClick={handleClick}
      className={cn(
        'cursor-pointer rounded hover:bg-slate-100 transition-transform',
        { 'rotate-180': searchParams.get('price') === 'desc' },
        { 'text-green-500': searchParams.has('price') }
      )}
    />
  );
};
