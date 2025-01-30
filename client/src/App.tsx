import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { Greeting } from './Greeting';
import { ChangeName } from './ChangeName';
import { trpc } from './utils/trpc';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          // url: 'http://localhost:8080', // This works
          url: 'https://localhost:8443', // This doesn't work
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
        <ChangeName />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
