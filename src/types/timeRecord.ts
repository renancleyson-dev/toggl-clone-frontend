import { IProject } from './projects';
import { ITag } from './tags';

export interface ITimeRecord {
  duration: number;
  startTime: string;
  endTime: string;
  label?: string;
  project?: IProject;
  tags?: ITag[];
  id: number;
}

export interface IDateGroup {
  date: string;
  timeRecords: ITimeRecord[];
}

export interface ITrackingTimeRecord {
  startTime?: moment.Moment;
  label?: string;
  projectId?: number | null;
  tagIds?: number[] | null;
}

export interface ITimeRecordParams extends ITrackingTimeRecord {
  userId: number;
  endTime?: moment.Moment;
}
