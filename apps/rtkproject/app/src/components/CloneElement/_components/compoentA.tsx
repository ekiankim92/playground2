'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Props } from '..';

function ComponentA(props: Props) {
  console.log('this is component A rendering!');
  // console.log('component a role:', role);
  // console.log('component a isAcitve:', isActive);
  console.log('component a props:', props);

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
