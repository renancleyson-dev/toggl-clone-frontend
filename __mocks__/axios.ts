import axios from 'axios';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

mockAxios.create.mockImplementationOnce(() => axios);

export default mockAxios;
