import styled from '@emotion/styled/macro';
import { ReactNode } from 'react';

export default function ContentCard() {
  return (
    <div>
      <Content>
        <div>There is contents inside</div>
      </Content>
    </div>
  );
}

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <div>{children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
