import { useState, useEffect } from 'react';

export default function useDynamicModalPosition(
  ref: React.MutableRefObject<null | Node>,
  isModalOpen: boolean
) {
  const [position, setPosition] = useState({ top: '0', left: '0' });

  useEffect(() => {
    if (ref.current instanceof Element && isModalOpen) {
      const { top, left } = ref.current.getBoundingClientRect();
      setPosition({
        top: `${top + window.scrollY + 35}px`,
        left: `${left + window.scrollX - 100}px`,
      });
    }
  }, [ref, isModalOpen]);

  return position;
}
