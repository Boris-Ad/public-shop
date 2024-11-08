'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2 } from 'lucide-react';
import { SelectCategory, SelectPrice, SelectSort } from './selects';
import { Category } from '@prisma/client';

export const MobileSortProducts = ({ categories }: { categories: Category[] }) => {
  const [count, setCount] = React.useState(0);
  const sortElements = [<SelectCategory categories={categories} />, <SelectPrice />, <SelectSort />];

  return (
    <div className="md:hidden flex gap-x-2">
      <div className="flex-1 overflow-x-hidden relative">
        <AnimatePresence initial={false}>
          <motion.div key={count} initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: -400 }} className="inset-0 absolute">
            {sortElements[Math.abs(count) % sortElements.length]}
          </motion.div>
        </AnimatePresence>
      </div>
      <button onClick={() => setCount(prev => prev + 1)} className="p-2 rounded-full bg-face-card active:bg-face-card/70">
        <Settings2 size={18} />
      </button>
    </div>
  );
};
