import { useContext } from 'react';
import { TagsModalContext } from 'src/Contexts/TagsModalContext';
import { ITag } from 'src/types/tags';

export function useTagsConsumer() {
  const context = useContext(TagsModalContext);

  if (context === null) {
    throw new Error('useTags must be within a TagsModalProvider');
  }

  return context;
}

export default function useTags(id = 0, tags: ITag[]) {
  const context = useTagsConsumer();

  const { key, registerTagsPosition: _registerTagsPosition } = context;

  const isTagsOpen = key === id;

  const registerTagsPosition = (callback: (tags: ITag[]) => void) =>
    _registerTagsPosition(id, callback, tags);

  return { ...context, registerTagsPosition, isTagsOpen };
}
