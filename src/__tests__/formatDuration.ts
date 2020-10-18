import moment from 'moment';
import formatDuration from '../helpers/formatDuration';

it('formats a Duration with less than one hour to H:MM:SS', (): void => {
  const formattedDuration = formatDuration(
    moment.duration({
      minutes: 20,
      seconds: 10,
    })
  );
  expect(formattedDuration).toBe('0:20:10');
});

it('formats a Duration with greater than one hour to H:MM:SS', (): void => {
  let formattedDuration = formatDuration(
    moment.duration({
      hours: 2,
      minutes: 20,
      seconds: 10,
    })
  );
  expect(formattedDuration).toBe('2:20:10');

  formattedDuration = formatDuration(
    moment.duration({
      hours: 10,
      minutes: 20,
      seconds: 10,
    })
  );
  expect(formattedDuration).toBe('10:20:10');
});
