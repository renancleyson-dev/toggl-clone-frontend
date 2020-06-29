import React from 'react';
import TrackContextProvider from '../Contexts/TrackContext';
import Tracker from '../Tracker/Tracker';
import History from '../History/History';

export default () => (
  <TrackContextProvider>
    <Tracker />
    <History />
  </TrackContextProvider>
);
