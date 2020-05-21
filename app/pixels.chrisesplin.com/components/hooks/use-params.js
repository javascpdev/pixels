import { useEffect, useState } from 'react';

import parseSearch from '~/utilities/parse-search';

export default function useParams() {
  const [params, setParams] = useState({});
  const safeLocation = typeof location != 'undefined' && location;

  useEffect(() => {
    if (typeof location != 'undefined') {
      const { hash, search } = location;
      let params = {};

      if (search) {
        params = { ...params, ...parseSearch(search) };
      }

      if (hash) {
        params = { ...params, ...parseSearch(hash) };
      }

      setParams(params);
    }
  }, [safeLocation]);

  return params;
}
