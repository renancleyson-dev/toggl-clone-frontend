import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ITag } from 'src/types/tags';

type Position = {
  top: string;
  left: string;
};

interface contextValue {
  position: Position;
  openId: React.MutableRefObject<number | undefined>;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  tags: ITag[];
  setTags: (tags: ITag[]) => void;
  setPosition: (position: Position) => void;
}

export const TagsModalContext = React.createContext<contextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TagsModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: '0', left: '0' });
  const [tags, setTags] = useState<ITag[]>([]);
  const openId = useRef<number>();

  const handleSetTags = useCallback((newTags: ITag[]) => {
    setTags(newTags);
  }, []);

  const handleSetPosition = (position: Position) => {
    setPosition(position);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const contextValue = useMemo(
    () => ({
      position,
      openId,
      isOpen,
      openModal,
      closeModal,
      tags,
      setTags: handleSetTags,
      setPosition: handleSetPosition,
    }),
    [isOpen, handleSetTags, tags, position]
  );

  return (
    <TagsModalContext.Provider value={contextValue}>{children}</TagsModalContext.Provider>
  );
}
