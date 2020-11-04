import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { BsFillTagFill } from 'react-icons/bs';
import { InputStyles, IconWrapper, dynamicModalStyles } from '../styles';
import SearchInput from './SearchInput';
import useDynamicModalPosition from 'src/hooks/useDynamicModalPosition';
import AddButton from './AddButton';
import { TrackContext } from 'src/Contexts/TrackContext';
import { createTag } from 'src/resources/tags';

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
  height: 215px;
  padding: 5px;
  overflow: auto;
`;

const TagItemWrapper = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HighlightedTagItemName = styled.span`
  background-color: #eee;
`;

const TagItem = ({ name, searchText }: { name: string; searchText: string }) => {
  const withoutSubStringPieces = name.split(searchText);
  const highlightedItemSearchText = withoutSubStringPieces.reduce(
    (acc: Array<string | JSX.Element>, piece) => {
      const highlightedPiece = (
        <HighlightedTagItemName>{searchText}</HighlightedTagItemName>
      );

      return [...acc, piece, highlightedPiece];
    },
    []
  );

  return <TagItemWrapper>{highlightedItemSearchText}</TagItemWrapper>;
};

const TagsList = ({ searchText }: { searchText: string }) => {
  const { tags } = useContext(TrackContext);
  const filteredTags = tags.filter(({ name }) => name.includes(searchText.trim()));
  const tagItems = filteredTags.map(({ id, name }) => (
    <TagItem key={id} name={name} searchText={searchText}></TagItem>
  ));

  if (!tags.length) {
    return <div></div>;
  }
  return <TagsListWrapper>{tagItems}</TagsListWrapper>;
};

export default function Tags() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { tags, setTags } = useContext(TrackContext);
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
