import { useEffect, useState } from 'react';

import { TOKYO_UNTIL } from '../../data/home';

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(new Date());

/**
 * "Now in Tokyo, 21:14 JST": a live local time while the exchange lasts.
 * Rendered only on the client (the server cannot know the reader's "now"),
 * and it removes itself after the exchange ends so it can never go stale.
 */
export const TokyoClock = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    if (Date.now() >= TOKYO_UNTIL) return;
    setTime(format());
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span>
      Now in Tokyo,{' '}
      <span className="font-medium tabular-nums text-stone-900 dark:text-stone-100">{time}</span>{' '}
      JST.
    </span>
  );
};
