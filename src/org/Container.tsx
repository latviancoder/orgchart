import { PropsWithChildren, useEffect, useRef } from 'react';
import Hammer from 'hammerjs';
import styles from './Org.module.css';
import { useAtom } from 'jotai';
import { initialOffsetAtom, offsetAtom } from './atoms.ts';

export function Container({ children }: PropsWithChildren) {
  const [offset, setOffset] = useAtom(offsetAtom);
  const [initialOffset, setInitialOffset] = useAtom(initialOffsetAtom);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const $root = containerRef.current;
    const mc = new Hammer.Manager(containerRef.current!);

    if ($root) {
      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

      mc.on('panend', ({ deltaX, deltaY }) => {
        setInitialOffset({
          x: initialOffset.x + deltaX,
          y: initialOffset.y + deltaY,
        });
      });

      mc.on('pan', ({ deltaX, deltaY }) => {
        setOffset({
          x: initialOffset.x + deltaX,
          y: initialOffset.y + deltaY,
        });
      });
    }

    return () => {
      mc.off('pan panend');
    };
  }, [initialOffset, setInitialOffset, setOffset]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.app}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
