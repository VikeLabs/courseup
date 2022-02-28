import { useCallback, useState } from 'react';

export type Time = { days: number; hours: number; minutes: number; seconds: number };

export const calculateTimeLeft = (): Time => {
  const difference = +new Date(`3/22/2022`) - +new Date();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
};

export function useCountdown(): [Time, () => void] {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const countdown = useCallback(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return [timeLeft, countdown];
}
