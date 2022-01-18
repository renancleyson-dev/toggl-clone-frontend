import { noop } from 'lodash';
import React, { useState, useMemo, useRef, PropsWithChildren } from 'react';
import handleDynamicPosition from 'src/helpers/handleDynamicPosition';
import { ITag } from 'src/types/tags';

type Position = {
  top: string;
  left: string;
};

type PositionsRef = Record<
  number,
  { position: Position; callback: (tags: ITag[]) => void }
>;

interface ContextValue {
  key: number;
  isTagsOpen: boolean;
  openTags: (key: number) => void;
  closeTags: () => void;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  getPosition: () => { position: Position; callback: (tags: ITag[]) => void };
  registerTagsPosition: (
    key: number,
    callback: (tags: ITag[]) => void
  ) => (ref: Element | null) => void;
}

export const TagsModalContext = React.createContext<ContextValue | null>(null);

export default function TagsModalProvider({ children }: PropsWithChildren<{}>) {
  const [isTagsOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState<number>(-1);
  const [tags, setTags] = useState<ITag[]>([]);
  const positionsRef = useRef<PositionsRef>({});

  const context = useMemo(() => {
    const openTags = (key: number) => {
      setIsOpen(true);
      setKey(key);
    };

    const closeTags = () => {
      setIsOpen(false);
      setKey(-1);
    };

    const getPosition = () => {
      const value = positionsRef.current[key];

      if (!value) {
        return { position: { top: '0', left: '0' }, callback: noop };
      }

      return value;
    };

    const registerTagsPosition = (key: number, callback: (tags: ITag[]) => void) => (
      ref: Element | null
    ) => {
      if (!ref) {
        return;
      }

      const position = handleDynamicPosition(ref);
      positionsRef.current[key] = { position, callback };
    };

    return {
      key,
      getPosition,
      isTagsOpen,
      tags,
      openTags,
      closeTags,
      setTags,
      registerTagsPosition,
    };
  }, [isTagsOpen, tags, key]);

  return (
    <TagsModalContext.Provider value={context}>{children}</TagsModalContext.Provider>
  );
}
