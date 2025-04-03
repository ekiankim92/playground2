import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

const Card = styled.div<Props>`
  width: 400px;
  padding: 80px 24px 32px 24px;

  border-radius: 12px;
  border: 1px solid var(--g10, #e1e2e3);
  background: var(--normal, #fff);

  box-shadow: 0px 4px 20px 0px rgba(27, 27, 85, 0.08);
`;

export default Card;
