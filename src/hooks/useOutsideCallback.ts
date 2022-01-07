import React, { useEffect } from 'react';

export default (ref: React.MutableRefObject<null | Node>, callback: Function) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        ref.current !== null &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
