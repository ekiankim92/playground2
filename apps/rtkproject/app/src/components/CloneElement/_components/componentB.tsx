'use client';

import React from 'react';
import styled from '@emotion/styled';

function ComponentB() {
  console.log('this is component B rendering');

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
