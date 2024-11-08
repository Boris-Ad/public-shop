'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { LngLat } from '@yandex/ymaps3-types';

interface DropdownMenuProps {
  cityList: { center: LngLat; name: string }[];
  setCityName: (_value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isVisible: boolean;
  setIsVisible: (_value: boolean) => void;
}

export const DropdownMenu = ({ cityList, setCityName, inputRef, isVisible, setIsVisible }: DropdownMenuProps) => {
  const [mounted, setMounted] = React.useState(false);

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const width = useMotionValue(0);

  if (inputRef?.current != null) {
    const inputData = inputRef.current.getBoundingClientRect();
    y.set(inputData.top + inputData.height + 7);
    x.set(inputData.left);
    width.set(inputData.width);
  }

  const onSelected = (city: { center: LngLat; name: string }) => {
    window.map?.update({ location: { center: city.center, zoom: 12, duration: 300 } });
    setCityName(city.name);
    setIsVisible(false);
  };

  React.useEffect(() => {
    if (cityList.length === 0) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [cityList.length]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        <AnimatePresence>
          {isVisible && (
            <motion.div exit={{ opacity: 0 }} onClick={() => setIsVisible(false)} className="absolute inset-0">
              <motion.div style={{ x, y, width }} className="fixed">
                <motion.ul
                  initial={{ y: -7, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -7, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                  className="rounded-md border border-face-popover bg-face-card"
                >
                  <AnimatePresence>
                    {cityList.map((city, inx) => (
                      <motion.li
                        key={inx}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        // transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
                        onClick={() => onSelected(city)}
                        className="px-2 hover:bg-face-popover cursor-pointer text-face-foreground"
                      >
                        <p className="py-2 text-sm">{city.name}</p>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
};
