import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { IProject } from '../types/projects';

export const fetchProjects = (
  source?: CancelTokenSource
): Promise<{ data: IProject[] }> =>
  axios.get('/projects', { cancelToken: source?.token });

export const createProject = (
  project: IProject,
  source?: CancelTokenSource
): Promise<{ data: IProject }> =>
  axios.post('/projects', project, { cancelToken: source?.token });
