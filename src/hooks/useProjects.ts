import { useContext } from 'react';
import { ProjectCallback, ProjectsModalContext } from 'src/Contexts/ProjectsModalContext';
import { IProject } from 'src/types/projects';

export function useProjectsConsumer() {
  const context = useContext(ProjectsModalContext);

  if (context === null) {
    throw new Error('useProjects must be within a ProjectsModalProvider');
  }

  return context;
}

export default function useProjects(id = 0, project?: IProject) {
  const context = useProjectsConsumer();
  const { key, registerProjectsPosition: _registerProjectsPosition } = context;

  const isProjectsOpen = key === id;
  const registerProjectsPosition = (callback: ProjectCallback) =>
    _registerProjectsPosition(id, callback, project);

  return { ...context, registerProjectsPosition, isProjectsOpen };
}
