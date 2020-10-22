import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { RiFolder2Fill, RiAddFill } from 'react-icons/ri';
import useOnClickOutside from 'src/hooks/useOutsideCallback';
import { StackedBox, AddButtonWrapper, colors } from '../styles';
import SearchInput, { Input } from './SearchInput';

const UnshowedWrapper = styled.div`
  cursor: pointer;
`;

const ProjectsWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const ProjectsStackedBox = styled(StackedBox)`
  width: 330px;
  max-height: 500px;
  overflow: auto;
  font-size: 14px;
  line-height: initial;
  display: flex;
  flex-direction: column;
`;

const FolderIconWrapper = styled.div`
  color: ${({ showBox }: { showBox: boolean }) => (showBox ? colors.primary : 'initial')};
`;

const ProjectsList = styled.ul`
  list-style-type: none;
  flex: 1 1 100%;
  min-height: 300px;
  margin: 0;
  padding: 0;
`;

const AddButtonIcon = styled.span`
  font-size: 20px;
  color: ${colors.primary};
  margin-right: 5px;
  cursor: pointer;
`;

export default function Projects() {
  const [showBox, setShowBox] = useState(false);
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, () => setShowBox(false));

  if (!showBox) {
    return (
      <UnshowedWrapper>
        <div
          onClick={() => {
            setShowBox((prevState: boolean) => !prevState);
          }}
        >
          <RiFolder2Fill />
        </div>
      </UnshowedWrapper>
    );
  }
  return (
    <ProjectsWrapper>
      <FolderIconWrapper showBox={showBox}>
        <RiFolder2Fill />
      </FolderIconWrapper>
      <ProjectsStackedBox ref={containerRef}>
        <SearchInput>
          <Input autoFocus placeholder="Find project..." />
        </SearchInput>
        <ProjectsList />
        <AddButtonWrapper>
          <AddButtonIcon>
            <RiAddFill />
          </AddButtonIcon>
          Create a new project
        </AddButtonWrapper>
      </ProjectsStackedBox>
    </ProjectsWrapper>
  );
}
