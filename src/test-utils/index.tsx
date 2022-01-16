import React, { PropsWithChildren, ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { server } from 'src/__mocks__/server';
import UserProvider from '../Contexts/UserContext';
import TrackProvider from '../Contexts/TrackContext';
import ProjectsModalProvider from 'src/Contexts/ProjectsModalContext';
import TagsModalProvider from 'src/Contexts/TagsModalContext';
import DateGroupsContextProvider from '../Contexts/DateGroupsContext';

export const createInput = (value: string) => ({ target: { value } });

const getResponse = (method: string, url: string, timeout = 4000) => {
  return new Promise<{ body?: any }>((resolve, reject) => {
    let requestId = '';

    setTimeout(() => {
      if (requestId === '') {
        reject(
          new Error(
            `The ${method} ${url} request was not invoked within the ${timeout}ms timeout.`
          )
        );
      }
    }, timeout);

    server.events.on('request:match', (req) => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase();
      const matchesUrl = req.url.pathname === url;
      if (matchesMethod && matchesUrl) {
        requestId = req.id;
      }
    });
    server.events.on('response:mocked', async (res, reqId) => {
      if (reqId === requestId) {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body || '');
        }
        resolve(res);
      }
    });
    server.events.on('request:unhandled', (req) => {
      if (req.id === requestId) {
        reject(new Error(`The ${req.method} ${req.url.href} request was unhandled.`));
      }
    });
  });
};

export const waitForResponse = async (
  method: string,
  url: string,
  UIEffect: () => void,
  timeout?: number
) => {
  const response = getResponse(method, url, timeout);
  await UIEffect();
  return await response;
};

const Providers = ({ children }: PropsWithChildren<{}>) => (
  <UserProvider>
    <MemoryRouter>{children}</MemoryRouter>
  </UserProvider>
);

const ProjectProviders = ({ children }: PropsWithChildren<{}>) => (
  <Providers>
    <DateGroupsContextProvider>
      <TrackProvider>
        <ProjectsModalProvider>
          <TagsModalProvider>{children}</TagsModalProvider>
        </ProjectsModalProvider>
      </TrackProvider>
    </DateGroupsContextProvider>
  </Providers>
);

const defaultRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export const projectRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: ProjectProviders, ...options });

export * from '@testing-library/react';
export { defaultRender as render };
