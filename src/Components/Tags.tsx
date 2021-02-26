import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { BsFillTagFill } from 'react-icons/bs';
import useDynamicPositionModal from 'src/hooks/useDynamicPositionModal';
import useTracker from 'src/hooks/useTracker';
import { createTag } from 'src/resources/tags';
import { ITag } from 'src/types/tags';
import { InputStyles, IconWrapper, dynamicModalStyles, colors } from '../styles';
import AddButton from './AddButton';
import SearchInput from './SearchInput';
import NoResourceFallback from './NoResourceFallback';
import TagCheckBox from './TagCheckBox';

Modal.setAppElement('#root');

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

const TagIcon = styled.div`
  padding: 5px;
  border-radius: 8px;
  font-size: inherit;
  background-color: ${({ hasTags }: { hasTags: boolean }) =>
    hasTags ? 'rgba(196, 99, 186, 0.2)' : 'transparent'};
  color: ${({ hasTags }: { hasTags: boolean }) => (hasTags ? colors.primary : 'inherit')};
`;

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
  actualTags,
  tags,
  handleChangeOnTags,
}: {
  searchText: string;
  actualTags?: ITag[];
  tags: ITag[];
  handleChangeOnTags: (tag: ITag) => unknown;
}) => {
  const tagItems = tags.map(({ id, name }) => (
    <TagItem
      key={id}
      name={name}
      searchText={searchText}
      checked={!!actualTags?.some((tag) => tag.id === id)}
      onClick={() => handleChangeOnTags({ id, name })}
    />
  ));

  if (!tags.length) {
    return (
      <FallbackWrapper>
        <NoResourceFallback hasSearchText={!!searchText} resourceName="tag" />
      </FallbackWrapper>
    );
  }
  return <TagsListWrapper>{tagItems}</TagsListWrapper>;
};

interface Props {
  actualTags?: ITag[];
  handleChangeOnTags: (tag: ITag) => unknown;
}

export default function Tags({ actualTags, handleChangeOnTags }: Props) {
  const [searchText, setSearchText] = useState('');
  const { tags, setTags } = useTracker();
  const iconRef = useRef(null);
  const { position, isOpen, setIsOpen, handleOpen } = useDynamicPositionModal(
    iconRef,
    modalContentHeight
  );
  const updatedTagsModalStyles = {
    overlay: tagsModalStyles.overlay,
    content: { ...tagsModalStyles.content, ...position },
  };

  const filteredTags = tags.filter(({ name }) => name.includes(searchText.trim()));
  const handleCreateTag = () => {
    createTag({ name: searchText.trim() }).then((response) => {
      setTags((prevState) => [...prevState, response.data]);
      handleChangeOnTags(response.data);
    });
    setSearchText('');
  };

  const handleKeyboardCreateTags = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey && !filteredTags.length && !!searchText) {
      handleCreateTag();
    }
  };

  return (
    <>
      <IconWrapper ref={iconRef} showBox={isOpen} onClick={handleOpen}>
        <TagIcon hasTags={!!actualTags?.length}>
          <BsFillTagFill />
        </TagIcon>
      </IconWrapper>
      <Modal
        isOpen={isOpen}
        style={updatedTagsModalStyles}
        onRequestClose={() => setIsOpen(false)}
      >
        <div onKeyDown={handleKeyboardCreateTags}>
          <SearchInput>
            <Input
              autoFocus
              placeholder="Add/filter tags"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </SearchInput>
          <TagsList
            actualTags={actualTags}
            tags={filteredTags}
            searchText={searchText}
            handleChangeOnTags={handleChangeOnTags}
          />
          <AddButton
            text={`Create a tag "${searchText.trim() || ' '}"`}
            disabled={!!filteredTags.length}
            onClick={handleCreateTag}
          />
        </div>
      </Modal>
    </>
  );
}
