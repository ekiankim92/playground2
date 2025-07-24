'use client';

import React from 'react';
import styled from '@emotion/styled';

function ComponentA() {
  console.log('this is component A rendering!');

  return (
    <Wrapper>
      <div>This is Component A</div>
    </Wrapper>
  );
}

// export default React.memo(ComponentA);
export default ComponentA;

const Wrapper = styled.div`
  border: 1px solid #000;
  width: 360px;
  height: 200px;
`;
