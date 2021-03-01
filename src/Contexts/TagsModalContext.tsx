import React, { useState, useMemo, useRef } from 'react';
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
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
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
      setTags,
      setPosition: handleSetPosition,
    }),
    [isOpen, tags, position]
  );

  return (
    <TagsModalContext.Provider value={contextValue}>{children}</TagsModalContext.Provider>
  );
}
