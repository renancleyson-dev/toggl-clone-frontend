import moment from 'moment';
import { IProject } from 'src/types/projects';
import { ITag } from 'src/types/tags';
import { ITimeRecord } from 'src/types/timeRecord';

const sanitizeObject = (obj: any) => {
  for (let key in { ...obj }) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
};

export const timeRecord = (
  resource: Partial<{
    startTime: moment.Moment;
    endTime: moment.Moment;
    project: IProject;
    label: string;
    tags: ITag[];
    id: number;
  }>
): Partial<Omit<ITimeRecord, 'duration'>> => {
  const { id, label } = resource;

  const startTime = resource.startTime?.format();
  const endTime = resource.endTime?.format();
  const projectId = resource.project?.id;
  const tagIds = resource.tags?.map(({ id }) => id);

  const finalResource = { id, label, startTime, endTime, projectId, tagIds };
  sanitizeObject(finalResource);

  return finalResource;
};
