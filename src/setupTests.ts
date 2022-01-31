// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { JWT_KEY } from './helpers/constants';
import { authToken } from './__mocks__/handlers';
import { server } from './__mocks__/server';
import { setJsonWebToken } from './axios';

beforeAll(() => {
  server.listen();

  localStorage.setItem(JWT_KEY, authToken);
  setJsonWebToken(authToken);
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
