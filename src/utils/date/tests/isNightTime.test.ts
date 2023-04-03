import { isNightTime } from '../isNightTime';

describe('isNightTime', () => {
  it("Returns 'true' when the current hour is equal or bigger than the starting day time and smaller than the starting night time", () => {
    expect(isNightTime(6, 7, 23)).toBeTruthy();
    expect(isNightTime(1, 7, 23)).toBeTruthy();
    expect(isNightTime(23, 7, 23)).toBeTruthy();
  });

  it("Returns 'false' when the current hour is smaller than the starting day time and bigger than or equal to the starting night time", () => {
    expect(isNightTime(7, 7, 23)).toBeFalsy();
    expect(isNightTime(8, 7, 23)).toBeFalsy();
    expect(isNightTime(22, 7, 23)).toBeFalsy();
  });
});
