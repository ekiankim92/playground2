interface Props {
  children: React.ReactNode; // ReactElement 대신 ReactNode 사용
}

export default function CardContent({ children }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
