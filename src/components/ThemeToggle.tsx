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
          className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition active:scale-95 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {/* Both icons stay mounted; the theme class crossfades and rotates
              between them so the swap reads as one gesture, not a snap. */}
          <span className="relative block h-6 w-6">
            <SunIcon className="absolute inset-0 h-6 w-6 rotate-0 scale-100 fill-[#4A0E0E]/10 stroke-[#4A0E0E] opacity-100 transition-all duration-300 group-hover:stroke-[#2D0808] dark:-rotate-45 dark:scale-75 dark:opacity-0" />
            <MoonIcon className="absolute inset-0 h-6 w-6 rotate-45 scale-75 fill-[#D43D55]/20 stroke-[#D43D55] opacity-0 transition-all duration-300 group-hover:stroke-[#E8566A] dark:rotate-0 dark:scale-100 dark:opacity-100" />
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
