import React, { useState } from 'react';
import styled from 'styled-components';
import UserOptions from './UserOptions';
import { buttonResets } from 'src/styles';
import useUser from 'src/hooks/useUser';

const Button = styled.button`
  ${buttonResets}
  color: inherit;

  &:focus {
    outline: none;
  }

  &:active {
    transform: none;
  }
`;

const UserProfileWrapper = styled.div`
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarSection = styled.div`
  background-image: url(profile.png);
  background-size: contain;
  min-width: 26px;
  min-height: 26px;
  border-radius: 50%;
`;

const TextWithEllipsis = styled.span`
  max-width: 120px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const UserEmail = styled(TextWithEllipsis)`
  font-size: 12px;
`;

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const openOptionsModal = () => {
    setIsOpen(true);
  };

  const closeOptionsModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openOptionsModal}>
        <UserProfileWrapper>
          <TextSection>
            <UserEmail>{user.email}</UserEmail>
          </TextSection>
          <AvatarSection />
        </UserProfileWrapper>
      </Button>
      <UserOptions isOpen={isOpen} onRequestClose={closeOptionsModal} />
    </>
  );
}
