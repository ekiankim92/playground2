import styled from '@emotion/styled/macro';

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
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
