'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export const Scroll = () => {
  const mainRef = React.useRef<HTMLElement | null>(null);
  const [isVision, setIsVision] = React.useState(false);

  const handleClick = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const main = document.getElementById('main');
    mainRef.current = main;
    main?.addEventListener('scroll', () => {
      if (main.scrollTop > 50) {
        setIsVision(true);
      } else {
        setIsVision(false);
      }
    });

    return () => {
      main?.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <AnimatePresence>
      {isVision && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          onClick={handleClick}
          className="md:hidden fixed bottom-6 end-6 rounded-full p-1 bg-face-primary/70 cursor-pointer"
        >
          <ChevronUp size={32} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
