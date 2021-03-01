import { useEffect, useCallback } from 'react';
import handleDynamicPosition from 'src/helpers/handleDynamicPosition';
import { ITag } from 'src/types/tags';
import useTags from './useTags';

export default function useTagsOpen(
  onTagsChange: (tags: ITag[]) => void,
  ref: React.MutableRefObject<Element | null>,
  timeRecordId: number,
  actualTags: ITag[] = []
) {
  const { isOpen, openModal, tags, setTags, openId, setPosition } = useTags();
  const handleOnTagsChange = useCallback(
    (tags: ITag[]) => onTagsChange && onTagsChange(tags),
    [onTagsChange]
  );

  useEffect(() => {
    const isOpenWithActualId = openId.current === timeRecordId;
    if (isOpenWithActualId && !isOpen) {
      handleOnTagsChange(tags);
      openId.current = undefined;
    }
  }, [tags, isOpen, handleOnTagsChange, openId, timeRecordId]);

  const handleOpen = () => {
    if (!ref.current) {
      return;
    }
    setTags(actualTags);
    openId.current = timeRecordId;
    openModal();

    const newPosition = handleDynamicPosition(ref.current);
    if (newPosition) {
      setPosition(newPosition);
    }
  };

  return handleOpen;
}
