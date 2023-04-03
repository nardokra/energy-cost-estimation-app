import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DescriptionBrick } from '../DescriptionBrick';

describe('DescriptionBrick', () => {
  it("Doesn't render when there is no children property provided", () => {
    const { container } = render(<DescriptionBrick />);

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('Renders when there is a children property provided', () => {
    render(<DescriptionBrick>foo</DescriptionBrick>);

    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  it('Renders with an external className when property provided', () => {
    const { container } = render(
      <DescriptionBrick className='foo'>foo</DescriptionBrick>
    );

    expect(container.firstChild).toHaveClass('foo');
  });

  it("Renders without the 'w-full' class when the maxWidth property is not provided", () => {
    const { container } = render(<DescriptionBrick>foo</DescriptionBrick>);

    expect(container.firstChild).not.toHaveClass('w-full');
  });

  it("Renders with the 'w-full' class when the maxWidth property is provided", () => {
    const { container } = render(
      <DescriptionBrick maxWidth>foo</DescriptionBrick>
    );

    expect(container.firstChild).toHaveClass('w-full');
  });
});
