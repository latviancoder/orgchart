import { useQuery } from './useQuery.ts';

const fetchUser = async (id: string) => {
  return await fetch(`https://dummyjson.com/users/${id}`).then((res) =>
    res.json()
  );
};

export const Test = () => {
  const blah = useQuery({
    fn: () => fetchUser('1'),
    key: `test1`,
  });

  return <div>{JSON.stringify(blah.data, null, 2)}</div>;
};
