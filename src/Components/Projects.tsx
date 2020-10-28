import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { RiFolder2Fill, RiAddFill } from 'react-icons/ri';
import { positionedModalStyles, AddButtonWrapper, colors, InputStyles } from '../styles';
import SearchInput from './SearchInput';
import CreateProjectModal from './CreateProjectModal';

const projectModalStyles = {
  overlay: positionedModalStyles.overlay,
  content: {
    ...positionedModalStyles.content,
    maxWidth: '330px',
    height: 'min-content',
    maxHeight: '600px',
    padding: '15px 0 0',
    overflow: 'auto',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
};

const Input = styled.input`
  ${InputStyles}
`;

const FolderIconWrapper = styled.div`
  color: ${({ showBox }: { showBox: boolean }) => (showBox ? colors.primary : '#a1a1a1')};
  cursor: pointer;
  line-height: 0;

  &:hover {
    color: #555;
  }
`;

const ProjectsList = styled.ul`
  list-style-type: none;
  flex: 1 1 100%;
  min-height: 300px;
  margin: 0;
  padding: 0;
`;

const AddButtonIcon = styled.span`
  font-size: 20px;
  color: ${colors.primary};
  margin-right: 5px;
  cursor: pointer;
`;

interface ProjectsBoxProps extends Modal.Props {
  iconRef: React.MutableRefObject<any>;
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectsBox = ({
  setIsCreateModalOpen,
  iconRef,
  setIsOpen,
  ...modalProps
}: ProjectsBoxProps) => {
  const [position, setPosition] = useState({
    top: '0',
    left: '0',
  });
  const updatedProjectModalStyles = {
    overlay: projectModalStyles.overlay,
    content: { ...projectModalStyles.content, ...position },
  };

  useEffect(() => {
    if (iconRef.current instanceof Element && modalProps.isOpen) {
      const { top, left } = iconRef.current.getBoundingClientRect();

      setPosition({
        top: `${top + window.scrollY + 35}px`,
        left: `${left + window.scrollX - 100}px`,
      });
    }
  }, [iconRef, modalProps.isOpen]);

  return (
    <Modal style={updatedProjectModalStyles} {...modalProps}>
      <SearchInput>
        <Input autoFocus placeholder="Find project..." />
      </SearchInput>
      <ProjectsList />
      <AddButtonWrapper
        onClick={() => {
          setIsCreateModalOpen(true);
          setIsOpen(false);
        }}
      >
        <AddButtonIcon>
          <RiAddFill />
        </AddButtonIcon>
        Create a new project
      </AddButtonWrapper>
    </Modal>
  );
};

export default function Projects() {
  const [showBox, setShowBox] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const iconRef = useRef(null);

  return (
    <>
      <FolderIconWrapper
        ref={iconRef}
        showBox={showBox}
        onClick={() => {
          setShowBox(true);
        }}
      >
        <RiFolder2Fill />
      </FolderIconWrapper>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      />
      <ProjectsBox
        isOpen={showBox}
        iconRef={iconRef}
        setIsOpen={setShowBox}
        onRequestClose={() => setShowBox(false)}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
    </>
  );
}
