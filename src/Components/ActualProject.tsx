import React from 'react';
import styled from 'styled-components';
import { RiFolder2Fill } from 'react-icons/ri';
import AddButton from './AddButton';
import { projectNameStyles, MiniColorCircle, ProjectName } from '../styles';
import { IProject } from 'src/types/projects';
import useTracker from 'src/hooks/useTracker';
import { useProjectsConsumer } from 'src/hooks/useProjects';

const NoProjectsAddButton = styled(AddButton)`
  border: none;
  border-radius: 8px;
  padding: 5px 12px 5px 8px;

  &:not(:disabled):hover {
    background-color: #f1f1f1;
  }
`;

const ActualProjectWrapper = styled.div`
  ${projectNameStyles}
  font-size: 14px;

  &:hover {
    background-color: initial;
  }
`;

interface Props {
  project?: IProject;
}

export default function ActualProject({ project }: Props) {
  const { projects } = useTracker();
  const { openCreateModal } = useProjectsConsumer();

  if (!projects.length) {
    return <NoProjectsAddButton text="Create a project" onClick={openCreateModal} />;
  }

  if (!project) {
    return <RiFolder2Fill />;
  }

  return (
    <ActualProjectWrapper>
      <MiniColorCircle color={project.color} />
      <ProjectName color={project.color}>{project.name}</ProjectName>
    </ActualProjectWrapper>
  );
}
