import { useContext } from 'react';
import { ProjectsModalContext } from 'src/Contexts/ProjectsModalContext';
import { IProject } from 'src/types/projects';

export default function useProjects(id?: number) {
  const context = useContext(ProjectsModalContext);

  if (context === null) {
    throw new Error('useProjects must be within a ProjectsModalProvider');
  }

  const {
    key,
    openProjects: _openProjects,
    registerProjectsPosition: _registerProjectsPosition,
    isProjectsOpen: _isProjectsOpen,
  } = context;

  const _id = id || -1;
  const isProjectsOpen = _isProjectsOpen && key === _id;
  const openProjects = () => _openProjects(_id || -1);

  const registerProjectsPosition = (callback: (project: IProject) => void) =>
    _registerProjectsPosition(_id, callback);

  return { ...context, openProjects, registerProjectsPosition, isProjectsOpen };
}
