import React from 'react';
import TrackContextProvider from '../Contexts/TrackContext';
import Tracker from './Tracker';
import History from './History';

export default () => (
  <TrackContextProvider>
    <Tracker />
    <History />
  </TrackContextProvider>
);
