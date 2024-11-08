'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { DropSelectProps } from '@/my-types';

export const DropSelect = ({ isVisible, setIsVisible, children, elementRef }: DropSelectProps) => {
  const [mounted, setMounted] = React.useState(false);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const width = useMotionValue(0);

  if (elementRef?.current != null) {
    const inputData = elementRef.current.getBoundingClientRect();

    y.set(inputData.top + inputData.height + 7);
    x.set(inputData.left);
    width.set(inputData.width);
  }

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted
    ? createPortal(
        <AnimatePresence>
          {isVisible && (
            <div onClick={() => setIsVisible(false)} className="absolute inset-0 overflow-hidden">
              <motion.div style={{ x, y, width }} className="fixed block">
                <motion.div initial={{ y: -7, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -7, opacity: 0 }} onClick={e => e.stopPropagation()}>
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
};
