import { useCallback } from 'react';
import { useRouter } from 'next/router';

export default function useRouterCustom() {
  const router = useRouter();
  const redirect = useCallback((pathname) => (location = `${location.origin}${pathname}`));

  return { redirect, ...router };
}
