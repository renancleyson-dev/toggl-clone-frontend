import moment from 'moment';
import { rest } from 'msw';
import { IProject } from 'src/types/projects';
import { IDateGroup, ITimeRecord } from 'src/types/timeRecord';
import { ITag } from '../types/tags';

const baseUser = { id: 1, email: 'test@email.com' };
export const authToken = 'auth_test';

const projects: IProject[] = [
  { id: 8, name: 'test', color: '#ffffff' },
  { id: 7, name: 'test2', color: '#000000' },
];

const tags: ITag[] = [
  { id: 4, name: 'test' },
  { id: 5, name: 'test2' },
];

const timeRecords: ITimeRecord[] = [
  {
    id: 100,
    duration: 3,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3000).toISOString(),
    label: 'test',
    project: projects[0],
    tags,
  },
  {
    id: 2100,
    duration: 3,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3000).toISOString(),
    label: 'test2',
    project: projects[1],
    tags,
  },
];

const dateGroup: IDateGroup = {
  date: 'Today',
  timeRecords,
};

export const handlers = [
  rest.post('/login', (req, res, ctx) => res(ctx.json({ ...baseUser, authToken }))),
  rest.get('/users/me', (req, res, ctx) => res(ctx.json(baseUser))),
  rest.get('/time_records', (req, res, ctx) => {
    if (req.url.searchParams.get('page') === '0') {
      return res(ctx.json([dateGroup]));
    }

    return res(ctx.json([]));
  }),
  rest.post('/time_records', (req, res, ctx) => {
    if (typeof req.body === 'object') {
      const body = { ...req.body };
      const endTime = moment(req.body.endTime);

      body.id = Date.now();
      body.duration = moment.duration(endTime.diff(req.body.startTime)).seconds();
      return res(ctx.json(body));
    }

    return res(ctx.json(req.body));
  }),
  rest.get('/projects', (req, res, ctx) => res(ctx.json(projects))),
  rest.get('/tags', (req, res, ctx) => res(ctx.json(tags))),
];
