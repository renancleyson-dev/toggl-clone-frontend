import axios from '../axios';

interface IProject {
  name: string;
  color: string;
}

export const fetchProjects = (): Promise<{ data: IProject[] }> => axios.get('/projects');

export const createProject = (project: IProject): Promise<{ data: IProject }> =>
  axios.post('/projects', project);
