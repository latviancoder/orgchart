import './styles.css';

import styles from './Org.module.css';
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

  children.forEach((child) => {
    child.parent = person;

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

bfs(organization[0]);

export const BOX_SIZE = 150;
export const SPACING = 20;

function Person({
  level = 1,
  offset = 0,
  children,
  maxChildren,
  id,
}: PersonType) {
  return (
    <>
      <div
        className={styles.personContainer}
        style={{
          top: (level - 1) * BOX_SIZE,
          left: offset * BOX_SIZE,
          width: BOX_SIZE * (maxChildren || 1),
          height: BOX_SIZE,
        }}
      >
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

function ConnectingLine({
  level = 1,
  offset = 0,
  children,
  parent,
  maxChildren = 1,
}: PersonType) {
  const startX =
    (parent?.offset ?? 0) * BOX_SIZE +
    ((parent?.maxChildren ?? 0) * BOX_SIZE) / 2;

  const startY = (parent?.level ?? 0) * BOX_SIZE - SPACING;

  const endX = offset * BOX_SIZE + (maxChildren * BOX_SIZE) / 2;

  const endY = ((level ?? 0) - 1) * BOX_SIZE;

  const bezier = [`M${startX} ${startY}`];

  if (startX > endX) {
    // lines going left
    bezier.push(
      `Q ${startX} ${startY + SPACING / 2} ${startX - SPACING} ${startY + SPACING / 2}`
    );
    bezier.push(`T ${endX + SPACING} ${startY + SPACING / 2}`);
    bezier.push(`Q ${endX} ${startY + SPACING / 2} ${endX} ${endY}`);
  } else if (startX < endX) {
    // lines going right
    bezier.push(
      `Q ${startX} ${startY + SPACING / 2} ${startX + SPACING} ${startY + SPACING / 2}`
    );
    bezier.push(`T ${endX - SPACING} ${startY + SPACING / 2}`);
    bezier.push(`Q ${endX} ${startY + SPACING / 2} ${endX} ${endY}`);
  } else {
    // lines going straight down
    bezier.push(`L ${endX} ${endY}`);
  }

  return (
    <>
      <path
        d={bezier.join(' ')}
        fill="transparent"
        stroke="#ccc"
        strokeWidth={2}
      />
      {children?.map((child) => <ConnectingLine key={child.id} {...child} />)}
    </>
  );
}

export function Org() {
  return (
    <Container
      people={<Person {...organization[0]} />}
      lines={<ConnectingLine {...organization[0]} />}
    />
  );
}
