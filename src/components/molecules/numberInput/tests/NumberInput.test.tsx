import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberInput, numberInputTestIds } from '../NumberInput';

describe('NumberInput', () => {
  // Repeative mocks
  const mockOnChange = jest.fn();
  const mockId = 'bar';
  const mockInsideLabel = '123';
  const mockTopLabel = 'baz';

  beforeEach(() => jest.clearAllMocks());

  it('Renders as number input and with classname and id when passed down via the properties', () => {
    const mockClassName = 'foo';
    const { container } = render(
      <NumberInput
        className={mockClassName}
        id={mockId}
        onChange={mockOnChange}
      />
    );

    expect(container.firstChild).toHaveClass(mockClassName);
    expect(screen.getByRole('spinbutton').getAttribute('id')).toEqual(mockId);
    expect(screen.getByRole('spinbutton').getAttribute('type')).toEqual(
      'number'
    );
  });

  it("Renders with inside label when the insideLabel is provided via the props and when the value is '' (an empty string)", () => {
    render(
      <NumberInput
        insideLabel={mockInsideLabel}
        id={mockId}
        onChange={mockOnChange}
      />
    );

    expect(screen.getAllByText(mockInsideLabel).length).toBeGreaterThan(0);
  });

  it("Renders without inside label when the insideLabel is provided via the props and when the value is other than '' (an empty string)", () => {
    render(
      <NumberInput
        insideLabel={mockInsideLabel}
        id={mockId}
        onChange={mockOnChange}
        value='2'
      />
    );

    expect(screen.queryAllByText(mockInsideLabel).length).toBe(0);
  });

  it('Renders with helperText when is provided via the props', () => {
    const helperText = 'foo';

    render(
      <NumberInput
        id={mockId}
        onChange={mockOnChange}
        helperText={helperText}
      />
    );

    expect(screen.getAllByText(helperText).length).toBeGreaterThan(0);
  });

  it('Renders only with top label text and span, and without the unit designation span when the topLabel is provided via the properties and the unitDesignation not', () => {
    render(
      <NumberInput
        topLabel={mockTopLabel}
        id={mockId}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText(mockTopLabel)).toBeInTheDocument();
    expect(
      screen.getByTestId(numberInputTestIds.topLabelTag)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(numberInputTestIds.unitDesignationTag)
    ).not.toBeInTheDocument();
  });

  it('Renders with top label and unit designation when the topLabel and the unitDesignation properties are provided', () => {
    const mockUnitDesignation = 'euro';

    render(
      <NumberInput
        topLabel={mockTopLabel}
        unitDesignation={mockUnitDesignation}
        id={mockId}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText(mockTopLabel)).toBeInTheDocument();
    expect(screen.getByText(mockUnitDesignation)).toBeInTheDocument();
  });

  it('Handles onChange event when the input gets changed and rerenders with the value if passed down via the properties', () => {
    const { rerender } = render(
      <NumberInput
        topLabel={mockTopLabel}
        id={mockId}
        onChange={mockOnChange}
        value='0'
      />
    );
    const numberInput = screen.getByRole('spinbutton');

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(numberInput).toHaveAttribute('value', '0');

    fireEvent.change(numberInput, { target: { value: '2' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    rerender(<NumberInput id={mockId} onChange={mockOnChange} value='2' />);

    expect(numberInput).toHaveAttribute('value', '2');
  });
});
