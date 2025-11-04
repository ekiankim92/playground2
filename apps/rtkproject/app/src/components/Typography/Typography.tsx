import type { HTMLAttributes } from 'react';
import styled from 'styled-components';

// 타이포그래피 스타일 속성 인터페이스
interface StyledTypo {
  fontWeight?: number | string; // 글꼴 두께
  color?: string; // 텍스트 색상
  textDecoration?: string; // 텍스트 장식 (밑줄 등)
}

// 제목 1 스타일 (가장 큰 제목)
const StyledHead1 = styled.h1<StyledTypo>`
  font-size: 32px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -1.3px;
  color: ${(props) => props.color};
`;

// 제목 2 스타일
const StyledHead2 = styled.h2<StyledTypo>`
  font-size: 28px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -1.2px;
  color: ${(props) => props.color};
`;

// 제목 3 스타일
const StyledHead3 = styled.h3<StyledTypo>`
  font-size: 24px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -0.8px;
  color: ${(props) => props.color};
`;

// 제목 4 스타일
const StyledHead4 = styled.h4<StyledTypo>`
  font-size: 20px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: ${(props) => props.color};
`;

// 제목 5 스타일
const StyledHead5 = styled.h5<StyledTypo>`
  font-size: 18px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -0.7px;
  color: ${(props) => props.color};
`;

// 제목 6 스타일 (가장 작은 제목)
const StyledHead6 = styled.h6<StyledTypo>`
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

// 보고서 제목 1 스타일 (보고서용 특수 스타일)
const StyledReportHead1 = styled.h1<StyledTypo>`
  font-size: 18px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.2;
  letter-spacing: -0.7px;
  color: ${(props) => props.color};
`;

// 보고서 제목 2 스타일
const StyledReportHead2 = styled.h2<StyledTypo>`
  font-size: 12px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.5;
  letter-spacing: 0;
  color: ${(props) => props.color};
`;

// 본문 1 스타일 (가장 큰 본문)
const StyledBody1 = styled.span<StyledTypo>`
  font-size: 18px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration || 'none'};
`;

// 본문 2 스타일
const StyledBody2 = styled.span<StyledTypo>`
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration || 'none'};
`;

// 본문 3 스타일 (가장 작은 본문)
const StyledBody3 = styled.span<StyledTypo>`
  font-size: 14px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.5;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.textDecoration || 'none'};
`;

// 보고서 본문 스타일
const StyledReportBody1 = styled.span<StyledTypo>`
  font-size: 10px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.5;
  letter-spacing: 0;
  color: ${(props) => props.color};
`;

// 캡션 1 스타일 (가장 큰 캡션)
const StyledCaption1 = styled.div<StyledTypo>`
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

// 캡션 2 스타일
const StyledCaption2 = styled.div<StyledTypo>`
  font-size: 14px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.3;
  letter-spacing: -0.3px;
  color: ${(props) => props.color};
`;

// 캡션 3 스타일 (가장 작은 캡션)
const StyledCaption3 = styled.div<StyledTypo>`
  font-size: 12px;
  font-weight: ${(props) => props.fontWeight || 'normal'};
  line-height: 1.3;
  letter-spacing: -0.1px;
  color: ${(props) => props.color};
`;

// 타이포그래피 컴포넌트 props 인터페이스
export interface TypographyProps<ElementType> extends HTMLAttributes<ElementType> {
  fontWeight?: number | string; // 글꼴 두께
  color?: string; // 텍스트 색상
  textDecoration?: string; // 텍스트 장식 (밑줄 등)
}

// 제목 컴포넌트들
const Head1 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead1 {...props}>{children}</StyledHead1>
);
const Head2 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead2 {...props}>{children}</StyledHead2>
);
const Head3 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead3 {...props}>{children}</StyledHead3>
);
const Head4 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead4 {...props}>{children}</StyledHead4>
);
const Head5 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead5 {...props}>{children}</StyledHead5>
);
const Head6 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledHead6 {...props}>{children}</StyledHead6>
);

// 보고서 제목 컴포넌트들
const ReportHead1 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledReportHead1 {...props}>{children}</StyledReportHead1>
);
const ReportHead2 = ({ children, ...props }: TypographyProps<HTMLHeadingElement>) => (
  <StyledReportHead2 {...props}>{children}</StyledReportHead2>
);

// 본문 컴포넌트들
const Body1 = ({ children, ...props }: TypographyProps<HTMLSpanElement>) => (
  <StyledBody1 {...props}>{children}</StyledBody1>
);
const Body2 = ({ children, ...props }: TypographyProps<HTMLSpanElement>) => (
  <StyledBody2 {...props}>{children}</StyledBody2>
);
const Body3 = ({ children, ...props }: TypographyProps<HTMLSpanElement>) => (
  <StyledBody3 {...props}>{children}</StyledBody3>
);

// 보고서 본문 컴포넌트
const ReportBody1 = ({ children, ...props }: TypographyProps<HTMLSpanElement>) => (
  <StyledReportBody1 {...props}>{children}</StyledReportBody1>
);

// 캡션 컴포넌트들
const Caption1 = ({ children, ...props }: TypographyProps<HTMLParagraphElement>) => (
  <StyledCaption1 {...props}>{children}</StyledCaption1>
);
const Caption2 = ({ children, ...props }: TypographyProps<HTMLParagraphElement>) => (
  <StyledCaption2 {...props}>{children}</StyledCaption2>
);
const Caption3 = ({ children, ...props }: TypographyProps<HTMLParagraphElement>) => (
  <StyledCaption3 {...props}>{children}</StyledCaption3>
);

// 모든 타이포그래피 컴포넌트 내보내기
export {
  Body1,
  Body2,
  Body3,
  Caption1,
  Caption2,
  Caption3,
  Head1,
  Head2,
  Head3,
  Head4,
  Head5,
  Head6,
  ReportBody1,
  ReportHead1,
  ReportHead2,
  type StyledTypo,
};
