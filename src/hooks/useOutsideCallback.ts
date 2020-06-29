import React, { useEffect } from 'react';

export default (ref: React.MutableRefObject<null | HTMLElement>, callback: Function) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const current = ref.current;
      if (current !== null && event.target instanceof HTMLElement) {
        !current.contains(event.target) && callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
