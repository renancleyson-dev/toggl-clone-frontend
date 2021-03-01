import { useContext } from 'react';
import { ProjectsModalContext } from 'src/Contexts/ProjectsModalContext';

export default function useProjects(openId?: number) {
  const context = useContext(ProjectsModalContext);

  if (context === null) {
    throw new Error('useProjects must be within a ProjectsModalProvider');
  }
  const { closeModal, openCreateModal } = context;
  let { isOpen } = context;

  const customFunctions = {
    openCreateModal: () => {
      closeModal();
      openCreateModal();
    },
  };

  if (typeof openId === 'number') {
    isOpen = isOpen && openId === context.openId.current;
  }

  return { ...context, ...customFunctions, isOpen };
}
