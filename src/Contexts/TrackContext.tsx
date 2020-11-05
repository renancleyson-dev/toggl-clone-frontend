import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IProject } from '../types/projects';
import { ITag } from '../types/tags';
import { ITrackingTimeRecord } from '../types/timeRecord';
import { fetchProjects } from '../resources/projects';
import { fetchTags } from '../resources/tags';
import ProjectLoader from '../Project/ProjectLoader';

const source = axios.CancelToken.source();

const actualTimeRecordInitialValue = {
  userId: 0,
};

interface Props {
  children: React.ReactNode;
}

interface ContextValue {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  actualTimeRecord: ITrackingTimeRecord;
  setActualTimeRecord: React.Dispatch<React.SetStateAction<ITrackingTimeRecord>>;
}

export const TrackContext = React.createContext({} as ContextValue);

// Provider to set and get states for time tracking
export default function Provider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [actualTimeRecord, setActualTimeRecord] = useState<ITrackingTimeRecord>(
    actualTimeRecordInitialValue
  );
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const contextData = {
    isTracking,
    setIsTracking,
    tags,
    setTags,
    projects,
    setProjects,
    actualTimeRecord,
    setActualTimeRecord,
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
