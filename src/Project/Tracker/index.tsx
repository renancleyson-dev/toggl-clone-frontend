import React, { useState } from 'react';
import styled from 'styled-components';
import Projects from 'src/Components/Projects';
import Tags from 'src/Components/Tags';
import { colors } from 'src/styles';
import { TextInput } from '../Styles';
import Timer from './Timer';
import TimerButton from './TimerButton';
import MenuOptions from './MenuOptions';
import ManualMode from './ManualMode';

const TrackerBar = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 65px;
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

const LabelInput = styled(TextInput)`
  font-size: 16px;
  flex: 0 1 75%;

  &::placeholder {
    font-size: 18px;
  }
`;

const TrackerMode = () => (
  <>
    <Timer />
    <TimerButton />
  </>
);

// UI to control and inform about current time tracking
export default function Tracker() {
  const [trackerMode, setTrackerMode] = useState(true);

  return (
    <TrackerBar>
      <LabelInput placeholder="What are you working on?" />
      <TimerMenu>
        <Projects />
        <Tags />
        {!trackerMode ? <TrackerMode /> : <ManualMode />}
        <MenuOptions trackerMode={trackerMode} setTrackerMode={setTrackerMode} />
      </TimerMenu>
    </TrackerBar>
  );
}
