import React from 'react';
import styled from 'styled-components';
import { RiTimeFill, RiMenuFill } from 'react-icons/ri';
import { BiDollar } from 'react-icons/bi';
import { BsFillTagFill } from 'react-icons/bs';
import Projects from 'src/Components/Projects';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TrackerBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  padding: 10px 10px 10px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 8px 0px #ccc;
`;

const TimerMenu = styled.div`
  min-width: 300px;
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
  font-size: 16px;

  &::placeholder {
    font-size: 18px;
  }
`;

// UI to control and inform about current time tracking
export default function Tracker() {
  return (
    <TrackerBar>
      <LabelInput placeholder="What are you working on?" />
      <TimerMenu>
        <Projects />
        <BsFillTagFill />
        <BiDollar />
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
