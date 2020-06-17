import React, { useState } from 'react';
import moment from 'moment';

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: moment.Moment | undefined;
  setStartTime: React.Dispatch<React.SetStateAction<moment.Moment | undefined>>;
}

export const TrackContext = React.createContext({} as ContextValue);

// Provider to set and get states for time tracking
export default function Provider({ children }: Props) {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<moment.Moment>();

  return (
    <TrackContext.Provider value={{ isTracking, setIsTracking, startTime, setStartTime }}>
      {children}
    </TrackContext.Provider>
  );
}
