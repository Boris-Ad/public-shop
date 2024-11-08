'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ProductCarousel = ({ images }: { images: string[] }) => {
  const [ref, { width }] = useMeasure({ debounce: 300 });
  const [count, setCount] = React.useState(0);
  const [tuple, setTuple] = React.useState<number[]>([0, count]);

  if (tuple[1] !== count) {
    setTuple([tuple[1], count]);
  }

  const direction = tuple[0] > tuple[1] ? 1 : -1;

  interface ICustom {
    direction: number;
    width: number;
  }

  function increment() {
    setCount(prev => (prev + 1 >= images.length ? prev : prev + 1));
  }

  function decrement() {
    setCount(prev => (prev - 1 < 0 ? prev : prev - 1));
  }

  const variants = {
    in: ({ direction, width }: ICustom) => ({ x: direction * -width }),
    center: { x: 0 },
    exit: ({ direction, width }: ICustom) => ({ x: direction * width }),
  };

  function onDragEnd(_event: MouseEvent, info: PanInfo) {
    if (info.offset.x < 0) {
      increment();
    }
    if (info.offset.x > 0) {
      decrement();
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center space-y-3">
      <div ref={ref} className="p-2 w-full flex-1 overflow-x-hidden">
        <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={onDragEnd} dragElastic={0.1} className="w-full h-full relative">
          <AnimatePresence custom={{ direction, width }}>
            <motion.div key={count} initial="in" animate="center" exit="exit" variants={variants} custom={{ direction, width }} className="inset-0 absolute">
              <Image src={images[Math.abs(count) % images.length]} alt="image" fill sizes="100vw (max-width: 768px) 50vw" draggable={false} className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="hidden md:flex justify-center items-center gap-x-6">
        <button
          disabled={count === 0 ? true : false}
          onClick={decrement}
          className={cn('p-1 bg-face-popover rounded-full', { 'text-face-muted-foreground': count === 0 })}
        >
          <ArrowLeft />
        </button>
        <div className="flex items-center gap-x-2">
          {images.map((_item, inx) => (
            <span
              key={inx}
              className={cn('w-2 h-2 rounded-full transition-colors', Math.abs(count) % images.length === inx ? 'bg-[#E8E9EA]' : 'bg-[#3F4652] ')}
            />
          ))}
        </div>

        <button
          disabled={count === images.length - 1 ? true : false}
          onClick={increment}
          className={cn('p-1 bg-face-popover rounded-full', { 'text-face-muted-foreground': count === images.length - 1 })}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
