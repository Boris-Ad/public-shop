'use client';

import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { BarChart, CartesianGrid, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface OrdersByDayChartProps {
  data: {
    date: Date;
    totalSales: number;
  }[];
  tickFormatDate: {
    short: string;
    long: string;
  };
}

export const SalesChart = ({ data, tickFormatDate }: OrdersByDayChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ left: 20 }}>
        <XAxis dataKey="date" className="text-sm" tickFormatter={date => format(date, tickFormatDate.short, { locale: ru })} />
        <YAxis tickFormatter={tick => formatCurrency(tick)} className="text-sm" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelStyle={{ color: 'hsl(var(--face-primary))' }}
          cursor={{ fill: 'hsl(var(--muted))' }}
          labelFormatter={date => format(date, tickFormatDate.long, { locale: ru })}
        />
        <Bar dataKey="totalSales" name="Сумма" />
      </BarChart>
    </ResponsiveContainer>
  );
};
