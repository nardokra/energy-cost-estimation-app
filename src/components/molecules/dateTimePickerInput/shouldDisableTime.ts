import { type DateTimePickerProps } from '@mui/x-date-pickers';
import { type Dayjs } from 'dayjs';

/** shouldDisableTime
 * This component DateTimePickerInput component specific utility function
 * evaluates if the user time input is valid. So with an interval of 15.
 * The valid cases are: 15, 30, 45 and 0.
 * @param dateAndTime the date which need to be evaluated.
 * @param editorView only the 'minutes' needs to be evaluated.
 * @returns boolean evaluation.
 */

export const shouldDisableTime: DateTimePickerProps<Dayjs>['shouldDisableTime'] =
  (dateAndTime, editorView): boolean =>
    editorView === 'minutes' &&
    !!dateAndTime &&
    dateAndTime.minute() !== 45 &&
    dateAndTime.minute() !== 0 &&
    dateAndTime.minute() !== 15 &&
    dateAndTime.minute() !== 30;
