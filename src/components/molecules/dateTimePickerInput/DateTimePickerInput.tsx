import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

// Utils
import cx from 'classnames';
import 'dayjs/locale/en-gb';
import dayjs, { type Dayjs } from 'dayjs';
import { shouldDisableTime } from './shouldDisableTime';

// Components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  type DateTimeValidationError,
  LocalizationProvider,
  DateTimePicker,
} from '@mui/x-date-pickers';

interface DateTimePickerInputType {
  className?: string;
  helperText?: string;
  id: string;
  minDateTime?: string;
  minutesStep?: number;
  onChange: Dispatch<SetStateAction<Record<string, string | undefined>>>;
  topLabel?: string;
  value?: string;
}

export const dateTimePickerTestIds = {
  topLabel: 'topLabelTag',
};

export const dateTimePickerErrorMessages = {
  minDate: 'The end date must come after the start date',
  minTime:
    'The end time and date combination must be at least 15 minutes later than the start time and date',
  minutesStep:
    'Set the time with an intervals of 15 minutes, valid cases are: 00, 15, 30 or 45min',
};

export const DateTimePickerInput = ({
  className,
  helperText,
  id,
  minDateTime,
  minutesStep,
  onChange,
  topLabel,
  value,
}: DateTimePickerInputType): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const updateValueState = useCallback(
    (event: Dayjs | undefined | null): void => {
      onChange((prevState) => ({
        ...prevState,
        ...{ [id]: event?.toString() },
      }));
    },
    [id, onChange]
  );

  const updateErrorMessage = useCallback(
    (errorType: DateTimeValidationError) => {
      switch (errorType) {
        case 'minDate':
          setErrorMessage(dateTimePickerErrorMessages.minDate);
          break;
        case 'minTime':
          setErrorMessage(dateTimePickerErrorMessages.minTime);
          break;
        case 'minutesStep':
        case 'shouldDisableTime-minutes':
          setErrorMessage(dateTimePickerErrorMessages.minutesStep);
          break;
        default:
          setErrorMessage(undefined);
      }
    },
    []
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <div className={cx(className)}>
        {!!topLabel && (
          <label
            className='font-medium mt-3 ml-2'
            data-testid={dateTimePickerTestIds.topLabel}
          >
            {topLabel}
          </label>
        )}
        <DateTimePicker
          className={cx('w-full mt-1')}
          onError={updateErrorMessage}
          minDateTime={
            minDateTime ? dayjs(minDateTime).add(15, 'm') : undefined
          }
          minutesStep={minutesStep}
          onChange={updateValueState}
          shouldDisableTime={shouldDisableTime}
          slotProps={{
            textField: {
              helperText: errorMessage ?? helperText,
            },
          }}
          value={dayjs(value)}
        />
      </div>
    </LocalizationProvider>
  );
};
