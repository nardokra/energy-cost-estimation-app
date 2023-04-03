import dayjs, { type Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Set the time zone equal to the current location
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

/** dateTruncateTime
 * This utility function strips the date so it remains
 * with zero hours, minutes, seconds and milliseconds
 * @param date
 * @returns the stripped Date
 */

export const dateTruncateTime = (date: Date): Dayjs =>
  dayjs(date).millisecond(0).second(0).minute(0).hour(0);
