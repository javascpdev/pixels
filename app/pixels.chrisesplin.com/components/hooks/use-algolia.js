import { useEffect, useMemo, useState } from 'react';

import algoliasearch from 'algoliasearch';
import useCurrentUser from '~/hooks/use-current-user';
import useEnvironment from '~/hooks/use-environment';
import useFirebase from '~/hooks/use-firebase';

const DEFAULT_RESULTS = { hits: [] };

export default function useAlgolia({ query, indexKey }) {
  const environment = useEnvironment();
  const firebase = useFirebase();
  const currentUser = useCurrentUser();
  const [client, setClient] = useState(null);

  const index = useMemo(
    () => client?.initIndex && client.initIndex(environment.algolia.indices[indexKey]),
    [client, indexKey]
  );
  const [results, setResults] = useState(DEFAULT_RESULTS);

  useEffect(() => {
    (async () => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser && environment && indexKey) {
        await currentUser.getIdToken(true);

        const { claims } = await currentUser.getIdTokenResult();

        const client = algoliasearch(environment.algolia.applicationId, claims.searchKey);

        setClient(client);
      }
    })();
  }, [currentUser, environment, indexKey, setClient]);

  useEffect(() => {
    if (index && query) {
      let isMounted = true;

      (async () => {
        const results = await index.search(query);

        isMounted && setResults(results);
      })();

      return () => (isMounted = false);
    }
  }, [index, query, setResults]);

  return results;
}
