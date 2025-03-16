import { BOX_SIZE, SPACING } from './Org.tsx';

import styles from './Org.module.css';

export function PersonBox({
  id,
  offset = 0,
  level = 1,
  maxChildren,
}: {
  id: string;
  offset?: number;
  level?: number;
  maxChildren?: number;
}) {
  return (
    <div
      className={styles.person}
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
  );
}
