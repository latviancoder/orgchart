import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Hammer from 'hammerjs';
import styles from './Org.module.css';
import { useAtom } from 'jotai';
import { initialOffsetAtom, offsetAtom, zoomAtom } from './atoms.ts';

export function Container({
  people,
  lines,
}: {
  people: ReactNode;
  lines: ReactNode;
}) {
  const [offset, setOffset] = useAtom(offsetAtom);
  const [initialOffset, setInitialOffset] = useAtom(initialOffsetAtom);
  const [zoom, setZoom] = useAtom(zoomAtom);
  const [rect, setRect] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const onWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      let newScale = zoom - event.deltaY * 0.002;

      if (newScale < 0.2) newScale = 0.2;
      if (newScale > 3) newScale = 3;

      setZoom(newScale);
    },
    [setZoom, zoom]
  );

  useEffect(() => {
    const $root = containerRef.current;
    const mc = new Hammer.Manager(containerRef.current!, {
      domEvents: true,
    });

    if ($root) {
      $root.addEventListener('wheel', onWheel);

      mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
      mc.add(new Hammer.Pinch({ pointers: 2, threshold: 0, enable: true }));

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
      $root?.removeEventListener('wheel', onWheel);
    };
  }, [initialOffset, onWheel, setInitialOffset, setOffset]);

  const resize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current!.getBoundingClientRect();
      setRect(rect);
    }
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [resize]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={styles.app}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
        }}
      >
        <svg
          width={rect.width}
          height={rect.height}
          style={{ position: 'relative', zIndex: 100 }}
        >
          {lines}
        </svg>
        {people}
      </div>
    </div>
  );
}
