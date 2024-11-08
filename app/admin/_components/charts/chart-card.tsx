'use client';

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { fromRange } from './chart-utils';
import { ru } from 'date-fns/locale';

export const ChartCard = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [buttonTitle, setButtonTitle] = React.useState(fromRange.week.title);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const setSearchParams = (from: Date | undefined, to: Date | undefined, title?: string) => {
    if (from instanceof Date && to instanceof Date) {
      if (title) {
        setButtonTitle(title);
      } else {
        const buttonTitle = 'С ' + format(from, 'dd MMM', { locale: ru }) + ' - ' + format(to, 'dd MMM', { locale: ru });
        setButtonTitle(buttonTitle)
      }

      const params = new URLSearchParams(searchParams.toString());

      params.set('from', from.toISOString());
      params.set('to', to.toISOString());

      router.push(pathname + '?' + params);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{buttonTitle}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(fromRange).map(([, value], inx) => (
                <DropdownMenuItem key={inx} onClick={() => setSearchParams(value.start, value.end, value.title)}>
                  {value.title}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>За определенный срок</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <div>
                    <Calendar
                      mode="range"
                      disabled={{ after: new Date() }}
                      selected={dateRange}
                      defaultMonth={dateRange?.from}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                    <DropdownMenuItem className="hover:bg-auto">
                      <Button disabled={dateRange?.from == null || dateRange.to == null} onClick={() => setSearchParams(dateRange?.from, dateRange?.to)} className="w-full">
                        Submit
                      </Button>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
