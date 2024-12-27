import { ReactNode } from 'react';

export default function ContentCard({ Content }: React.ReactNode) {
  return (
    <div>
      <Content />
    </div>
  );
}

const Content = ({ children }) => {
  return <div>{children}</div>;
};
