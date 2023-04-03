import { isWeekend } from '../isWeekend';

describe('isWeekend', () => {
  it("Returns 'false' when the current week is bigger then 5", () => {
    expect(isWeekend(1)).toBeFalsy();
    expect(isWeekend(2)).toBeFalsy();
    expect(isWeekend(3)).toBeFalsy();
    expect(isWeekend(4)).toBeFalsy();
    expect(isWeekend(5)).toBeFalsy();
  });

  it("Returns 'true' when the current week day number is smaller then 6", () => {
    expect(isWeekend(6)).toBeTruthy();
    expect(isWeekend(7)).toBeTruthy();
  });
});
