import { renderHook } from '@testing-library/react';
import {
  useDateDifference,
  type UseDateDifferencePropsType,
} from '../useDateDifference';

describe('useDateDifference', () => {
  it('Returns the difference between two dateStrings in the format of Days : Hours : Minutes', () => {
    const mockStartDate = new Date(2020, 4, 12).toString();
    const { result, rerender } = renderHook(
      (props: UseDateDifferencePropsType) => useDateDifference(props),
      {
        initialProps: {
          startDateAndTime: mockStartDate,
          endDateAndTime: new Date(2020, 4, 15).toString(),
        },
      }
    );

    expect(result.current.daysHoursMinutesString).toBe('03:00:00');
    expect(result.current.differenceInMinutes).toBe(4320);

    rerender({
      startDateAndTime: mockStartDate,
      endDateAndTime: new Date(2020, 4, 15, 12).toString(),
    });

    expect(result.current.daysHoursMinutesString).toBe('03:12:00');
    expect(result.current.differenceInMinutes).toBe(5040);

    rerender({
      startDateAndTime: mockStartDate,
      endDateAndTime: new Date(2020, 4, 15, 12, 12).toString(),
    });

    expect(result.current.daysHoursMinutesString).toBe('03:12:12');
    expect(result.current.differenceInMinutes).toBe(5052);
  });

  it("Returns a string formatted as '00:00:00' when the passed properties are undefined", () => {
    const { result } = renderHook(
      (props: UseDateDifferencePropsType) => useDateDifference(props),
      {
        initialProps: {
          startDateAndTime: undefined,
          endDateAndTime: undefined,
        },
      }
    );

    expect(result.current.daysHoursMinutesString).toBe('00:00:00');
    expect(result.current.differenceInMinutes).toBe(0);
  });
});
