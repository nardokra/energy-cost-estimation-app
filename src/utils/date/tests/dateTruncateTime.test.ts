import { dateTruncateTime } from '../dateTruncateTime';

describe('dateTruncateTime', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-01T01:10:15.000Z'));

  it('Returns a date with 0 hours, minutes, seconds and milliseconds', () => {
    const newDate = dateTruncateTime(new Date(Date.now()));

    expect(newDate.hour()).toBe(0);
    expect(newDate.minute()).toBe(0);
    expect(newDate.second()).toBe(0);
    expect(newDate.millisecond()).toBe(0);
  });
});
