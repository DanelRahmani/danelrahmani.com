import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { profile } from '../../data/resume';
import { Button } from '../Button';
import { Seam } from '../Stitch';

/**
 * The start page's last word: the ask, and three ways to act on it. A
 * reader who scrolled this far should not have to scroll back up.
 */
export const Closing = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!status) return;
    const id = setTimeout(() => setStatus(''), 2400);
    return () => clearTimeout(id);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Copied');
    } catch {
      // The async clipboard is refused without focus or permission; fall
      // back to the selection-based copy, and say so if that fails too.
      const field = document.createElement('textarea');
      field.value = profile.email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      field.remove();
      setStatus(ok ? 'Copied' : 'Could not copy, the address is on the button');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <Seam draw />
      <motion.div
        initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pt-14"
      >
        <h2
          id="contact-title"
          className="max-w-[16ch] font-serif text-4xl italic leading-[1.1] tracking-tight text-stone-900 text-balance dark:text-zinc-100 sm:text-5xl"
        >
          Summer 2027, somewhere in finance.
        </h2>
        <p className="mt-5 max-w-lg text-base text-stone-600 dark:text-stone-400">
          I am looking for an internship in corporate finance, M&amp;A or asset management. Based
          in Groningen, in Tokyo until March, willing to relocate.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
          <Button as="a" href={`mailto:${profile.email}`}>
            {profile.email}
          </Button>
          <Button as="a" variant="secondary" href={profile.pdf} download="Danel_Rahmani_CV.pdf">
            Download résumé
          </Button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-thread text-sm font-medium text-primary dark:text-dark-accent"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={copy}
            className="link-thread text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-dark-accent"
          >
            Copy address
          </button>
          <span role="status" className="font-mono text-xs text-primary dark:text-dark-accent">
            {status}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
