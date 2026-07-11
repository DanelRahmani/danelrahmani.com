import { Analytics } from '@vercel/analytics/react';
import 'focus-visible';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { Bodoni_Moda } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import React, { useEffect, useRef } from 'react';

// Display face for headings and the name: a high-contrast didone, the
// typographic vernacular of the family atelier the site's palette comes from.
const displayFont = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/index.css';
import '../styles/prism.css';

function usePrevious(value: string) {
  let ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }: AppProps) {
  let previousPathname = usePrevious(router.pathname);

  return (
    <>
      <DefaultSeo
        twitter={{ cardType: 'summary_large_image', handle: '@DanelRahmani' }}
        openGraph={{ type: 'website', locale: 'en_US', siteName: 'Danel Rahmani' }}
      />
      <ThemeProvider attribute="class">
        <MotionConfig reducedMotion="user">
          <div
            className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable} ${displayFont.variable}`}
          >
            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
              </div>
            </div>
            <div className="relative">
              <Header />
              {/* Route transitions: exit is quicker and subtler than the
                  enter (Jakub), and initial={false} keeps the first paint
                  instant so only navigations animate. The MotionConfig
                  wrapper strips the y-shift under reduced motion. */}
              <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <motion.div
                  key={router.asPath}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] } }}
                >
                  <main>
                    <Component previousPathname={previousPathname} {...pageProps} />
                  </main>
                  <Footer />
                </motion.div>
              </AnimatePresence>
            </div>
            <Analytics />
          </div>
        </MotionConfig>
      </ThemeProvider>
    </>
  );
}
