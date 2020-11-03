import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { BsFillTagFill } from 'react-icons/bs';
import { InputStyles, IconWrapper, dynamicModalStyles } from '../styles';
import SearchInput from './SearchInput';
import useDynamicModalPosition from 'src/hooks/useDynamicModalPosition';
import AddButton from './AddButton';

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
`;

const TagsList = () => {
  return <TagsListWrapper></TagsListWrapper>;
};

export default function Tags() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const iconRef = useRef(null);
  const position = useDynamicModalPosition(iconRef, isOpen);
  const updatedTagsModalStyles = {
    overlay: tagsModalStyles.overlay,
    content: { ...tagsModalStyles.content, ...position },
  };

  const handleClick = () => {};

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
            onChange={(event) => setSearchText(event.target.value)}
          />
        </SearchInput>
        <TagsList />
        <AddButton text={`Create a tag "${searchText || ' '}"`} onClick={handleClick} />
      </Modal>
    </>
  );
}
