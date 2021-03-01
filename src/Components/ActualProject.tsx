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
  actualProject?: IProject;
  handleIconClick: () => void;
  handleAddButtonClick: () => void;
}

export default function ActualProject({
  actualProject,
  handleIconClick,
  handleAddButtonClick,
}: Props) {
  const { projects } = useTracker();

  if (!projects.length) {
    return <NoProjectsAddButton text="Create a project" onClick={handleAddButtonClick} />;
  }

  if (!actualProject) {
    return <RiFolder2Fill onClick={handleIconClick} />;
  }

  return (
    <ActualProjectWrapper onClick={handleIconClick}>
      <MiniColorCircle color={actualProject.color} />
      <ProjectName color={actualProject.color}>{actualProject.name}</ProjectName>
    </ActualProjectWrapper>
  );
}
