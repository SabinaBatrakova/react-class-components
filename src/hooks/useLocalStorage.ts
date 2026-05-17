export function useLocalStorage(key: string) {
  const get = () => localStorage.getItem(key);
  const set = (value: string) => localStorage.setItem(key, value);
  return { get, set };
}
