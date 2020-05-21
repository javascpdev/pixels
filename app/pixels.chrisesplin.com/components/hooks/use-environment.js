import devEnv from '~/../environments/app-env.dev';
import prodEnv from '~/../environments/app-env.prod';
import { useMemo } from 'react';

export default function useEnvironment() {
  const environment = useMemo(() => {
    const isDev = typeof window != 'undefined' && window.location.hostname.match(/local/);
    const environment = isDev ? devEnv : prodEnv;

    return environment;
  }, [process.brower]);

  return environment;
}
