import './styles.css';

import { PersonBox } from './PersonBox.tsx';
import { Container } from './Container.tsx';
import { organization, PersonType } from './organization.ts';
import { useAtom } from 'jotai/index';
import { hoveredAtom } from './atoms.ts';
import { ConnectingLine } from './ConnectingLine.tsx';

function depthFirst(person: PersonType, level: number = 1) {
  person.level = level;

  if (!person.children) {
    return 1;
  }

  let totalCount = 0;

  person.children.forEach((child) => {
    child.parent = person;

    totalCount += depthFirst(child, level + 1);
  });

  person.maxChildren = totalCount;

  return totalCount;
}

depthFirst(organization[0]);

function breadthFirst(start: PersonType) {
  const visited = new Set<PersonType>();
  const queue = [start];

  let offset = 0;
  let prevParent: PersonType | undefined = undefined;

  while (queue.length > 0) {
    const person = queue.shift()!;
    const children = person.children || [];

    // Reset offset when parent changes
    if (person.parent !== prevParent) {
      offset = 0;
    }

    person.offset = (person.parent?.offset || 0) + offset;
    offset += person.maxChildren || 1;

    prevParent = person.parent;

    for (const child of children) {
      if (!visited.has(child)) {
        visited.add(child);
        queue.push(child);
      }
    }
  }
}

breadthFirst(organization[0]);

const relationshipMap = new Map<string, string[]>();

function buildRelationshipMap(person: PersonType): string[] {
  if (!relationshipMap.has(person.id)) {
    relationshipMap.set(person.id, []);
  }

  if (!person.children) return [];

  const childrenIds = person.children.reduce<string[]>((ids, child) => {
    ids.push(child.id, ...buildRelationshipMap(child));
    return ids;
  }, []);

  relationshipMap.set(person.id, childrenIds);

  return childrenIds;
}

buildRelationshipMap(organization[0]);

export const BOX_SIZE = 150;
export const SPACING = 20;

export function Org() {
  const [hovered] = useAtom(hoveredAtom);

  return (
    <Container
      people={
        <PersonBox
          {...organization[0]}
          highlighted={hovered ? relationshipMap.get(hovered) : []}
        />
      }
      lines={
        <ConnectingLine
          {...organization[0]}
          highlighted={hovered ? relationshipMap.get(hovered) : []}
        />
      }
    />
  );
}
