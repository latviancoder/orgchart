import styles from './Org.module.css';
import { SPACING } from './Org.tsx';

export function VerticalLine({ position }: { position?: 'top' | 'bottom' }) {
  return (
    <div
      className={styles.verticalLine}
      style={{
        top: position === 'top' ? -SPACING / 2 : undefined,
        bottom: position === 'bottom' ? SPACING / 2 : undefined,
        height: SPACING / 2,
      }}
    />
  );
}
