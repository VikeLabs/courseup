import { useContext } from 'react';

import { Mobile, MobileContext } from './context';

export function useMobileContext(): Mobile {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error('MobileContext was not set');
  }

  return context;
}
