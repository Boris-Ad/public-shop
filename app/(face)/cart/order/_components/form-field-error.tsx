'use client';

import { motion, AnimatePresence } from 'framer-motion';

export const FormFieldError = ({ error }: { error: string[] | undefined }) => {
  return (
    <AnimatePresence>
      {error ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="px-1 absolute start-3 top-1 translate-y-1/2 text-sm text-destructive bg-inherit"
        >
          {error}
        </motion.p>
      ): null}
    </AnimatePresence>
  );
};
