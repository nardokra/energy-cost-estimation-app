import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import {
  dateTimePickerErrorMessages,
  DateTimePickerInput,
  dateTimePickerTestIds,
} from '../DateTimePickerInput';

const mockId = 'mockId';
const mockOnChange = jest.fn();

describe('DateTimePickerInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renders with DateTimePicker input field.', () => {
    render(<DateTimePickerInput id={mockId} onChange={mockOnChange} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Renders with an external className when provided via the props.', () => {
    const { container, rerender } = render(
      <DateTimePickerInput id={mockId} onChange={mockOnChange} />
    );

    expect(container.firstChild).not.toHaveClass('foo');

    rerender(
      <DateTimePickerInput
        className='foo'
        id={mockId}
        onChange={mockOnChange}
      />
    );

    expect(container.firstChild).toHaveClass('foo');
  });

  it('Renders with helperText when provided via props.', () => {
    const mockHelperText = 'mockHelperText';
    render(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        helperText={mockHelperText}
        value={dayjs({ minute: 15 }).toString()}
      />
    );

    expect(screen.getByText(mockHelperText)).toBeInTheDocument();
  });

  it('Renders with topLabel when provided via props.', () => {
    const mockTopLabel = 'mockTopLabel';
    render(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        topLabel={mockTopLabel}
        value={dayjs({ minute: 15 }).toString()}
      />
    );

    expect(screen.getByText(mockTopLabel)).toBeInTheDocument();
  });

  it('Renders without topLabel html tag when not provided via props.', () => {
    render(<DateTimePickerInput id={mockId} onChange={mockOnChange} />);

    expect(
      screen.queryByTestId(dateTimePickerTestIds.topLabel)
    ).not.toBeInTheDocument();
  });

  it('Renders the minDate error when the minDateTime is provided via the props, and the value prop is lower than the minDateTime value.', () => {
    render(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        value={dayjs('2022-01-02T00:00:00.000Z').toString()}
        minDateTime={dayjs('2022-02-02T00:00:00.000Z').toString()}
      />
    );

    expect(
      screen.getByText(dateTimePickerErrorMessages.minDate)
    ).toBeInTheDocument();
  });

  it('Renders the minTime error, when the minDateTime is provided via the props and the time of the value is lower than the minDateTime, but the date is not lower than the minDateTime value. So the date is equal but the time is shorter.', () => {
    render(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        value={dayjs('2022-02-02T00:15:00.000Z').toString()}
        minDateTime={dayjs('2022-02-02T00:16:00.000Z').toString()}
      />
    );

    expect(
      screen.getByText(dateTimePickerErrorMessages.minTime)
    ).toBeInTheDocument();
  });

  it('Renders the shouldDisableTime-minutes error, when the user tries to apply a value other than a multiple of 15 minutes. The valid cases are 15, 30, 45 and 00.', () => {
    // All the cases are tested in the utility helper function. This is a test for the error message to appear or not.
    const { rerender } = render(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        value={dayjs('2022-02-02T00:15:00.000Z').toString()} // Time 00:15
      />
    );

    expect(
      screen.queryByText(dateTimePickerErrorMessages.minutesStep)
    ).not.toBeInTheDocument();

    rerender(
      <DateTimePickerInput
        id={mockId}
        onChange={mockOnChange}
        value={dayjs('2022-02-02T00:16:00.000Z').toString()} // Time 00:16
      />
    );

    expect(
      screen.getByText(dateTimePickerErrorMessages.minutesStep)
    ).toBeInTheDocument();
  });

  it('Handles onChange event after date and time got picked', () => {
    const mockDateNewDate = dayjs('2022-02-02T00:15:00.000Z').toString();

    render(<DateTimePickerInput id={mockId} onChange={mockOnChange} />);

    expect(mockOnChange).toHaveBeenCalledTimes(0);

    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: mockDateNewDate,
      },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
