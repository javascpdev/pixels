import constants from '^/constants';
import liveReload from '_background/utilities/live-reload';
import { useEffect } from 'react';

export default function useLiveReload() {
  useEffect(() => {
    if (constants.META.IS_DEVELOPMENT) {
      return liveReload(() => location.reload());
    }
  }, []);
}
