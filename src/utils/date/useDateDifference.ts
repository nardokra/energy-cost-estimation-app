import { useEffect, useState } from 'react';

// Utils
import dayjs from 'dayjs';

/** dateDifference:
 * This utility function can be use to calculate the time difference between
 * the start date string and the end date string.
 * @param startDateAndTime date string.
 * @param endDateAndTime  date string.
 * @returns Formatted date string 'DD:HH:MM'
 */

export interface UseDateDifferencePropsType {
  startDateAndTime?: string;
  endDateAndTime?: string;
}

export interface UseDateDifferenceReturnType {
  daysHoursMinutesString?: string;
  differenceInMinutes: number;
}

export const useDateDifference = ({
  startDateAndTime,
  endDateAndTime,
}: UseDateDifferencePropsType): UseDateDifferenceReturnType => {
  const [dateDifference, setDateDifference] =
    useState<UseDateDifferenceReturnType>({
      differenceInMinutes: 0,
    });

  useEffect((): void => {
    const differenceInHours = dayjs(endDateAndTime).diff(
      startDateAndTime,
      'hour',
      true
    );
    const differenceInMinutes = dayjs(endDateAndTime).diff(
      startDateAndTime,
      'minute',
      true
    );
    const differenceInMilliseconds = dayjs(endDateAndTime).diff(
      startDateAndTime,
      'milliseconds',
      true
    );

    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(differenceInHours % 24);
    const minutes = differenceInMinutes % 60;

    const formattedDays = days >= 0 ? days : 0;
    const formattedHours = hours >= 0 ? hours : 0;
    const formattedMinutes = minutes >= 0 ? minutes : 0;

    const formatTimeUnitDaysHoursMinutes = (unit = 0): string =>
      unit < 10 ? `0${unit}` : `${unit}`;

    const daysHoursMinutesString = `${formatTimeUnitDaysHoursMinutes(
      formattedDays
    )}:${formatTimeUnitDaysHoursMinutes(
      formattedHours
    )}:${formatTimeUnitDaysHoursMinutes(formattedMinutes)}`;

    setDateDifference({ daysHoursMinutesString, differenceInMinutes });
  }, [endDateAndTime, startDateAndTime]);

  return dateDifference;
};
