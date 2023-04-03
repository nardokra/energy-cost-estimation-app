/** isWeekend:
 * This function evaluates if the current day number of the week falls into
 * the weekend.
 * @param numberOfThedayOfTheWeek this should be 1 (monday) to 7 (sunday)
 * @returns evaluation result as boolean.
 */

export const isWeekend = (dayOfTheWeek: number): boolean => {
  if (dayOfTheWeek < 6) {
    return false;
  }
  return true;
};
