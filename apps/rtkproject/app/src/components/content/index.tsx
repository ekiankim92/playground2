type ContentCardProps = {
  Content: React.ComponentType<{ children: React.ReactNode }>;
};

export default function ContentCard({ Content }: React.ReactNode) {
  return (
    <div>
      <Content />
    </div>
  );
}

const Content = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};
