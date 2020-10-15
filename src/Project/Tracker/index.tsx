import React from 'react';
import styled from 'styled-components';
import { RiTimeFill, RiMenuFill, RiFolder2Fill } from 'react-icons/ri';
import { BsFillTagFill } from 'react-icons/bs';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TrackerBar = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 1px 8px 0px #bebebe;
`;

const TimerMenu = styled.div`
  min-width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

const ModeMenu = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

const LabelInput = styled(TextInput)`
  flex: 1 1 100%;
  padding-left: 10px;
  font-size: 16px;

  &::placeholder {
    font-size: 18px;
  }

  &:focus {
    outline: none;
  }
`;

// UI to control and inform about current time tracking
export default function Tracker() {
  return (
    <TrackerBar>
      <LabelInput placeholder="What are you working on?" />
      <TimerMenu>
        <RiFolder2Fill />
        <BsFillTagFill />
        <Timer />
        <TimerButton />
        <ModeMenu>
          <RiTimeFill />
          <RiMenuFill />
        </ModeMenu>
      </TimerMenu>
    </TrackerBar>
  );
}
