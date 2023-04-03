/** isNightTime:
 * This utility function evaluates if it is currently night
 * based on the passed arguments.
 * Attention: It is under the assumption that the startingHourNightTime
 * never is higher than 24 and the startingHourDayTime is never higher than
 * the startingHourNightTime;
 * @param currentHour the full hour of the current time should be passed down.
 * @param startingHourDayTime the full hour of the start should be passed down fe 7.
 * @param startingHourNightTime the full hour of the end should be passed down fe 23.
 * @returns evaluation result as boolean.
 */

export const isNightTime = (
  currentHour: number,
  startingHourDayTime: number,
  startingHourNightTime: number
): boolean => {
  if (
    currentHour >= startingHourDayTime &&
    currentHour < startingHourNightTime
  ) {
    return false;
  }
  return true;
};
