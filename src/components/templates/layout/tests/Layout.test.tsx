import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Layout } from '../Layout';

describe('LayoutBlock', () => {
  it('Renders with children when provided', () => {
    render(<Layout>Children</Layout>);

    expect(screen.getByText(/Children/i)).toBeInTheDocument();
  });
});
