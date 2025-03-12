import { use } from 'react';

const promiseCache = new Map<string, Promise<unknown>>();

export const useQuery = <T>({
  fn,
  key,
}: {
  fn: () => Promise<T>;
  key: string;
}): { data: T } => {
  if (!promiseCache.has(key)) {
    promiseCache.set(key, fn());
  }

  const promise = promiseCache.get(key) as Promise<T>;

  return {
    data: use(promise),
  };
};
