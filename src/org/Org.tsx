import './styles.css';

import styles from './Org.module.css';
import { VerticalLine } from './VerticalLine.tsx';
import { HorizontalLine } from './HorizontalLine.tsx';
import { PersonBox } from './PersonBox.tsx';
import { Container } from './Container.tsx';
import { organization, PersonType } from './organization.ts';

function dfs(person: PersonType, level: number = 1) {
  person.level = level;

  if (!person.children) {
    return 1;
  }

  let totalCount = 0;
  const children = person.children || [];

  children.forEach((child, i) => {
    child.parent = person;
    child.firstChild = i === 0;
    child.lastChild = i === children.length - 1;

    totalCount += dfs(child, level + 1);
  });

  person.maxChildren = totalCount;

  return totalCount;
}

dfs(organization[0]);

function bfs(start: PersonType) {
  const visited = new Set<PersonType>();
  const queue = [start];

  let offset = 0;
  let prevParent: PersonType | undefined = start.parent;

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

bfs(organization[0]);

export const CELL_SIZE = 150;
export const SPACING = 20;

function Person({
  level = 1,
  offset = 0,
  children,
  parent,
  maxChildren,
  id,
  firstChild,
  lastChild,
}: PersonType) {
  return (
    <>
      <div
        className={styles.personContainer}
        style={{
          top: (level - 1) * CELL_SIZE,
          left: offset * CELL_SIZE,
          width: CELL_SIZE * (maxChildren || 1),
          height: CELL_SIZE,
        }}
      >
        {!!parent && <VerticalLine position="top" />}
        {!!children && <VerticalLine position="bottom" />}

        {(parent?.children || [])?.length > 1 && firstChild && (
          <HorizontalLine
            left={Math.max(((maxChildren || 1) * CELL_SIZE) / 2, CELL_SIZE / 2)}
            right={0}
          />
        )}

        {(parent?.children || [])?.length > 1 && lastChild && (
          <HorizontalLine
            left={0}
            right={Math.max(
              ((maxChildren || 1) * CELL_SIZE) / 2,
              CELL_SIZE / 2
            )}
          />
        )}

        {(parent?.children || [])?.length > 1 && !firstChild && !lastChild && (
          <HorizontalLine left={0} right={0} />
        )}

        <PersonBox
          id={id}
          offset={offset}
          level={level}
          maxChildren={maxChildren}
        />
      </div>
      {children?.map((child) => <Person key={child.id} {...child} />)}
    </>
  );
}

export function Org() {
  return (
    <Container>
      <Person {...organization[0]} />
    </Container>
  );
}
