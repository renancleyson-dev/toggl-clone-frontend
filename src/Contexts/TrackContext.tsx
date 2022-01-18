import React, { useState, useEffect, useMemo, PropsWithChildren } from 'react';
import moment from 'moment';
import axios from 'axios';
import useUser from '../hooks/useUser';
import useDateGroups from '../hooks/useDateGroups';
import useObjectState, { ObjectControl } from '../hooks/shared/useObjectState';
import { dateGroupActions } from '../Contexts/DateGroupsContext';
import { IProject } from '../types/projects';
import { ITag } from '../types/tags';
import { ITrackingTimeRecord } from '../types/timeRecord';
import { fetchProjects } from '../resources/projects';
import { createTimeRecord } from '../resources/timeRecords';
import { fetchTags } from '../resources/tags';
import ProjectLoader from '../Project/ProjectLoader';

const initialTimeRecord: ITrackingTimeRecord = {
  startTime: undefined,
  label: '',
  projectId: null,
  tagIds: null,
};

export interface ContextValue {
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>>;
  tags: ITag[];
  setTags: React.Dispatch<React.SetStateAction<ITag[]>>;
  projects: IProject[];
  setProjects: React.Dispatch<React.SetStateAction<IProject[]>>;
  getTimeRecord: () => ITrackingTimeRecord;
  getTimeRecordValue: (key: string) => any;
  setTimeRecord: (newValue: ITrackingTimeRecord) => void;
  resetTimeRecord: () => void;
  startTracking: (timeRecord?: ITrackingTimeRecord) => void;
  stopTracking: (pass?: boolean) => Promise<void>;
  timeRecordControl: ObjectControl<ITrackingTimeRecord>;
}

export const TrackContext = React.createContext<ContextValue | null>(null);

// Provider to set and get states for time tracking
export default function TrackProvider({ children }: PropsWithChildren<{}>) {
  const [isReady, setIsReady] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const [_getTimeRecord, setTimeRecord, timeRecordControl] = useObjectState(
    initialTimeRecord
  );

  const { user } = useUser();
  const { dispatchDateGroups } = useDateGroups();

  const context = useMemo(() => {
    const getTimeRecord = (): ITrackingTimeRecord => _getTimeRecord();
    const getTimeRecordValue = (key: string) => _getTimeRecord(key);

    const resetTimeRecord = () => {
      setTimeRecord(initialTimeRecord);
    };

    const startTracking = (_timeRecord?: ITrackingTimeRecord) => {
      setIsTracking(true);
      setTimeRecord({ ..._timeRecord, startTime: moment() });
    };

    const stopTracking = async (pass = false) => {
      if (!pass) {
        const payload = { ...getTimeRecord(), endTime: moment(), userId: user.id };
        const response = await createTimeRecord(payload);
        dispatchDateGroups(dateGroupActions.add(response.data));
      }

      resetTimeRecord();
      setIsTracking(false);
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
      startTracking,
      stopTracking,
      timeRecordControl,
    };
  }, [
    _getTimeRecord,
    setTimeRecord,
    projects,
    tags,
    isTracking,
    timeRecordControl,
    dispatchDateGroups,
    user.id,
  ]);

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
