import { useCallback } from 'react';

export function useLocalStorage(key: string) {
  const get = useCallback(() => localStorage.getItem(key), [key]);
  const set = useCallback(
    (value: string) => localStorage.setItem(key, value),
    [key]
  );
  return { get, set };
}
