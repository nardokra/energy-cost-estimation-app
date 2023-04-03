import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TitleBrick } from '../TitleBrick';

describe('TitleBrick', () => {
  it("Doesn't render when there is no title property provided", () => {
    const { container } = render(<TitleBrick />);

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('Renders when there is a title property provided', () => {
    render(<TitleBrick title='foo' />);

    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  it("Renders without the 'w-full' class when the maxWidth property is not provided", () => {
    const { container } = render(<TitleBrick title='foo' />);

    expect(container.firstChild).not.toHaveClass('w-full');
  });

  it("Renders with the 'w-full' class when the maxWidth property is provided", () => {
    const { container } = render(<TitleBrick title='foo' maxWidth />);

    expect(container.firstChild).toHaveClass('w-full');
  });
});
