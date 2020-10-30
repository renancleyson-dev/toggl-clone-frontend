import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { IProject } from '../types/projects';
import { fetchProjects } from '../resources/projects';
import ProjectLoader from '../Project/ProjectLoader';

const source = axios.CancelToken.source();

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
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
}

export const TrackContext = React.createContext({} as ContextValue);

// Provider to set and get states for time tracking
export default function Provider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<moment.Moment>();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [categories, setCategories] = useState<string[]>();
  const contextData = {
    isTracking,
    setIsTracking,
    startTime,
    setStartTime,
    categories,
    setCategories,
    projects,
    setProjects,
  };

  useEffect(() => {
    fetchProjects(source).then((response) => {
      setProjects(response.data);
      setIsReady(true);
    });

    return () => source.cancel();
  }, []);

  if (!isReady) {
    return <ProjectLoader />;
  }
  return <TrackContext.Provider value={contextData}>{children}</TrackContext.Provider>;
}
