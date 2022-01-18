import getScrollParent from 'src/helpers/getScrollParent';

export default function handleDynamicPosition(
  element: Element,
  contentHeight: number = 460
) {
  let newTopPosition;
  const scrollable = getScrollParent(element);

  const { top, left } = element.getBoundingClientRect();
  const modalTopPosition = top + window.scrollY + 35;
  const elementViewportOffset =
    modalTopPosition + contentHeight - (window.scrollY + window.innerHeight);

  newTopPosition = modalTopPosition;
  if (scrollable && elementViewportOffset > 0) {
    newTopPosition -= elementViewportOffset;
    scrollable.scrollBy({ top: elementViewportOffset, behavior: 'smooth' });
  }

  return {
    top: `${newTopPosition}px`,
    left: `${left + window.scrollX - 100}px`,
  };
}
