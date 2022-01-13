import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { IProject } from '../types/projects';
import { ITag } from '../types/tags';
import { ITrackingTimeRecord } from '../types/timeRecord';
import { fetchProjects } from '../resources/projects';
import { fetchTags } from '../resources/tags';
import ProjectLoader from '../Project/ProjectLoader';
import useObjectState, { ObjectControl } from 'src/hooks/shared/useObjectState';

const initialTimeRecord: ITrackingTimeRecord = {
  startTime: undefined,
  label: '',
  projectId: null,
  tagIds: null,
};

interface Props {
  children: React.ReactNode;
}

type KeyOfITracking = keyof ITrackingTimeRecord;

export interface ContextValue {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  getTimeRecord: () => ITrackingTimeRecord;
  getTimeRecordValue: <T extends keyof ITrackingTimeRecord>(
    key: T
  ) => ITrackingTimeRecord[T];
  setTimeRecord: (newValue: ITrackingTimeRecord) => void;
  resetTimeRecord: () => void;
  timeRecordControl: ObjectControl<ITrackingTimeRecord>;
}

export const TrackContext = React.createContext<ContextValue | null>(null);

// Provider to set and get states for time tracking
export default function TrackProvider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [_getTimeRecord, setTimeRecord, timeRecordControl] = useObjectState(
    initialTimeRecord
  );

  const context = useMemo(() => {
    const getTimeRecord = () => _getTimeRecord();
    const getTimeRecordValue = <T extends KeyOfITracking>(key: T) => _getTimeRecord(key);
    const resetTimeRecord = () => {
      setTimeRecord(initialTimeRecord);
    };

    return {
      isTracking,
      setIsTracking,
      tags,
      setTags,
      projects,
      setProjects,
      getTimeRecord,
      getTimeRecordValue,
      setTimeRecord,
      resetTimeRecord,
      timeRecordControl,
    };
  }, [_getTimeRecord, setTimeRecord, projects, tags, isTracking, timeRecordControl]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async function fetchResources() {
      try {
        const [projects, tags] = await Promise.all([
          fetchProjects(source),
          fetchTags(source),
        ]);

        setProjects(projects.data);
        setTags(tags.data);
        setIsReady(true);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setIsReady(true);
        }
        console.log(e);
      }
    })();

    return () => source.cancel();
  }, []);

  if (!isReady) {
    return <ProjectLoader />;
  }

  return <TrackContext.Provider value={context}>{children}</TrackContext.Provider>;
}
