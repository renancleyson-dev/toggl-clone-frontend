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
  categories: string[] | undefined;
  setCategories: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const TrackContext = React.createContext({} as ContextValue);

// Provider to set and get states for time tracking
export default function Provider({ children }: Props) {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<moment.Moment>();
  const [categories, setCategories] = useState<string[]>();
  const contextData = {
    isTracking,
    setIsTracking,
    startTime,
    setStartTime,
    categories,
    setCategories,
  };

  return <TrackContext.Provider value={contextData}>{children}</TrackContext.Provider>;
}
