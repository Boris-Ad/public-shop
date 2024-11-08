'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

interface DropMenuProps {
  isVisible: boolean;
  setIsVisible: (_value: boolean) => void;
  children: React.ReactNode;
  elementRef: React.RefObject<HTMLElement>;
}

export const DropMenu = ({ isVisible, setIsVisible, children, elementRef }: DropMenuProps) => {
  const [mounted, setMounted] = React.useState(false);

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const shift = useMotionValue('0');

  if (elementRef?.current != null) {
    
    const inputData = elementRef.current.getBoundingClientRect();
    const leftShift = window.innerWidth / 2 - inputData.left > 0

    y.set(inputData.top + inputData.height + 7);
    x.set(inputData.left + (leftShift ? 0 : inputData.width));
    shift.set(leftShift ? '0' : '-100%')
  }

  React.useEffect(() => {
    setMounted(true);
  },[]);
  return mounted
    ? createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="absolute inset-0 z-40"
            >
              <motion.div style={{ x, y, translateX : shift }} onClick={e => e.stopPropagation()} className="fixed z-50">
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
};
