import { trpc } from './utils/trpc';

export function Greeting() {
  const greeting = trpc.greeting.useQuery();

  return <div>{greeting.data?.text}</div>;
}
