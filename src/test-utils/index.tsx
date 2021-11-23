import React, { PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import UserProvider from '../Contexts/UserContext';
import TrackProvider from '../Contexts/TrackContext';

const Providers = ({ children }: PropsWithChildren<{}>) => (
  <UserProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </UserProvider>
);

const ProjectProviders = ({ children }: PropsWithChildren<{}>) => (
  <Providers>
    <TrackProvider>{children}</TrackProvider>
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
