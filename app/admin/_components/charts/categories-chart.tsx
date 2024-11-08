'use client';

import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

export const CategoriesChart = ({ categories }: { categories: { name: string; value: number }[] }) => {
  const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        <Pie data={categories} dataKey="value" label={data => data.name}>
          {categories.map((v, inx) => (
            <Cell key={inx} fill={COLORS[inx % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
