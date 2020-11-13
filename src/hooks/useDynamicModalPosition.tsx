import { useState, useEffect } from 'react';

export default function useDynamicModalPosition(
  ref: React.MutableRefObject<null | Node>,
  isModalOpen: boolean,
  contentHeight: number = 440
) {
  const [position, setPosition] = useState({ top: '0', left: '0' });

  useEffect(() => {
    const root = document.querySelector('#root');
    if (ref.current instanceof Element && isModalOpen && root) {
      const { top, left } = ref.current.getBoundingClientRect();
      const modalTopPosition = top + window.scrollY + 35;

      const elementViewportOffset =
        modalTopPosition + contentHeight - (window.scrollY + window.innerHeight);

      let newTopPosition = modalTopPosition;
      if (elementViewportOffset > 0) {
        newTopPosition -= elementViewportOffset;
        root.scrollBy({ top: elementViewportOffset, behavior: 'smooth' });
      }

      setPosition({
        top: `${newTopPosition}px`,
        left: `${left + window.scrollX - 100}px`,
      });
    }
  }, [ref, isModalOpen, contentHeight]);

  return position;
}
