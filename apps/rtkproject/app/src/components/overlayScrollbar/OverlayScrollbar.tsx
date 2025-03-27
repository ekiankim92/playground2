import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface OverlayScrollbarStyles {
  track?: React.CSSProperties;
  thumb?: React.CSSProperties;
  container?: React.CSSProperties;
}

interface OverlayScrollbarProps {
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  autoHide?: boolean;
  styles?: OverlayScrollbarStyles;
  trackWidth?: number;
  thumbColor?: string;
  thumbHoverColor?: string;
  thumbActiveColor?: string;
  hideDelay?: number;
  className?: string;
}

const OverlayScrollbar = ({
  children,
  height = '100%',
  width = '100%',
  autoHide = true,
  styles = {},
  trackWidth = 8,
  thumbColor = 'hsla(0, 0%, 42%, 0.49)',
  thumbHoverColor = 'hsla(0, 0%, 42%, 0.65)',
  thumbActiveColor = 'hsla(0, 0%, 42%, 0.81)',
  hideDelay = 1000,
  className,
}: OverlayScrollbarProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(ratio * trackSize, 20);
    setThumbHeight(thumbHeight);
  }

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const trackSize = scrollTrackRef.current.clientHeight;

      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });

      observer.current.observe(ref);
      handleResize(ref, trackSize);

      return () => {
        observer.current?.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const trackSize = scrollTrackRef.current.clientHeight;
      handleResize(ref, trackSize);
    }
  }, [children]);

  const handleScrollThumbMousedown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  };

  const handleMouseup = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
    }
  };

  const handleMousemove = (e: MouseEvent) => {
    if (isDragging && scrollStartPosition && contentRef.current && scrollTrackRef.current) {
      const deltaY = e.clientY - scrollStartPosition;
      const trackSize = scrollTrackRef.current.clientHeight;
      const contentSize = contentRef.current.scrollHeight;

      const percentage = deltaY * (contentSize / trackSize);
      contentRef.current.scrollTop = initialScrollTop + percentage;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, [isDragging, scrollStartPosition, initialScrollTop]);

  const handleTrackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { current: trackCurrent } = scrollTrackRef;
    const { current: contentCurrent } = contentRef;
    if (trackCurrent && contentCurrent) {
      const { clientY } = e;
      const target = e.target as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const trackTop = rect.top;
      const thumbOffset = -(thumbHeight / 2);
      const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
      const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);
      contentCurrent.scrollTo({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  function handleScroll() {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const trackHeight = scrollTrackRef.current.clientHeight;

    const maxThumbPosition = trackHeight - thumbHeight;
    const thumbPosition = Math.min(
      (scrollTop / (scrollHeight - clientHeight)) * (trackHeight - thumbHeight),
      maxThumbPosition,
    );

    scrollThumbRef.current.style.transform = `translateY(${thumbPosition}px)`;

    setIsScrolling(true);

    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }

    scrollTimer.current = setTimeout(() => {
      setIsScrolling(false);
    }, hideDelay);
  }

  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  return (
    <ScrollbarContainer style={{ width, height, ...styles.container }} className={className}>
      <ScrollbarContent ref={contentRef} onScroll={handleScroll}>
        {children}
      </ScrollbarContent>
      <ScrollbarTrack
        ref={scrollTrackRef}
        onClick={handleTrackClick}
        $isScrolling={isScrolling || isDragging}
        $autoHide={autoHide}
        $trackWidth={trackWidth}
        style={styles.track}
      >
        <ScrollbarThumb
          ref={scrollThumbRef}
          style={{ height: `${thumbHeight}px`, ...styles.thumb }}
          onMouseDown={handleScrollThumbMousedown}
          $isScrolling={isScrolling || isDragging}
          $autoHide={autoHide}
          $trackWidth={trackWidth}
          $thumbColor={thumbColor}
          $thumbHoverColor={thumbHoverColor}
          $thumbActiveColor={thumbActiveColor}
        />
      </ScrollbarTrack>
    </ScrollbarContainer>
  );
};

const ScrollbarContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const ScrollbarContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-right: 20px;
  margin-right: -20px;
  box-sizing: content-box;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;
const ScrollbarTrack = styled.div<{
  $isScrolling: boolean;
  $autoHide: boolean;
  $trackWidth: number;
}>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({ $trackWidth }) => `${$trackWidth}px`};
  background: transparent;
  cursor: pointer;
  opacity: ${({ $isScrolling, $autoHide }) => ($autoHide ? ($isScrolling ? 1 : 0) : 1)};
  transition: opacity 0.2s ease-in-out;
`;

const ScrollbarThumb = styled.div<{
  $isScrolling: boolean;
  $autoHide: boolean;
  $trackWidth: number;
  $thumbColor: string;
  $thumbHoverColor: string;
  $thumbActiveColor: string;
}>`
  width: ${({ $trackWidth }) => `${$trackWidth}px`};
  background-color: ${({ $thumbColor }) => $thumbColor};
  border-radius: ${({ $trackWidth }) => `${$trackWidth / 2}px`};
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  opacity: ${({ $isScrolling, $autoHide }) => ($autoHide ? ($isScrolling ? 1 : 0) : 1)};
  transition:
    opacity 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
  z-index: 10;

  &:hover {
    background-color: ${({ $thumbHoverColor }) => $thumbHoverColor};
  }

  &:active {
    background-color: ${({ $thumbActiveColor }) => $thumbActiveColor};
  }
`;

OverlayScrollbar.displayname = 'OverlayScrollbar';

export default OverlayScrollbar;
