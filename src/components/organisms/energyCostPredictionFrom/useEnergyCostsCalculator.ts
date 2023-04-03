import { useEffect, useMemo, useState } from 'react';

// Utils
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useDateDifference, isNightTime, isWeekend } from '../../../utils/date';

// Constants
import { energyRatePerKwh } from './energyRatePerKwh';

dayjs.extend(weekday);

interface UseEnergyCostsCalculatorReturnType {
  calculateEnergyCosts: () => void;
  energyCosts: string;
  evaluationError?: string;
}

export interface UseEnergyCostsCalculatorPropsType {
  startDateAndTime?: string;
  endDateAndTime?: string;
  consumptionInKw?: string;
}

export const enCostsCalEvalError =
  'Check if all entry fields have been filled in according to the specified criteria.';

/** useEnergyCostsCalculator:
 * This custom hook is a helper function for managing
 * the energy price state and the form evaluation error state.
 * It makes a calculation of the energy costs based on an start date,
 * end date and the expected energy consumption.
 */

export const useEnergyCostsCalculator = (
  props?: UseEnergyCostsCalculatorPropsType
): UseEnergyCostsCalculatorReturnType => {
  const { startDateAndTime, endDateAndTime, consumptionInKw } = props ?? {};

  const [energyCosts, setEnergyCosts] = useState('0.00');
  const [evaluationError, setEvaluationError] = useState<string>();
  const { differenceInMinutes } = useDateDifference({
    startDateAndTime,
    endDateAndTime,
  });

  const hasEvaluationError = useMemo(
    () =>
      !startDateAndTime ||
      !endDateAndTime ||
      !consumptionInKw ||
      !differenceInMinutes ||
      differenceInMinutes % 15 !== 0,
    [consumptionInKw, differenceInMinutes, endDateAndTime, startDateAndTime]
  );

  useEffect(() => {
    if (!!evaluationError && !hasEvaluationError) {
      setEvaluationError(undefined);
    }
  }, [evaluationError, hasEvaluationError]);

  const calculateEnergyCosts = (): void => {
    if (hasEvaluationError) {
      setEvaluationError(enCostsCalEvalError);
    } else {
      !!evaluationError && setEvaluationError(undefined);

      const kW = Number(consumptionInKw);
      const minutesPerInterval = 15;
      const minutesInHour = 60;
      const kWh = kW * (minutesPerInterval / minutesInHour);
      const intervals = differenceInMinutes / minutesPerInterval;
      const kWhPerInterval = kWh / intervals;

      // Iterative changing values
      let costs = 0;
      let currentDate = dayjs(startDateAndTime);
      let calculationInterval = differenceInMinutes / minutesPerInterval;

      while (calculationInterval > 0) {
        const currentDayOfTheWeek = currentDate.weekday();
        const currentRate =
          !isWeekend(currentDayOfTheWeek) &&
          !isNightTime(currentDate.hour(), 7, 23)
            ? energyRatePerKwh.peak
            : energyRatePerKwh.offPeak;

        costs += kWhPerInterval * currentRate;
        calculationInterval -= 1;
        currentDate = currentDate.add(minutesPerInterval, 'm');
      }

      const roundedCosts = (
        Math.round((costs + Number.EPSILON) * 100) / 100
      ).toFixed(2);

      setEnergyCosts(`${roundedCosts}`);
    }
  };

  return { energyCosts, calculateEnergyCosts, evaluationError };
};
