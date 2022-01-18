import { useContext } from 'react';
import { TagsModalContext } from 'src/Contexts/TagsModalContext';
import { ITag } from 'src/types/tags';

export default function useTags(id?: number) {
  const context = useContext(TagsModalContext);

  if (context === null) {
    throw new Error('useTags must be within a TagsModalProvider');
  }

  const {
    key,
    openTags: _openTags,
    registerTagsPosition: _registerTagsPosition,
    isTagsOpen: _isTagsOpen,
  } = context;

  const _id = id || -1;
  const isTagsOpen = _isTagsOpen && key === _id;
  const openTags = () => _openTags(_id || -1);

  const registerTagsPosition = (callback: (tags: ITag[]) => void) =>
    _registerTagsPosition(_id, callback);

  return { ...context, openTags, registerTagsPosition, isTagsOpen };
}
