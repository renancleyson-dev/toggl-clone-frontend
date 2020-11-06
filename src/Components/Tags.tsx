import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { BsFillTagFill } from 'react-icons/bs';
import useDynamicModalPosition from 'src/hooks/useDynamicModalPosition';
import useTracker from 'src/hooks/useTracker';
import { createTag } from 'src/resources/tags';
import { InputStyles, IconWrapper, dynamicModalStyles } from '../styles';
import AddButton from './AddButton';
import SearchInput from './SearchInput';
import NoResourceFallback from './NoResourceFallback';

Modal.setAppElement('#root');

const tagsModalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    maxWidth: '240px',
    height: 'min-content',
    padding: '15px 0 0',
    overflow: 'auto',
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
  padding: 15px 23px;
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
        <input id="" type="checkbox" checked={checked} />
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
      <input type="checkbox" checked={checked} />
      {highlightedItemSearchText}
    </TagItemWrapper>
  );
};

const TagsList = ({ searchText }: { searchText: string }) => {
  const { tags, actualTimeRecord, setActualTimeRecord } = useTracker();
  const filteredTags = tags.filter(({ name }) => name.includes(searchText.trim()));
  const tagItems = filteredTags.map(({ id, name }) => {
    const handleItemClick = () => {
      setActualTimeRecord((prevState) => {
        const tagIds = prevState.tagIds || [];
        const idIndex = tagIds?.indexOf(id);
        if (idIndex !== -1) {
          const newTagIds = [...tagIds];
          newTagIds.splice(idIndex, 1);
          return { ...prevState, tagIds: [...newTagIds] };
        }
        return { ...prevState, tagIds: [...tagIds, id] };
      });
    };

    return (
      <TagItem
        key={id}
        name={name}
        searchText={searchText}
        checked={!!actualTimeRecord.tagIds?.includes(id)}
        onClick={handleItemClick}
      />
    );
  });

  if (!filteredTags.length) {
    return (
      <FallbackWrapper>
        <NoResourceFallback hasSearchText={!!searchText} resourceName="tag" />
      </FallbackWrapper>
    );
  }
  return <TagsListWrapper>{tagItems}</TagsListWrapper>;
};

export default function Tags() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { tags, setTags } = useTracker();
  const iconRef = useRef(null);
  const position = useDynamicModalPosition(iconRef, isOpen);
  const updatedTagsModalStyles = {
    overlay: tagsModalStyles.overlay,
    content: { ...tagsModalStyles.content, ...position },
  };

  const isFinded = () => !searchText || tags.some(({ name }) => name === searchText);
  const handleClick = () => {
    createTag({ name: searchText.trim() }).then((response) =>
      setTags((prevState) => [...prevState, response.data])
    );
    setSearchText('');
  };

  return (
    <>
      <IconWrapper ref={iconRef} showBox={isOpen} onClick={() => setIsOpen(true)}>
        <BsFillTagFill />
      </IconWrapper>
      <Modal
        isOpen={isOpen}
        style={updatedTagsModalStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <SearchInput>
          <Input
            autoFocus
            placeholder="Add/filter tags"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </SearchInput>
        <TagsList searchText={searchText} />
        <AddButton
          text={`Create a tag "${searchText.trim() || ' '}"`}
          disabled={isFinded()}
          onClick={handleClick}
        />
      </Modal>
    </>
  );
}
