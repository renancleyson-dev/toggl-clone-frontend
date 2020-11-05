export interface ITimeRecord {
  duration: number;
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

export interface IDateGroup {
  date: string;
  timeRecords: ITimeRecord[];
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
