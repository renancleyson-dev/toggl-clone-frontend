import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import useTracker from '../hooks/useTracker';
import { IProject } from '../types/projects';
import CreateProjectModal from './CreateProjectModal';
import { InputStyles } from '../styles';
import SearchInput from './SearchInput';
import {
  dynamicModalStyles,
  projectNameStyles,
  ProjectName,
  MiniColorCircle,
} from '../styles';
import AddButton from './AddButton';
import NoResourceFallback from './NoResourceFallback';
import useProjects from 'src/hooks/useProjects';

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const modalContentHeight = 455;

const projectModalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    maxWidth: '350px',
    height: `${modalContentHeight}px`,
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
  padding: 15px 15px 20px;
  margin: 14px 0;
  height: 340px;
  color: #827188;
`;

const ProjectsListWrapper = styled.ul`
  list-style-type: none;
  flex: 1 1 100%;
  height: 340px;
  margin: 20px 0 10px;
  padding: 0 5px;
  overflow: auto;
`;

const ProjectItem = styled.li`
  ${projectNameStyles}
  padding: 5px 10px;
`;

const DefaultProjectItem = styled(ProjectItem)`
  margin-bottom: 20px;
`;

interface ProjectsListProps {
  searchText: string;
  projects: IProject[];
}

const ProjectsList = ({ searchText, projects }: ProjectsListProps) => {
  const [lastHovered, setLastHovered] = useState<number>(0);
  const { closeModal, project, setProject } = useProjects();
  const handleMouseOver = (id: number) => () => setLastHovered(id);

  const defaultProjectItem = (
    <DefaultProjectItem
      hovered={lastHovered === 0 || !project?.id}
      key={0}
      onMouseOver={handleMouseOver(0)}
      onClick={() => {
        closeModal();
        setProject();
      }}
    >
      <MiniColorCircle color="#aaa" />
      <ProjectName color="#000">No Project</ProjectName>
    </DefaultProjectItem>
  );
  const projectItems = projects.map(({ id, name, color }) => (
    <ProjectItem
      key={id}
      onClick={() => {
        closeModal();
        setProject({ id, name, color });
      }}
      hovered={lastHovered === id || project?.id === id}
      onMouseOver={handleMouseOver(id)}
    >
      <MiniColorCircle color={color} />
      <ProjectName color={color}>{name}</ProjectName>
    </ProjectItem>
  ));

  if (!projects.length) {
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

export default function Projects() {
  const [searchText, setSearchText] = useState('');
  const [initialName, setInitialName] = useState('');

  const { projects, setProjects } = useTracker();

  const {
    position,
    isOpen,
    isCreateModalOpen,
    closeModal,
    openCreateModal,
    closeCreateModal,
    setProject,
  } = useProjects();

  const filteredProjects = projects.filter(({ name }) => name.includes(searchText));
  const updatedProjectModalStyles = {
    overlay: projectModalStyles.overlay,
    content: { ...projectModalStyles.content, ...position },
  };

  const handleCreateProject = (project: IProject) => {
    setProjects((prevState) => [...prevState, project]);
    setProject(project);
  };

  const handleAddButtonClick = () => {
    openCreateModal();
  };

  const handleKeyboardCreateProject = (event: React.KeyboardEvent) => {
    const { key, ctrlKey } = event;
    if (key === 'Enter' && ctrlKey && !filteredProjects.length && !!searchText) {
      openCreateModal();
      setInitialName(searchText);
    }
  };

  return (
    <>
      <CreateProjectModal
        onCreateProject={handleCreateProject}
        isOpen={isCreateModalOpen}
        closeModal={closeCreateModal}
        initialName={initialName}
      />
      <Modal
        isOpen={isOpen}
        style={updatedProjectModalStyles}
        onRequestClose={closeModal}
      >
        <div onKeyDown={handleKeyboardCreateProject}>
          <SearchInput>
            <Input
              autoFocus
              placeholder="Find project..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </SearchInput>
          <ProjectsList searchText={searchText} projects={filteredProjects} />
          <AddButton text="Create a new project" onClick={handleAddButtonClick} />
        </div>
      </Modal>
    </>
  );
}
