import React, { useState, useEffect, cloneElement, Children } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Slider.css';

const PAGE_WIDTH: number = 400;

interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const handleLeftArrowClick = (): void => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + PAGE_WIDTH;
      return Math.min(newOffset, 0);
    });
  };

  const handleRightArrowClick = (): void => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - PAGE_WIDTH;
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  useEffect(() => {
    const updatedPages = Children.map(children, (child) =>
      cloneElement(child as React.ReactElement, {
        style: {
          height: '100%',
          minWidth: `${PAGE_WIDTH}px`,
          maxWidth: `${PAGE_WIDTH}px`,
        },
      })
    );
    setPages(updatedPages!);
  }, [children]);

  return (
    <div className="main-container">
      <FaChevronLeft className="arrow" onClick={handleLeftArrowClick} />
      <div className="window">
        <div
          className="all-pages-container"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {pages}
        </div>
      </div>
      <FaChevronRight className="arrow" onClick={handleRightArrowClick} />
    </div>
  );
};

export default Slider;