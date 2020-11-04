import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { IProject } from '../types/projects';
import { ITag } from '../types/tags';
import { fetchProjects } from '../resources/projects';
import { fetchTags } from '../resources/tags';
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
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
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
  const [tags, setTags] = useState<ITag[]>([]);
  const contextData = {
    isTracking,
    setIsTracking,
    startTime,
    setStartTime,
    tags,
    setTags,
    projects,
    setProjects,
  };

  useEffect(() => {
    Promise.all([fetchProjects(source), fetchTags(source)]).then((responses) => {
      setProjects(responses[0].data);
      setTags(responses[1].data);
      setIsReady(true);
    });

    return () => source.cancel();
  }, []);

  if (!isReady) {
    return <ProjectLoader />;
  }
  return <TrackContext.Provider value={contextData}>{children}</TrackContext.Provider>;
}
