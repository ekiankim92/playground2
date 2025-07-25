'use client';

import { useState } from 'react';
import ComponentA from './_components/compoentA';
import ComponentB from './_components/componentB';
import styled from '@emotion/styled';

const TABS = [
  {
    name: 'a',
    key: 'a',
  },
  {
    name: 'b',
    key: 'b',
  },
];

export default function MemoComponent() {
  const [tab, setTab] = useState('a');

  const onClickTabA = () => {
    setTab('a');
  };

  const onClickTabB = () => {
    setTab('B');
  };

  return (
    <div>
      <div>This is CloneElement</div>
      <Wrapper>
        <Box onClick={onClickTabA}>Component A</Box>
        <Box onClick={onClickTabB}>Component B</Box>
      </Wrapper>
      {/* {tab === 'a' ? <ComponentA /> : <ComponentB />} */}

      <ComponentA />
      <ComponentB />
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #000;
`;

const Box = styled.div`
  width: 180px;
  height: 40px;
  border: 1px solid blue;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
