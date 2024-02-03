'use client';

import { useEffect, useState } from 'react';

export function RotatingHands(): JSX.Element {
  const [handIndex, setHandIndex] = useState(0);
  const hands = ['👋', '👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHandIndex((handIndex + 1) % hands.length);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [handIndex, hands.length]);

  return <>{hands[handIndex]}</>;
}
