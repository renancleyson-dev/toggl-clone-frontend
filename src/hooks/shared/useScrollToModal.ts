import { useEffect, useRef, useState } from 'react';

const root = document.getElementById('root')!;

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
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

function scrollParentToElement(parent: HTMLElement, node: HTMLElement) {
  const { top } = node.getBoundingClientRect();
  const nodeEndPosition = top + parent.scrollTop + node.clientHeight;
  const scrollHeight = parent.clientHeight + parent.scrollTop;

  const elementViewportOffset = nodeEndPosition - parent.clientHeight;
  const hasScrolledAfterElement = scrollHeight > nodeEndPosition;
  if (!hasScrolledAfterElement && elementViewportOffset > 0) {
    parent.scrollTo({ top: elementViewportOffset, behavior: 'smooth' });
  }
}

/*
  Ugly workaround to nice and smooth scrolling to modal.
  Honestly, sometimes I regret to use react-modal instead
  of create a modal myself.
*/
export default function useScrollToModal(isOpen: boolean) {
  const contentRef = useRef<HTMLElement | null>(null);
  const [overflow, setOverflow] = useState('auto');

  useEffect(() => {
    if (isOpen) {
      setOverflow('auto');
    }
  }, [isOpen]);

  const ref = (element: HTMLElement | null) => {
    if (element && !contentRef.current && overflow === 'auto') {
      scrollParentToElement(getScrollParent(element)!, element);
      setOverflow('hidden');
      scrollParentToElement(root, element);
    }
    contentRef.current = element;
  };

  return { overflow, ref };
}
