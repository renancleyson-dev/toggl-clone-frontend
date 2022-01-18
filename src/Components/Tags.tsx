import React, { useState } from 'react';
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
import useTags from 'src/hooks/useTags';

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

const TagsList = ({ searchText, tags }: { searchText: string; tags: ITag[] }) => {
  const { tags: actualTags, setTags } = useTags();

  const tagItems = tags.map(({ id, name }) => {
    const actualIndex = actualTags?.findIndex((tag: ITag) => tag.id === id);
    const handleClick = () => {
      if (actualIndex === -1) {
        setTags([...actualTags, { id, name }]);
      } else {
        setTags([
          ...actualTags.slice(0, actualIndex),
          ...actualTags.slice(actualIndex + 1),
        ]);
      }
    };

    return (
      <TagItem
        key={id}
        name={name}
        searchText={searchText}
        checked={actualIndex !== -1}
        onClick={handleClick}
      />
    );
  });

  if (!tags.length) {
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
  const { tags, setTags } = useTracker();
  const { isTagsOpen, closeTags, getPosition, setTags: setActualTags } = useTags();
  const updatedTagsModalStyles = {
    overlay: tagsModalStyles.overlay,
    content: { ...tagsModalStyles.content, ...getPosition().position },
  };

  const filteredTags = tags.filter(({ name }) => name.includes(searchText.trim()));
  const handleCreateTag = () => {
    createTag({ name: searchText.trim() }).then((response) => {
      setTags((prevState) => [...prevState, response.data]);
      setActualTags((prevState) => [...prevState, response.data]);
    });
    setSearchText('');
  };

  const handleKeyboardCreateTags = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey && !filteredTags.length && !!searchText) {
      handleCreateTag();
    }
  };

  return (
    <Modal isOpen={isTagsOpen} style={updatedTagsModalStyles} onRequestClose={closeTags}>
      <div onKeyDown={handleKeyboardCreateTags}>
        <SearchInput>
          <Input
            autoFocus
            placeholder="Add/filter tags"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </SearchInput>
        <TagsList tags={filteredTags} searchText={searchText} />
        <AddButton
          text={`Create a tag "${searchText.trim() || ' '}"`}
          disabled={!!filteredTags.length}
          onClick={handleCreateTag}
        />
      </div>
    </Modal>
  );
}
