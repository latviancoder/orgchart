import { PersonType } from './organization.ts';
import { BOX_SIZE, SPACING } from './Org.tsx';

export function ConnectingLine({
  id,
  level = 1,
  offset = 0,
  children,
  parent,
  maxChildren = 1,
  highlighted = [],
}: PersonType & {
  highlighted?: string[];
}) {
  const startX =
    (parent?.offset ?? 0) * BOX_SIZE +
    ((parent?.maxChildren ?? 0) * BOX_SIZE) / 2;

  const startY = (parent?.level ?? 0) * BOX_SIZE - SPACING;

  const endX = offset * BOX_SIZE + (maxChildren * BOX_SIZE) / 2;
  const endY = (level - 1) * BOX_SIZE;

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

  const isHighlighted = highlighted?.includes(id);

  return (
    <>
      <path
        d={bezier.join(' ')}
        fill="transparent"
        stroke={isHighlighted ? '#aaa' : '#ccc'}
        strokeWidth={2}
      />
      {children?.map((child) => (
        <ConnectingLine key={child.id} {...child} highlighted={highlighted} />
      ))}
    </>
  );
}
