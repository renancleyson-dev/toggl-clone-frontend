import React, { useState, useMemo, PropsWithChildren } from 'react';
import useMultiPosition, { Position, Register } from 'src/hooks/shared/useMultiPosition';
import { ITag } from 'src/types/tags';

interface ContextValue {
  key: number;
  clearKey: (tags: ITag[]) => void;
  currentTags: ITag[];
  getPosition: () => Position;
  registerTagsPosition: (
    key: number,
    callback: (tags: ITag[]) => void,
    tags: ITag[]
  ) => Register;
}

export const TagsModalContext = React.createContext<ContextValue | null>(null);

export default function TagsModalProvider({ children }: PropsWithChildren<{}>) {
  const [currentTags, setTags] = useState<ITag[]>([]);
  const { key, clearKey, getPosition, registerPosition } = useMultiPosition<[ITag[]]>();

  const context = useMemo(() => {
    const registerTagsPosition = (
      key: number,
      callback: (tags: ITag[]) => void,
      tags: ITag[]
    ) => {
      const props = registerPosition(key, callback);

      const onClick = () => {
        setTags(tags);
        props.onClick();
      };

      return { ...props, onClick };
    };

    return {
      key,
      currentTags,
      getPosition,
      clearKey,
      registerTagsPosition,
    };
  }, [currentTags, key, getPosition, clearKey, registerPosition]);

  return (
    <TagsModalContext.Provider value={context}>{children}</TagsModalContext.Provider>
  );
}
