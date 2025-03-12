import styles from './Org.module.css';
import { SPACING } from './Org.tsx';

export function HorizontalLine({
  left,
  right,
}: {
  left: number;
  right: number;
}) {
  return (
    <div
      className={styles.horizontalLine}
      style={{ top: -SPACING / 2, left, right }}
    />
  );
}
