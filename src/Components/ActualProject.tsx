import React from 'react';
import styled from 'styled-components';
import { RiFolder2Fill } from 'react-icons/ri';
import AddButton from './AddButton';
import { projectNameStyles, MiniColorCircle, ProjectName } from '../styles';
import { IProject } from 'src/types/projects';
import useTracker from 'src/hooks/useTracker';

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
  handleAddButtonClick: () => void;
}

export default function ActualProject({ project, handleAddButtonClick }: Props) {
  const { projects } = useTracker();

  if (!projects.length) {
    return <NoProjectsAddButton text="Create a project" onClick={handleAddButtonClick} />;
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
