import { BOX_SIZE, SPACING } from './Org.tsx';

import styles from './Org.module.css';

export function PersonBox({
  id,
  offset,
  level,
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
        width: BOX_SIZE - SPACING,
        height: BOX_SIZE - SPACING,
      }}
    >
      <strong>{id}</strong>
      <div>level: {level}</div>
      <div>offset: {offset}</div>
      {maxChildren && <div>maxChildren: {maxChildren}</div>}
    </div>
  );
}
