import { useCallback, useEffect } from 'react';
import { IProject } from 'src/types/projects';
import handleDynamicPosition from '../helpers/handleDynamicPosition';
import useProjectsModal from './useProjects';

export default function useProjectsOpen(
  onProjectChange: (project?: IProject) => void,
  ref: React.MutableRefObject<Element | null>,
  timeRecordId: number,
  actualProject?: IProject
) {
  const {
    isOpen,
    openModal,
    setPosition,
    project,
    setProject,
    openId,
  } = useProjectsModal();
  const handleOnProjectChange = useCallback(
    (newProject?: IProject) => onProjectChange && onProjectChange(newProject),
    [onProjectChange]
  );

  useEffect(() => {
    const isOpenedWithActualProject = openId.current === timeRecordId;
    const hasChangedProject = actualProject?.id !== project?.id;
    if (isOpenedWithActualProject && hasChangedProject && !isOpen) {
      handleOnProjectChange(project);
      openId.current = undefined;
    }
  }, [project, isOpen, actualProject, handleOnProjectChange, openId, timeRecordId]);

  const handleOpen = () => {
    if (!ref.current) {
      return;
    }
    setProject(actualProject);
    openId.current = timeRecordId;
    openModal();

    const newPosition = handleDynamicPosition(ref.current);
    if (newPosition) {
      setPosition(newPosition);
    }
  };

  return handleOpen;
}
