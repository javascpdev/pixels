import { RootContext } from '^/contexts/root-context';
import { useContext } from 'react';
import useValue from '~/hooks/use-value';

export default function useView() {
  const { view, navigate } = useContext(RootContext);

  return useValue({ view, navigate });
}
