import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { MoonIcon } from './icons/MoonIcon';
import { SunIcon } from './icons/SunIcon';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {/* Light mode: burgundy sun icon */}
          <SunIcon className="h-6 w-6 fill-[#4A0E0E]/10 stroke-[#4A0E0E] transition group-hover:stroke-[#2D0808] dark:hidden" />
          {/* Dark mode: raspberry moon icon */}
          <MoonIcon className="hidden h-6 w-6 fill-[#D43D55]/20 stroke-[#D43D55] transition group-hover:stroke-[#E8566A] dark:block" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
