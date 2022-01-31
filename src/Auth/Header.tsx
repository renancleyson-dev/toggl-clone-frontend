import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useUser from 'src/hooks/useUser';
import Logo from '../Components/Logo';
import { colors } from '../styles';
import { Button } from './Styles';

const EntrySection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%),
    url(laptops.jpg);
  background-repeat: no-repeat;
`;

const HeaderWrapper = styled.div`
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  width: 170px;
`;

const LogoutButton = styled.span`
  color: #fff;
  appearance: none;
  margin-right: 30px;
  font-family: Roboto, 'sans-serif';

  &:hover {
    color: ${colors.primary};
  }

  &:hover div {
    border-left: 4px solid ${colors.primary};
  }
`;

const Arrow = styled.div`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 10px;
  border-top: 4px solid transparent;
  border-left: 4px solid #fff;
  border-bottom: 4px solid transparent;
`;

const TimerButton = styled(Button)`
  color: ${colors.primary};
  background-color: ${colors.pinkLight};

  min-width: 180px;
`;

const TitleWrapper = styled.div`
  color: ${colors.pinkLight};
  padding: 90px 0 100px;
`;

const Title = styled.span`
  display: block;
  text-align: center;
  font-size: 72px;
`;

const Description = styled.span`
  display: block;
  font-size: 14px;
  text-align: center;
  font-family: Inter, 'sans-serif';
  font-size: 18px;
`;

export default function Header() {
  const { user } = useUser();

  return (
    <EntrySection>
      <HeaderWrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <div>
          <LogoutButton>
            {user.id ? 'Logout' : 'Login'} <Arrow />
          </LogoutButton>
          <Link to={user.id ? '/' : '/register'}>
            <TimerButton>{user.id ? 'Go to timer' : 'Try for free'}</TimerButton>
          </Link>
        </div>
      </HeaderWrapper>
      <TitleWrapper>
        <Title>Get Tracking</Title>
        <Description>Login to your Toggl Track account</Description>
      </TitleWrapper>
    </EntrySection>
  );
}
