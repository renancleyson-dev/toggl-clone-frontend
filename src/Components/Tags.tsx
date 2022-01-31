import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import useTracker from 'src/hooks/useTracker';
import { createTag } from 'src/resources/tags';
import { ITag } from 'src/types/tags';
import { InputStyles, dynamicModalStyles } from '../styles';
import AddButton from './AddButton';
import SearchInput from './SearchInput';
import NoResourceFallback from './NoResourceFallback';
import TagCheckBox from './TagCheckBox';
import { useTagsConsumer } from 'src/hooks/useTags';
import { useMultiPositionConsumer } from 'src/hooks/shared/useMultiPosition';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const modalContentHeight = 360;

const tagsModalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    maxWidth: '240px',
    height: `${modalContentHeight}px`,
    padding: '15px 0 0',
    overflow: 'hidden',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
};

const Input = styled.input`
  ${InputStyles}
`;

const TagsListWrapper = styled.ul`
  height: 250px;
  padding: 5px;
  overflow: auto;
`;

const TagItemWrapper = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:first-child {
    background-color: #f1f1f1;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FallbackWrapper = styled.div`
  padding: 0px 23px;
  margin: 14px 0;
  height: 250px;
  color: #827188;
`;

const HighlightedTagItemName = styled.span`
  background-color: #eaeaea;
`;

interface TagItemProps {
  name: string;
  searchText: string;
  checked: boolean;
  onClick: () => void;
}

const TagItem = ({ name, searchText, checked, onClick }: TagItemProps) => {
  if (!searchText) {
    return (
      <TagItemWrapper onClick={onClick}>
        <TagCheckBox checked={checked} onChange={onClick} />
        {name}
      </TagItemWrapper>
    );
  }

  const withoutSubStringPieces = name.split(searchText);
  const highlightedItemSearchText = withoutSubStringPieces.reduce(
    (acc: Array<string | JSX.Element>, piece, index, currentArray) => {
      if (!piece && index !== currentArray.length - 1) {
        const highlightedPiece = (
          <HighlightedTagItemName>{searchText}</HighlightedTagItemName>
        );

        return [...acc, highlightedPiece];
      }

      return [...acc, piece];
    },
    []
  );

  return (
    <TagItemWrapper onClick={onClick}>
      <TagCheckBox checked={checked} />
      {highlightedItemSearchText}
    </TagItemWrapper>
  );
};

const TagsList = ({
  searchText,
  list,
  value,
  onChange,
}: {
  searchText: string;
  list: ITag[];
  value: ITag[];
  onChange: (index: number, tag: ITag) => void;
}) => {
  const tagItems = list.map((tag) => {
    const actualIndex = value.findIndex(({ id }) => tag.id === id);
    const handleClick = () => onChange(actualIndex, tag);

    return (
      <TagItem
        key={tag.id}
        name={tag.name}
        searchText={searchText}
        checked={actualIndex !== -1}
        onClick={handleClick}
      />
    );
  });

  if (!list.length) {
    return (
      <FallbackWrapper>
        <NoResourceFallback hasSearchText={!!searchText} resourceName="tag" />
      </FallbackWrapper>
    );
  }

  return <TagsListWrapper>{tagItems}</TagsListWrapper>;
};

export default function Tags() {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

  const { tags, setTags } = useTracker();
  const { currentTags, key, clearKey, getPosition } = useTagsConsumer();
  const { isOpen, position } = useMultiPositionConsumer(key, getPosition);

  const filteredTags = useMemo(
    () => tags.filter(({ name }) => name.includes(searchText.trim())),
    [tags, searchText]
  );

  useEffect(() => {
    setSelectedTags(currentTags);
  }, [currentTags]);

  useEffect(() => {
    if (isOpen) {
      setSearchText('');
    }
  }, [isOpen]);

  const updatedTagsModalStyles = {
    overlay: tagsModalStyles.overlay,
    content: { ...tagsModalStyles.content, ...position },
  };

  const handleRequestClose = () => clearKey(selectedTags);
  const selectTag = (tag: ITag) => setSelectedTags((prevTags) => [...prevTags, tag]);

  const unselectTag = (index: number) =>
    setSelectedTags((prevTags) => [
      ...prevTags.slice(0, index),
      ...prevTags.slice(index + 1),
    ]);

  const handleTagsOnChange = (index: number, tag: ITag) =>
    index === -1 ? selectTag(tag) : unselectTag(index);

  const handleCreateTag = async () => {
    const { data } = await createTag({ name: searchText.trim() });
    selectTag(data);
    setTags((prevState) => [...prevState, data]);
    setSearchText('');
  };

  const handleKeyboardCreateTags = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey && !filteredTags.length && !!searchText) {
      handleCreateTag();
    }
  };

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);

  return (
    <Modal
      isOpen={isOpen}
      style={updatedTagsModalStyles}
      onRequestClose={handleRequestClose}
    >
      <div onKeyDown={handleKeyboardCreateTags}>
        <SearchInput>
          <Input
            autoFocus
            placeholder="Add/filter tags"
            value={searchText}
            onChange={handleSearchOnChange}
          />
        </SearchInput>
        <TagsList
          list={filteredTags}
          value={selectedTags}
          onChange={handleTagsOnChange}
          searchText={searchText}
        />
        <AddButton
          text={`Create a tag "${searchText.trim() || ' '}"`}
          disabled={!!filteredTags.length}
          onClick={handleCreateTag}
        />
      </div>
    </Modal>
  );
}
