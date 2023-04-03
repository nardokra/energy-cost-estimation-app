import { renderHook, act } from '@testing-library/react';
import dayjs from 'dayjs';
import {
  enCostsCalEvalError,
  useEnergyCostsCalculator,
  type UseEnergyCostsCalculatorPropsType,
} from '../useEnergyCostsCalculator';

describe('useEnergyCostsCalculator', () => {
  const mockStartDateAndTime = dayjs().startOf('month');
  const mockEndateAndTime = dayjs().startOf('month').add(15, 'm');
  const mockConsumptionInKw = '1.2';

  jest.useFakeTimers().setSystemTime(new Date(2023, 2, 28, 1)); // Tuesday 28 March 2023, 01:00

  it("Returns energyCosts of '0.00' and evaluationError of 'undefined' when there are no properties provided", () => {
    const { result } = renderHook(() => useEnergyCostsCalculator({}));

    expect(result.current.energyCosts).toBe('0.00');
    expect(result.current.evaluationError).toBe(undefined);

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.evaluationError).toBe(enCostsCalEvalError);
  });

  it('Only updates the energyCosts state when all members of the prop object are correctly provided', () => {
    const { result, rerender } = renderHook(
      (props: UseEnergyCostsCalculatorPropsType) =>
        useEnergyCostsCalculator(props)
    );

    expect(result.current.evaluationError).not.toBe(enCostsCalEvalError);
    expect(result.current.energyCosts).toBe('0.00');

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.evaluationError).toBe(enCostsCalEvalError);
    expect(result.current.energyCosts).toBe('0.00');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.evaluationError).toBe(enCostsCalEvalError);
    expect(result.current.energyCosts).toBe('0.00');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.toString(),
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.evaluationError).toBe(enCostsCalEvalError);
    expect(result.current.energyCosts).toBe('0.00');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.toString(),
      consumptionInKw: mockConsumptionInKw,
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.evaluationError).toBe(undefined);
    expect(result.current.energyCosts).toBe('0.05');
  });

  it('Only performs a calculation if the remainder of the time difference between startDateAndTime and endDateAndTime and the interval is 0', () => {
    const mockProps: UseEnergyCostsCalculatorPropsType = {
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.add(1, 'm').toString(), // Time 00:16
      consumptionInKw: '1.2',
    };

    const { result, rerender } = renderHook(
      (props: UseEnergyCostsCalculatorPropsType) =>
        useEnergyCostsCalculator(props),
      { initialProps: mockProps }
    );

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('0.00');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.toString(), // Time 00:15
      consumptionInKw: mockConsumptionInKw,
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('0.05');
  });

  it('Calculates the correct energy costs', () => {
    const mockProps: UseEnergyCostsCalculatorPropsType = {
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.add(15, 'm').toString(),
      consumptionInKw: '1.2',
    };

    const { result, rerender } = renderHook(
      (props: UseEnergyCostsCalculatorPropsType) =>
        useEnergyCostsCalculator(props),
      { initialProps: mockProps }
    );

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('0.05');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.add(30, 'd').toString(),
      consumptionInKw: '40000',
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('1915.68');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.add(1, 'd').toString(),
      consumptionInKw: '130232',
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('6290.07');

    rerender({
      startDateAndTime: mockStartDateAndTime.toString(),
      endDateAndTime: mockEndateAndTime.add(80, 'd').toString(),
      consumptionInKw: '130232',
    });

    act(() => {
      result.current.calculateEnergyCosts();
    });

    expect(result.current.energyCosts).toBe('6235.00');
  });
});
