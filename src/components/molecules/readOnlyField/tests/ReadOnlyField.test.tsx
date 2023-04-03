import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ReadOnlyField, readOnlyFieldTestIds } from '../ReadOnlyField';

describe('ReadOnlyField', () => {
  const mockTopLabel = 'foo';
  const mockValue = 'bar';

  it("Doesn't render when there is no value and topLabel property provided", () => {
    const { container } = render(<ReadOnlyField />);

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it("Renders when there is only a topLabel property provided and doesn't render the value html tag", () => {
    render(<ReadOnlyField topLabel={mockTopLabel} />);

    expect(screen.getByText(mockTopLabel)).toBeInTheDocument();
    expect(
      screen.queryByTestId(readOnlyFieldTestIds.valueTag)
    ).not.toBeInTheDocument();
  });

  it("Renders when there is only a value property provided and doesn't render the topLabel html tag", () => {
    render(<ReadOnlyField value={mockValue} />);

    expect(screen.getByText(mockValue)).toBeInTheDocument();
    expect(
      screen.queryByTestId(readOnlyFieldTestIds.topLabelTag)
    ).not.toBeInTheDocument();
  });

  it('Renders with the helperText property when provided', () => {
    const helperText = 'baz';
    render(<ReadOnlyField value={mockValue} helperText={helperText} />);

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("Doesn't renders with the helperText html tag when not provided", () => {
    render(<ReadOnlyField value={mockValue} />);

    expect(
      screen.queryByTestId(readOnlyFieldTestIds.helperTextTag)
    ).not.toBeInTheDocument();
  });
});
