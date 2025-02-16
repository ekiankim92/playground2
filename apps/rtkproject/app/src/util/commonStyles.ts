import { css } from '@emotion/react';

/** 말 줄임표(...) 처리하는 속성 */
export const ellipsisText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** display flex && 중앙 정렬 속성 */
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
