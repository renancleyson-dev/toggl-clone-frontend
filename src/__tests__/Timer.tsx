import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import Timer from '../Tracker/Timer';

it('renders without crashing', (): void => {
  const div = document.createElement('div');
  render(<Timer startTime={moment()} isTracking={false} />, div);
});
