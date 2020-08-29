import { TabsContext } from '~/contexts/tabs-context';
import { useContext } from 'react';

export default function useTabs() {
  return useContext(TabsContext);
}
