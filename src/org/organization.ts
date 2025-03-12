export type PersonType = {
  id: string;
  maxChildren?: number;
  children?: PersonType[];
  parent?: PersonType;
  level?: number;
  offset?: number;
  firstChild?: boolean;
  lastChild?: boolean;
};

export const organization: PersonType[] = [
  {
    id: 'R',
    children: [
      {
        id: 'P',
        children: [{ id: 'Z', children: [{ id: 'Y' }] }, { id: 'X' }],
      },
      {
        id: 'K',
        children: [
          {
            id: 'A',
          },
          {
            id: 'F',
            children: [{ id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }],
          },
          { id: 'G' },
          { id: 'J', children: [{ id: 'N' }, { id: 'O' }] },
        ],
      },
      { id: 'L' },
    ],
  },
];
