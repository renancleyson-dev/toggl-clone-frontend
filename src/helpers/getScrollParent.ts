function getScrollParent(node: Element | null): Element | null {
  if (!node) {
    return null;
  }

  const overflowY = window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (!node) {
    return null;
  } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentElement) || document.body;
}

export default getScrollParent;
