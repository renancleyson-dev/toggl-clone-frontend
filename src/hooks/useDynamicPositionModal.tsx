import { useState } from 'react';
import getScrollParent from 'src/helpers/getScrollParent';

export default function useDynamicPositionModal(
  ref: React.MutableRefObject<null | Element>,
  contentHeight: number = 460
) {
  const [position, setPosition] = useState({ top: '0', left: '0' });
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);

    let newTopPosition;
    const scrollable = getScrollParent(ref.current);
    if (!(ref.current instanceof Element && scrollable)) {
      return;
    }

    const { top, left } = ref.current.getBoundingClientRect();
    const modalTopPosition = top + window.scrollY + 35;
    const elementViewportOffset =
      modalTopPosition + contentHeight - (window.scrollY + window.innerHeight);

    newTopPosition = modalTopPosition;
    if (elementViewportOffset > 0) {
      newTopPosition -= elementViewportOffset;
      scrollable.scrollBy({ top: elementViewportOffset, behavior: 'smooth' });
    }

    setPosition({
      top: `${newTopPosition}px`,
      left: `${left + window.scrollX - 100}px`,
    });
  };

  return { position, isOpen, setIsOpen, handleOpen };
}
