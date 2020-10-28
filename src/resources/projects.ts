import axios from '../axios';
import { IProject } from '../types/projects';

export const fetchProjects = (): Promise<{ data: IProject[] }> => axios.get('/projects');

export const createProject = (project: IProject): Promise<{ data: IProject }> =>
  axios.post('/projects', project);
