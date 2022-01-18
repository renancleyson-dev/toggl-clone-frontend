import { noop } from 'lodash';
import React, { useMemo, useState, useRef } from 'react';
import handleDynamicPosition from 'src/helpers/handleDynamicPosition';
import { IProject } from 'src/types/projects';

type Position = {
  top: string;
  left: string;
};

type PositionsRef = Record<
  number,
  { position: Position; callback: (project: IProject) => void }
>;

interface ContextValue {
  key: number;
  isProjectsOpen: boolean;
  isCreateModalOpen: boolean;
  getPosition: () => { position: Position; callback: (project: IProject) => void };
  registerProjectsPosition: (
    key: number,
    callback: (project: IProject) => void
  ) => (ref: Element | null) => void;
  project?: IProject;
  setProject: (project?: IProject) => void;
  openProjects: (key: number) => void;
  closeProjects: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

export const ProjectsModalContext = React.createContext<ContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function ProjectsModalProvider({ children }: Props) {
  const [key, setKey] = useState<number>(-1);
  const [isProjectsOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [project, setProject] = useState<IProject>();
  const positionsRef = useRef<PositionsRef>({});

  const contextValue = useMemo(() => {
    const handleSetProject = (project: IProject | undefined) => {
      setProject(project);
    };

    const openProjects = (key: number) => {
      setIsOpen(true);
      setKey(key);
    };

    const closeProjects = () => {
      setIsOpen(false);
      setKey(-1);
    };

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const getPosition = () => {
      const value = positionsRef.current[key];

      if (!value) {
        return { position: { top: '0', left: '0' }, callback: noop };
      }

      return value;
    };

    const registerProjectsPosition = (
      key: number,
      callback: (project: IProject) => void
    ) => (ref: Element | null) => {
      if (!ref) {
        return;
      }

      const position = handleDynamicPosition(ref);
      positionsRef.current[key] = { position, callback };
    };

    return {
      key,
      isProjectsOpen,
      isCreateModalOpen,
      project,
      openProjects,
      closeProjects,
      openCreateModal,
      closeCreateModal,
      getPosition,
      registerProjectsPosition,
      setProject: handleSetProject,
    };
  }, [isProjectsOpen, project, isCreateModalOpen, key]);

  return (
    <ProjectsModalContext.Provider value={contextValue}>
      {children}
    </ProjectsModalContext.Provider>
  );
}
