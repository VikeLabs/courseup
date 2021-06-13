import { useCallback } from 'react';

export const useChangeCallback = (
  onChange: (value: string) => void
): ((event: React.ChangeEvent<HTMLInputElement>) => void) =>
  useCallback((event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value), [onChange]);
