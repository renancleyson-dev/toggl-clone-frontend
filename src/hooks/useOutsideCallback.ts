import React, { useEffect } from 'react';

export default (ref: React.MutableRefObject<null | Node>, callback: Function) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const { current } = ref;
      const { target } = event;

      if (target instanceof Node && current !== null && !current.contains(target)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
