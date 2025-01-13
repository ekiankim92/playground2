import { CSSProperties } from 'react';

interface Props {
  title: string | number;
  style?: CSSProperties;
}

export default function CardHeader({ title, style }: Props) {
  return (
    <div>
      <div>{title}</div>
    </div>
  );
}
