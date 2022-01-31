import { useState, useRef, useCallback, useEffect } from 'react';

export type Position = {
  top: string;
  left: string;
};

const initialPosition = { top: '0', left: '0' };

type PositionCallback = () => Position;
type Callback<T extends unknown[]> = (...args: T) => void;
export type Register = { ref: (ref: Element | null) => void; onClick: () => void };

type PositionsRef<T extends unknown[]> = Record<
  number,
  { getRefPosition: PositionCallback; callback: Callback<T> }
>;

type GetPosition = () => {
  top: string;
  left: string;
};

type PublicAPI<T extends unknown[]> = {
  key: number;
  clearKey: Callback<T>;
  getPosition: GetPosition;
  registerPosition: (key: number, callback: Callback<T>) => Register;
};

function getScrollParent(node: Element | null): Element | null {
  if (!node) {
    return null;
  }

  const overflowY = window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentElement) || document.body;
}

function getPossiblePosition(element: Element) {
  const scrollable = getScrollParent(element);
  const { top, left } = element.getBoundingClientRect();
  let newTopPosition = top + window.scrollY + 35;

  const height = element.clientHeight;
  const elementViewportOffset =
    newTopPosition + height - (window.scrollY + window.innerHeight);

  if (scrollable && elementViewportOffset > 0) {
    newTopPosition -= elementViewportOffset;
    scrollable.scrollBy({ top: elementViewportOffset, behavior: 'smooth' });
  }

  return {
    top: `${newTopPosition}px`,
    left: `${left + window.scrollX - 100}px`,
  };
}

export default function useMultiPosition<T extends unknown[]>(): PublicAPI<T> {
  const [keyState, setKey] = useState<number>(-1);
  const positionsRef = useRef<PositionsRef<T>>({});

  const clearKey: Callback<T> = useCallback(
    (...args) => {
      positionsRef.current[keyState].callback(...args);
      setKey(-1);
    },
    [keyState]
  );

  const getPosition = useCallback(() => {
    const value = positionsRef.current[keyState];
    return value ? value.getRefPosition() : initialPosition;
  }, [keyState]);

  const registerPosition = useCallback((key: number, callback: Callback<T>) => {
    const ref = (ref: Element | null) => {
      if (!ref) {
        return;
      }

      const getRefPosition = () => getPossiblePosition(ref);
      positionsRef.current[key] = { getRefPosition, callback };
    };

    const onClick = () => {
      setKey(key);
    };

    return { ref, onClick };
  }, []);

  const publicAPI = {
    key: keyState,
    clearKey,
    getPosition,
    registerPosition,
  };

  return publicAPI;
}

export function useMultiPositionConsumer(keyState: number, getPosition: GetPosition) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const isOpen = keyState !== -1;

  useEffect(() => {
    if (isOpen) {
      setPosition(getPosition());
    }
  }, [isOpen, getPosition]);

  return { isOpen, position };
}
