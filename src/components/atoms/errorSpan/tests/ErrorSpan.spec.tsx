import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorSpan } from '../ErrorSpan';

describe('ErrorSpan', () => {
  it("Doesn't render when there is no children property provided", () => {
    const { container } = render(<ErrorSpan />);

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('Renders when there is a children property provided', () => {
    render(<ErrorSpan>foo</ErrorSpan>);

    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  it('Renders with an external className when property provided', () => {
    const { container } = render(<ErrorSpan className='foo'>foo</ErrorSpan>);

    expect(container.firstChild).toHaveClass('foo');
  });

  it("Renders without the 'w-full' class when the maxWidth property is not provided", () => {
    const { container } = render(<ErrorSpan>foo</ErrorSpan>);

    expect(container.firstChild).not.toHaveClass('w-full');
  });

  it("Renders with the 'w-full' class when the maxWidth property is provided", () => {
    const { container } = render(<ErrorSpan maxWidth>foo</ErrorSpan>);

    expect(container.firstChild).toHaveClass('w-full');
  });

  it('Renders with the testId property is provided', () => {
    const { container } = render(<ErrorSpan testId='bar'>foo</ErrorSpan>);

    expect(container.firstChild).toHaveAttribute('data-testid', 'bar');
  });

  it('Renders without the testId data attribute when property not provided', () => {
    const { container } = render(<ErrorSpan>foo</ErrorSpan>);

    expect(container.firstChild).not.toHaveAttribute('data-testid');
  });
});
