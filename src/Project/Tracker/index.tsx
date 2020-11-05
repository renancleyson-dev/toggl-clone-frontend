import React from 'react';
import styled from 'styled-components';
import { RiTimeFill, RiMenuFill } from 'react-icons/ri';
import Projects from 'src/Components/Projects';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';
import Tags from 'src/Components/Tags';
import { colors } from 'src/styles';

const TrackerBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  padding: 10px 10px 10px 20px;
  background-color: #fff;
  box-shadow: 0px 1px 8px 0px #ccc;
  color: ${colors.purpleDark};
`;

const TimerMenu = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
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
  font-size: 16px;
  flex: 0 1 75%;

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
        <Tags />
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
