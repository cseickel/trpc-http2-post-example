import { useEffect, useState } from 'react';
import { trpc } from './utils/trpc';

export function ChangeName() {
  const [name, setName] = useState('');
  const utils = trpc.useUtils();
  const changeName = trpc.changeName.useMutation();
  const data = changeName.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeName.mutate({ newName: name });
  };

  useEffect(() => {
    if (data) {
      utils.greeting.invalidate();
    }
  }, [data]);

  return <div>
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={handleChange} />
      <button type="submit">Change Name</button>
    </form>
    <h3>Data Returned from Mutation:</h3>
    {data?.oldName && <div>Old Name: {data.oldName}</div>}
    {data?.newName && <div>New Name: {data.newName}</div>}
  </div>;
}
