import React, { useContext } from 'react';
import styled from 'styled-components';
import { RiTimeFill, RiMenuFill } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';
import useTracker from 'src/hooks/useTracker';
import { UserContext } from 'src/Contexts/UserContext';
import { buttonResets, colors } from 'src/styles';

const ModeMenuWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TrashButton = styled.button`
  ${buttonResets}
`;

const TrashIcon = styled(FaTrash)`
  width: 13px;
  height: 13px;
  color: #bcbcbc;
`;

const ModeIconButton = styled.button`
  ${buttonResets}
  font-size: 20px;
  color: ${({ selected }: { selected: boolean }) =>
    selected ? colors.purpleDark : '#777'};

  &:focus {
    outline: none;
  }
`;

interface Props {
  trackerMode: boolean;
  setTrackerMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuOptions({ trackerMode, setTrackerMode }: Props) {
  const { isTracking, setIsTracking, setActualTimeRecord } = useTracker();
  const { user } = useContext(UserContext);

  const handleTrashClick = () => {
    setIsTracking(false);
    setActualTimeRecord({ userId: user.id });
  };
  const handleClickOnTimer = () => {
    setTrackerMode(true);
  };
  const handleClickOnManual = () => {
    setTrackerMode(false);
  };

  if (isTracking) {
    return (
      <TrashButton onClick={handleTrashClick} aria-label="remove time record">
        <TrashIcon />
      </TrashButton>
    );
  }

  return (
    <ModeMenuWrapper>
      <ModeIconButton selected={trackerMode} onClick={handleClickOnTimer}>
        <RiTimeFill />
      </ModeIconButton>
      <ModeIconButton selected={!trackerMode} onClick={handleClickOnManual}>
        <RiMenuFill />
      </ModeIconButton>
    </ModeMenuWrapper>
  );
}
