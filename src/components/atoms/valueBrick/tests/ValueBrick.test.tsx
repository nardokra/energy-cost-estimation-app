import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { valueBrickTestIds, ValueBrick } from '../ValueBrick';

const mockLabelProp = 'foo';
const mockValueProp = 'bar';

describe('ValueBrick', () => {
  it("Doesn't render when there is no value or no label property provided.", () => {
    const { container } = render(<ValueBrick />);

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('Renders with className when the className property is provided.', () => {
    const className = 'bar';
    const { container } = render(
      <ValueBrick
        className={className}
        value={mockValueProp}
        label={mockLabelProp}
      />
    );

    expect(container.firstChild).toHaveClass(className);
  });

  it('Renders without label html tag when the label property is not provided.', () => {
    render(<ValueBrick value={mockValueProp} />);

    expect(
      screen.queryByTestId(valueBrickTestIds.labelTag)
    ).not.toBeInTheDocument();
  });

  it('Renders with label and value when they are provided via the properties.', () => {
    render(<ValueBrick label={mockLabelProp} value={mockValueProp} />);

    expect(screen.getByText(mockLabelProp)).toBeInTheDocument();
    expect(screen.getByText(mockValueProp)).toBeInTheDocument();
  });

  it('Renders without prefix html tag when there is no prefix property provided.', () => {
    render(<ValueBrick value={mockValueProp} label={mockLabelProp} />);

    expect(
      screen.queryByTestId(valueBrickTestIds.prefixTag)
    ).not.toBeInTheDocument();
  });

  it('Renders with prefix when provided via the properties.', () => {
    const prefix = 'baz';
    render(
      <ValueBrick value={mockValueProp} label={mockLabelProp} prefix={prefix} />
    );

    expect(screen.getByText(prefix)).toBeInTheDocument();
  });

  it('Renders without the designated span tag for the note property.', () => {
    render(<ValueBrick value={mockValueProp} label={mockLabelProp} />);

    expect(
      screen.queryByTestId(valueBrickTestIds.noteTag)
    ).not.toBeInTheDocument();
  });

  it('Renders with note when provided via the properties.', () => {
    const note = 'note';
    render(
      <ValueBrick value={mockValueProp} label={mockLabelProp} note={note} />
    );

    expect(screen.getByText(note)).toBeInTheDocument();
  });
});
