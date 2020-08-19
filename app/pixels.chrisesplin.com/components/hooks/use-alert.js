import { AlertsContext } from '~/contexts/alerts-context';
import { useContext } from 'react';

export default function useAlert() {
  const { alert } = useContext(AlertsContext);

  return alert;
}
