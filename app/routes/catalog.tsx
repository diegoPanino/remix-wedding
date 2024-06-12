import { renderToString } from 'react-dom/server';
import algoliasearch from 'algoliasearch/lite';
import {
    Hits,
  InstantSearch,
  InstantSearchSSRProvider,
  getServerState,
} from 'react-instantsearch';
import { history } from 'instantsearch.js/cjs/lib/routers/index.js';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

export async function loader({ request }) {
  const serverUrl = request.url;
  const serverState = await getServerState(
    <Search serverUrl={serverUrl} />,
    { renderToString }
  );

  return json({
    serverState,
    serverUrl,
  });
}

function Search({ serverState, serverUrl }) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="instant_search"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === 'undefined') {
                return new URL(serverUrl);
              }

              return window.location;
            },
          }),
        }}
      >
        <Hits />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export default function HomePage() {
  const { serverState, serverUrl } = useLoaderData();

  return <Search serverState={serverState} serverUrl={serverUrl} />;
}