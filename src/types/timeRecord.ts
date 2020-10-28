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
