import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons/lib';
import { RiTimeFill } from 'react-icons/ri';
import Logo from '../../Components/Logo';
import { colors } from '../../styles';
import UserProfile from './UserProfile';

interface ISidebarOption {
  name: string;
  route: string;
  Icon: IconType;
}

const sidebarOptions: ISidebarOption[] = [
  {
    name: 'Timer',
    route: '/',
    Icon: RiTimeFill,
  },
];

const SidebarWrapper = styled.div`
  flex: 0 0 180px;
  padding: 20px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(44, 19, 56);
  color: #fff;
`;

const LogoWrapper = styled.div`
  max-width: 100px;
  margin: 0 15px;
`;

const OptionsWrapper = styled.div`
  margin-top: 20px;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarRow = styled.div`
  margin: 0 10px;
  padding: 2px 6px;
  font-size: 19px;
  color: ${({ selected }: { selected?: boolean }) =>
    selected ? '#fff' : colors.pinkLight};
  text-decoration: none;
  background-color: ${({ selected }: { selected?: boolean }) =>
    selected ? 'rgb(66, 41, 79)' : 'transparent'};
  border-radius: 7px;
`;

const OptionText = styled.span`
  margin-left: 12px;
  font-size: 14px;
`;

export default function Sidebar() {
  const [selected] = useState(0);
  const ElementOptions = sidebarOptions.map(
    ({ name, route, Icon }: ISidebarOption, index) => (
      <Link to={route}>
        <SidebarRow key={name} selected={selected === index}>
          <Icon />
          <OptionText>{name}</OptionText>
        </SidebarRow>
      </Link>
    )
  );
  return (
    <SidebarWrapper>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <OptionsWrapper>
        {ElementOptions}
        <UserProfile />
      </OptionsWrapper>
    </SidebarWrapper>
  );
}
