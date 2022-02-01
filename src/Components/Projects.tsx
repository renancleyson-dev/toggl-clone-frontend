import React, { useEffect, useMemo, useState } from 'react';
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
import { useProjectsConsumer } from 'src/hooks/useProjects';
import { useMultiPositionConsumer } from 'src/hooks/shared/useMultiPosition';
import useScrollToModal from 'src/hooks/shared/useScrollToModal';

const modalContentHeight = 455;
const parentSelector = () => document.getElementById('project-content')!;

const projectModalStyles = {
  overlay: dynamicModalStyles.overlay,
  content: {
    ...dynamicModalStyles.content,
    maxWidth: '350px',
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
  const { currentProject, clearKey } = useProjectsConsumer();
  const currentId = currentProject || 0;

  const isItemHovered = (id: number) => lastHovered === id || currentId === id;
  const handleMouseOver = (id: number) => () => setLastHovered(id);
  const handleClose = (project?: IProject) => () => clearKey(project);

  const defaultProjectItem = (
    <DefaultProjectItem
      key={0}
      hovered={isItemHovered(0)}
      onMouseOver={handleMouseOver(0)}
      onClick={handleClose()}
    >
      <MiniColorCircle color="#aaa" />
      <ProjectName color="#000">No Project</ProjectName>
    </DefaultProjectItem>
  );

  const projectItems = projects.map((project) => (
    <ProjectItem
      key={project.id}
      hovered={isItemHovered(project.id)}
      onMouseOver={handleMouseOver(project.id)}
      onClick={handleClose(project)}
    >
      <MiniColorCircle color={project.color} />
      <ProjectName color={project.color}>{project.name}</ProjectName>
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
    key,
    currentProject,
    getPosition,
    isCreateModalOpen,
    clearKey,
    openCreateModal,
    closeCreateModal,
  } = useProjectsConsumer();
  const { isOpen, position } = useMultiPositionConsumer(key, getPosition);
  const { ref, overflow } = useScrollToModal(isOpen);

  const filteredProjects = useMemo(
    () => projects.filter(({ name }) => name.includes(searchText)),
    [projects, searchText]
  );

  useEffect(() => {
    Modal.setAppElement(parentSelector());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchText('');
    }
  }, [isOpen]);

  const updatedProjectModalStyles = {
    overlay: { ...projectModalStyles.overlay, overflow },
    content: { ...projectModalStyles.content, ...position },
  };

  const handleAddButtonClick = () => openCreateModal();
  const handleOnRequestClose = () => clearKey(currentProject);

  const handleCreateProject = (project: IProject) =>
    setProjects((prevState) => [...prevState, project]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);

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
        isOpen={isOpen && !isCreateModalOpen}
        style={updatedProjectModalStyles}
        parentSelector={parentSelector}
        onRequestClose={handleOnRequestClose}
      >
        <div ref={ref} onKeyDown={handleKeyboardCreateProject}>
          <SearchInput>
            <Input
              autoFocus
              placeholder="Find project..."
              value={searchText}
              onChange={onSearch}
            />
          </SearchInput>
          <ProjectsList searchText={searchText} projects={filteredProjects} />
          <AddButton text="Create a new project" onClick={handleAddButtonClick} />
        </div>
      </Modal>
    </>
  );
}
