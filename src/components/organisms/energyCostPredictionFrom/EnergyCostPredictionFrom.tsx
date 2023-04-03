import { useState } from 'react';

// Utils
import { dateTruncateTime, useDateDifference } from '../../../utils/date';
import { useEnergyCostsCalculator } from './useEnergyCostsCalculator';

// Components
import { TitleBrick } from '../../atoms/titleBrick';
import { DescriptionBrick } from '../../atoms/descriptionBrick';
import { NumberInput } from '../../molecules/numberInput';
import { DateTimePickerInput } from '../../molecules/dateTimePickerInput';
import { ValueBrick } from '../../atoms/valueBrick';
import { Button } from '@mui/material';
import { ReadOnlyField } from '../../molecules/readOnlyField';
import { ErrorSpan } from '../../atoms/errorSpan';

export const EnergyCostPredictionFrom = (): JSX.Element => {
  const dateNowWithTruncatedTime = dateTruncateTime(new Date(Date.now()));

  const [formState, setFormState] = useState<
    Record<string, string | undefined>
  >({
    startDateAndTime: dateNowWithTruncatedTime.toString(),
    endDateAndTime: dateNowWithTruncatedTime.add(30, 'm').toString(),
    consumptionInKw: undefined,
  });

  const { daysHoursMinutesString } = useDateDifference({
    startDateAndTime: formState?.startDateAndTime,
    endDateAndTime: formState?.endDateAndTime,
  });

  const { energyCosts, calculateEnergyCosts, evaluationError } =
    useEnergyCostsCalculator({
      startDateAndTime: formState.startDateAndTime,
      endDateAndTime: formState.endDateAndTime,
      consumptionInKw: formState.consumptionInKw,
    });

  return (
    <section className='max-w-xs w-full py-6'>
      <TitleBrick maxWidth title='Energy App' />
      <div className='flex flex-col py-2 px-6'>
        <DescriptionBrick className='mt-3' maxWidth>
          By filling in the input fields, the Energy App will calculate the
          expected energy costs. The app will take price elasticity into account
          and will evenly spread the consumption over the time frame chosen.
          <br />
          <br />
          When picking a date and time, make sure there is at least 15 minutes
          difference between the start date and time and the end date and time.
          The time fields do only accept '0' or a multiple of '15'. ('15', '30',
          or '45').
          <br />
          <br />
          The duration is automatically calculated based on your start and end
          date.
        </DescriptionBrick>
        <DateTimePickerInput
          className='mt-3'
          helperText='Pick a date and time...'
          id='startDateAndTime'
          topLabel='Start date and time'
          minutesStep={15}
          onChange={setFormState}
          value={formState?.startDateAndTime}
        />
        <DateTimePickerInput
          className='mt-3'
          helperText='Pick a date and time...'
          id='endDateAndTime'
          topLabel='End date and time'
          minDateTime={formState?.startDateAndTime}
          minutesStep={15}
          onChange={setFormState}
          value={formState?.endDateAndTime}
        />
        <ReadOnlyField
          className='mt-3'
          helperText='Days : Hours : Minutes'
          topLabel='Duration'
          value={daysHoursMinutesString}
        />
        <NumberInput
          className='mt-3'
          helperText='Fill in the expected number of kW consumption...'
          id='consumptionInKw'
          insideLabel='123'
          onChange={setFormState}
          positiveInput
          topLabel='Expected consumption'
          unitDesignation='in kW'
          value={formState?.consumptionInKw}
        />
        <ValueBrick label='Result:' prefix='€' value={energyCosts} />
      </div>
      <Button
        className='mt-10 bg-theme-secondary rounded-none shadow-none py-1.5 normal-case text-2xl font-medium'
        fullWidth
        onClick={calculateEnergyCosts}
        variant='contained'
      >
        Calculate
      </Button>
      {!!evaluationError && (
        <ErrorSpan className='mx-3.5 mt-1' maxWidth testId='evaluationError'>
          {evaluationError}
        </ErrorSpan>
      )}
    </section>
  );
};
