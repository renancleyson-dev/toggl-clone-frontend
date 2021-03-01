import React, { useMemo, useState, useRef } from 'react';
import { IProject } from 'src/types/projects';

type Position = {
  top: string;
  left: string;
};

interface contextValue {
  isOpen: boolean;
  isCreateModalOpen: boolean;
  position: Position;
  setPosition: (position: Position) => void;
  project?: IProject;
  setProject: (project?: IProject) => void;
  openId: React.MutableRefObject<number | undefined>;
  openModal: () => void;
  closeModal: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

export const ProjectsModalContext = React.createContext<contextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function ProjectsModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [position, setPosition] = useState({ top: '0', left: '0' });
  const [project, setProject] = useState<IProject>();
  const openId = useRef<number>();

  const handleSetProject = (project: IProject | undefined) => {
    setProject(project);
  };

  const handleSetPosition = (position: Position) => {
    setPosition(position);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      isCreateModalOpen,
      position,
      project,
      openId,
      openModal,
      closeModal,
      openCreateModal,
      closeCreateModal,
      setPosition: handleSetPosition,
      setProject: handleSetProject,
    }),
    [isOpen, project, isCreateModalOpen, position]
  );

  return (
    <ProjectsModalContext.Provider value={contextValue}>
      {children}
    </ProjectsModalContext.Provider>
  );
}
