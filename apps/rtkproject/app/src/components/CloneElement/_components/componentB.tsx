'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Props } from '..';

function ComponentB(props: Props) {
  console.log('this is component B rendering');
  console.log('component b props:', props);

  return (
    <Wrapper>
      <div>This is Component B</div>
    </Wrapper>
  );
}

// export default React.memo(ComponentB);
export default ComponentB;

const Wrapper = styled.div`
  border: 1px solid #000;
  width: 360px;
  height: 200px;
`;
