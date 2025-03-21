import styled from '@emotion/styled/macro';
import { ReactNode } from 'react';

export default function ContentCard() {
  return (
    <div>
      <Content>
        <Title>There is contents inside</Title>
      </Content>
    </div>
  );
}

const Content = ({ children }: { children: ReactNode }) => {
  const calculatedWidth = window.getComputedStyle;
  console.log('calculatedWidth:', calculatedWidth);

  return (
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  position: relative;
`;
