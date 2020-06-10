import React from 'react';
import { render } from 'react-dom';
import History from '../History';

it('renders without crashing', (): void => {
  const div = document.createElement('div');
  render(<History />, div);
});
