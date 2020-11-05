import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { RiFolder2Fill } from 'react-icons/ri';
import useDynamicModalPosition from '../hooks/useDynamicModalPosition';
import { TrackContext } from '../Contexts/TrackContext';
import { IProject } from '../types/projects';
import CreateProjectModal from './CreateProjectModal';
import { InputStyles, IconWrapper } from '../styles';
import SearchInput from './SearchInput';
import { dynamicModalStyles } from '../styles';
import AddButton from './AddButton';
import NoResourceFallback from './NoResourceFallback';

Modal.setAppElement('#root');

const projectModalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    maxWidth: '350px',
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

const FallbackWrapper = styled.div`
  padding: 25px 15px 20px;
  color: #827188;
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

const DefaultProjectItem = styled(ProjectItem)`
  margin-bottom: 20px;
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

const ProjectsList = ({ searchText }: { searchText: string }) => {
  const [lastHovered, setLastHovered] = useState<number>();
  const { projects } = useContext(TrackContext);
  const filteredProjects = projects.filter(({ name }) => name.includes(searchText));
  const handleMouseOver = (id: number) => () => setLastHovered(id);

  const defaultProjectItem = (
    <DefaultProjectItem hovered key={0} onMouseOver={handleMouseOver(0)}>
      <MiniColorCircle color="#aaa" />
      <ProjectName color="#000">No Project</ProjectName>
    </DefaultProjectItem>
  );
  const projectItems = filteredProjects.map(({ id, name, color }) => (
    <ProjectItem key={id} hovered={lastHovered === id} onMouseOver={handleMouseOver(id)}>
      <MiniColorCircle color={color} />
      <ProjectName color={color}>{name}</ProjectName>
    </ProjectItem>
  ));

  if (!filteredProjects.length) {
    return (
      <FallbackWrapper>
        <NoResourceFallback hasSearchText={!!searchText} resourceName="project" />
      </FallbackWrapper>
    );
  }

  return (
    <ProjectsListWrapper>{[defaultProjectItem, ...projectItems]}</ProjectsListWrapper>
  );
};

export default function Projects({ actualProject }: { actualProject?: IProject }) {
  const [showBox, setShowBox] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { setProjects } = useContext(TrackContext);
  const iconRef = useRef(null);
  const position = useDynamicModalPosition(iconRef, showBox);
  const updatedProjectModalStyles = {
    overlay: projectModalStyles.overlay,
    content: { ...projectModalStyles.content, ...position },
  };

  const handleIconClick = () => setShowBox(true);
  const handleAddButtonClick = () => {
    setIsCreateModalOpen(true);
    setShowBox(false);
  };

  return (
    <>
      <IconWrapper ref={iconRef} showBox={showBox} onClick={handleIconClick}>
        {actualProject ? <div>{actualProject.name}</div> : <RiFolder2Fill />}
      </IconWrapper>
      <CreateProjectModal
        onCreateProject={(project) => setProjects((prevState) => [...prevState, project])}
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        onRequestClose={() => setIsCreateModalOpen(false)}
      />
      <Modal
        isOpen={showBox}
        style={updatedProjectModalStyles}
        onRequestClose={() => setShowBox(false)}
      >
        <SearchInput>
          <Input
            autoFocus
            placeholder="Find project..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </SearchInput>
        <ProjectsList searchText={searchText} />
        <AddButton text="Create a new project" onClick={handleAddButtonClick} />
      </Modal>
    </>
  );
}
