import React, { PropsWithChildren, useMemo, useState } from 'react';
import useMultiPosition, { Position, Register } from 'src/hooks/shared/useMultiPosition';
import { IProject } from 'src/types/projects';

export type ProjectCallback = (project?: IProject) => void;

interface ContextValue {
  key: number;
  clearKey: (project?: IProject) => void;
  currentProject?: IProject;
  isCreateModalOpen: boolean;
  getPosition: () => Position;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  registerProjectsPosition: (
    key: number,
    callback: ProjectCallback,
    project?: IProject
  ) => Register;
}

export const ProjectsModalContext = React.createContext<ContextValue | null>(null);

export default function ProjectsModalProvider({ children }: PropsWithChildren<{}>) {
  const { key, clearKey, getPosition, registerPosition } = useMultiPosition<
    [IProject | undefined]
  >();

  const [currentProject, setProject] = useState<IProject | undefined>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const context = useMemo(() => {
    const registerProjectsPosition = (
      key: number,
      callback: ProjectCallback,
      project?: IProject
    ) => {
      const props = registerPosition(key, callback);

      const onClick = () => {
        setProject(project);
        props.onClick();
      };

      return { ...props, onClick };
    };

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    return {
      key,
      clearKey,
      currentProject,
      isCreateModalOpen,
      openCreateModal,
      closeCreateModal,
      getPosition,
      registerProjectsPosition,
    };
  }, [currentProject, isCreateModalOpen, key, clearKey, getPosition, registerPosition]);

  return (
    <ProjectsModalContext.Provider value={context}>
      {children}
    </ProjectsModalContext.Provider>
  );
}
