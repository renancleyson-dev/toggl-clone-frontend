export interface ITimeRecord {
  duration: number;
  startTime: string;
  endTime: string;
  label?: string;
  projectId?: number;
  tagIds?: number[];
  id: number;
}

export interface IDateGroup {
  date: string;
  timeRecords: ITimeRecord[];
}

export interface IEditedTimeRecord {
  id: number;
  startTime: string;
  label?: string;
  projectId?: number;
  tagIds?: number[];
}

export interface ITrackingTimeRecord {
  userId: number;
  startTime?: moment.Moment;
  label?: string;
  projectId?: number;
  tagIds?: number[];
}

export interface ITimeRecordParams extends ITrackingTimeRecord {
  endTime?: moment.Moment;
}
