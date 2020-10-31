import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { RiFolder2Fill, RiAddFill } from 'react-icons/ri';
import { TrackContext } from '../Contexts/TrackContext';
import { IProject } from '../types/projects';
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

const AddButtonIcon = styled.span`
  font-size: 20px;
  color: ${colors.primary};
  margin-right: 5px;
  cursor: pointer;
`;

const FolderIconWrapper = styled.div`
  color: ${({ showBox }: { showBox: boolean }) => (showBox ? colors.primary : '#a1a1a1')};
  cursor: pointer;
  line-height: 0;

  &:hover {
    color: #555;
  }
`;

const ProjectsListWrapper = styled.ul`
  list-style-type: none;
  flex: 1 1 100%;
  min-height: 100px;
  max-height: 340px;
  margin: 20px 0 10px;
  padding: 0 5px;
  overflow: auto;
`;

const ProjectItem = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background-color: ${({ hovered }: { hovered: boolean }) =>
    hovered ? ' #f1f1f1' : '#fff'};

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ProjectName = styled.span`
  color: ${({ color }: { color: string }) => color};
`;

const MiniColorCircle = styled.div`
  width: 8px;
  height: 8px;
  line-height: 0;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ color }: { color: string }) => color};
`;

const ProjectsList = () => {
  const [lastHovered, setLastHovered] = useState<number>();
  const { projects } = useContext(TrackContext);

  const projectItems = projects.map(({ id, name, color }) => (
    <ProjectItem
      key={id}
      hovered={lastHovered === id}
      onMouseOver={() => setLastHovered(id)}
    >
      <MiniColorCircle color={color} />
      <ProjectName color={color}>{name}</ProjectName>
    </ProjectItem>
  ));

  return (
    <ProjectsListWrapper>
      <ProjectItem
        key={0}
        hovered={lastHovered === 0}
        onMouseOver={() => setLastHovered(0)}
      >
        <MiniColorCircle color="#aaa" />
        <ProjectName color="#000">No Project</ProjectName>
      </ProjectItem>
      {projectItems}
    </ProjectsListWrapper>
  );
};

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
  const [position, setPosition] = useState({ top: '0', left: '0' });
  const updatedProjectModalStyles = {
    overlay: projectModalStyles.overlay,
    content: { ...projectModalStyles.content, ...position },
  };
  const handleAddButtonClick = () => {
    setIsCreateModalOpen(true);
    setIsOpen(false);
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
      <AddButtonWrapper onClick={handleAddButtonClick}>
        <AddButtonIcon>
          <RiAddFill />
        </AddButtonIcon>
        Create a new project
      </AddButtonWrapper>
    </Modal>
  );
};

export default function Projects({ actualProject }: { actualProject?: IProject }) {
  const [showBox, setShowBox] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const iconRef = useRef(null);
  const { setProjects } = useContext(TrackContext);

  return (
    <>
      <FolderIconWrapper
        ref={iconRef}
        showBox={showBox}
        onClick={() => {
          setShowBox(true);
        }}
      >
        {actualProject ? <div>{actualProject.name}</div> : <RiFolder2Fill />}
      </FolderIconWrapper>
      <CreateProjectModal
        onCreateProject={(project) => setProjects((prevState) => [...prevState, project])}
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
