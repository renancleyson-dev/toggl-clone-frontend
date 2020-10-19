import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from 'src/Contexts/UserContext';
import { colors } from 'src/styles';

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

const UserFullName = styled(TextWithEllipsis)`
  color: ${colors.pinkLight};
  font-size: 13px;
`;

const UserEmail = styled(TextWithEllipsis)`
  font-size: 12px;
`;

export default function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <UserProfileWrapper>
      <TextSection>
        <UserFullName>{user.fullName}</UserFullName>
        <UserEmail>{user.email}</UserEmail>
      </TextSection>
      <AvatarSection />
    </UserProfileWrapper>
  );
}
