'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import ComponentA from './_components/compoentA';
import ComponentB from './_components/componentB';
import styled from '@emotion/styled';
import axios from 'axios';

export type Props = {
  role: string;
  isActive: boolean;
};

const TABS: Array<{ name: string; key: string; content: React.ReactElement }> = [
  {
    name: 'a',
    key: 'a',
    content: React.createElement(ComponentA),
  },
  {
    name: 'b',
    key: 'b',
    content: React.createElement(ComponentB),
  },
];

export default function CloneElement() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
        setUserData(res.data);
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>This is CloneElement</div>
      {TABS.map((el) =>
        React.cloneElement(el.content, {
          role: 'user',
          isActive: el.key === 'a' ? true : false,
          userData: el.key === 'a' ? userData : null,
        }),
      )}
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
