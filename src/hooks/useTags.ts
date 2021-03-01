import { useContext } from 'react';
import { TagsModalContext } from 'src/Contexts/TagsModalContext';

export default function useTags(openId?: number) {
  const context = useContext(TagsModalContext);

  if (context === null) {
    throw new Error('useTags must be within a TagsModalProvider');
  }

  if (typeof openId === 'number') {
    const isOpen = context.isOpen && openId === context.openId.current;
    return { ...context, isOpen };
  }

  return context;
}
