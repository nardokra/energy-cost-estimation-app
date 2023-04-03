import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import { shouldDisableTime } from '../shouldDisableTime';

dayjs.extend(objectSupport);

describe('shouldDisableTime', () => {
  it("Only evaluates when the editorView is equal to 'minutes'", () => {
    // Truthy cases
    expect(shouldDisableTime?.(dayjs({ minute: 10 }), 'minutes')).toBeTruthy();

    // Falsy cases
    expect(shouldDisableTime?.(dayjs({ minute: 10 }), 'hours')).toBeFalsy();
    expect(shouldDisableTime?.(dayjs({ minute: 10 }), 'seconds')).toBeFalsy();
  });

  const falsyCases = [15, 30, 45, 0];

  it.each(falsyCases)(
    'Evaluates %p to false when the minutes of dateAndTime are equal to 15, 30, 45 or 0',
    (falsyCases) => {
      expect(
        shouldDisableTime?.(dayjs({ minute: falsyCases }), 'minutes')
      ).toBeFalsy();
    }
  );

  const truthyCases = Array.from({ length: 59 }, (_, i) => i + 1).filter(
    (hour) => !falsyCases.includes(hour)
  );

  it.each(truthyCases)(
    'Evaluates %p to true when the minutes of dateAndTime are equal to 15, 30, 45 or 0',
    (truthyCases) => {
      expect(
        shouldDisableTime?.(dayjs({ minute: truthyCases }), 'minutes')
      ).toBeTruthy();
    }
  );
});
