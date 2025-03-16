import { BOX_SIZE, SPACING } from './Org.tsx';

import styles from './Org.module.css';
import { PersonType } from './organization.ts';
import { useAtom } from 'jotai';
import { hoveredAtom } from './atoms.ts';

import classNames from 'classnames';

export function PersonBox({
  id,
  offset = 0,
  level = 1,
  maxChildren,
  children,
  highlighted = [],
}: PersonType & {
  highlighted?: string[];
}) {
  const [hovered, setHovered] = useAtom(hoveredAtom);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(undefined)}
        className={classNames(styles.person, {
          [styles.isHighlighted]: highlighted?.includes(id) || hovered === id,
          [styles.isHovered]: hovered === id,
        })}
        style={{
          left:
            offset * BOX_SIZE +
            ((maxChildren ?? 1) * BOX_SIZE) / 2 -
            BOX_SIZE / 2 +
            SPACING / 2,
          top: (level - 1) * BOX_SIZE,
          width: BOX_SIZE - SPACING,
          height: BOX_SIZE - SPACING,
        }}
      >
        <b>{id}</b>
        <div>level: {level}</div>
        <div>offset: {offset}</div>
        {maxChildren && <div>maxChildren: {maxChildren}</div>}
      </div>
      {children?.map((child) => (
        <PersonBox key={child.id} {...child} highlighted={highlighted} />
      ))}
    </>
  );
}
