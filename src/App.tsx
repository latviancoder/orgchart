// import { useQuery } from './useQuery.ts';
// import { Test } from './Test.tsx';
import { Org } from './org/Org.tsx';

// const fetchUsers = async () => {
//   return await fetch(`https://dummyjson.com/users`).then((res) => res.json());
// };

// const dummy = async () => {
//   return await new Promise((resolve) =>
//     setTimeout(() => resolve({ blah: Math.random() }), 200)
//   );
// };

function App() {
  // const lul = useQuery({
  //   fn: dummy,
  //   key: `test`,
  // });

  return (
    <>
      <Org />
    </>
  );
}

export default App;
