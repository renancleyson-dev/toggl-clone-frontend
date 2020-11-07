import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import { IoIosCheckmark } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { UserContext } from 'src/Contexts/UserContext';
import { createTimeRecord } from 'src/resources/timeRecords';
import useTracker from 'src/hooks/useTracker';
import { colors, buttonResets } from 'src/styles';

const ManualTimerWrapper = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
`;

const StyledInputMask = styled(InputMask)`
  width: 100px;
  height: 35px;
  font-family: inherit;
  font-size: 14px;
  text-align: center;
  border-radius: 6px;

  &:focus {
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;

const StartTimeInput = styled(StyledInputMask)`
  border: 1px solid #888;

  &:focus {
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;

const EndTimeInput = styled(StyledInputMask)`
  font-family: inherit;
  font-size: 14px;
  border: 1px solid #f1f1f1;
  border-radius: 6px;
`;

const CheckButton = styled.button`
  ${buttonResets}
  color: #fff;
  background-color: ${colors.darkPrimary};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 42px;

  &:focus {
    outline: none;
  }
`;

const Arrow = styled(FaLongArrowAltRight)`
  width: 15px;
  height: 15px;
  color: #777;
`;

const Check = styled(IoIosCheckmark)`
  position: absolute;
`;

const convertToMoment = (value: string) => moment(value, 'HH:mm A').format('HH:mm A');

interface Props {
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
}

const ManualTimer = ({ startTime, setStartTime, endTime, setEndTime }: Props) => (
  <ManualTimerWrapper>
    <StartTimeInput
      mask="99:99 aa"
      maskChar=""
      value={startTime}
      onChange={(event) => setStartTime(event.target.value)}
      onBlur={() => setStartTime((prevState) => convertToMoment(prevState))}
    />
    <Arrow />
    <EndTimeInput
      mask="99:99 aa"
      maskChar=""
      value={endTime}
      onChange={(event) => setEndTime(event.target.value)}
      onBlur={() => setEndTime((prevState) => convertToMoment(prevState))}
    />
  </ManualTimerWrapper>
);

export default function ManualMode() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { actualTimeRecord, setActualTimeRecord } = useTracker();
  const { user } = useContext(UserContext);

  const handleClickOnButton = () => {
    createTimeRecord({
      ...actualTimeRecord,
      startTime: moment(startTime, 'HH:mm A'),
      endTime: moment(endTime, 'HH:mm A'),
    });
    setActualTimeRecord({ userId: user.id });
  };

  useEffect(() => {
    const actualMoment = moment().format('HH:mm A');
    setStartTime(actualMoment);
    setEndTime(actualMoment);
  }, []);

  return (
    <>
      <ManualTimer
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <CheckButton onClick={handleClickOnButton}>
        <Check />
      </CheckButton>
    </>
  );
}
