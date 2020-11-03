import { CancelTokenSource } from 'axios';
import axios from '../axios';
import { ITag } from '../types/tags';

export const fetchTags = (source?: CancelTokenSource): Promise<{ data: ITag[] }> =>
  axios.get('/tags', { cancelToken: source?.token });

export const createTag = (tag: { name: string }): Promise<{ data: ITag }> =>
  axios.post('/tags', tag);
