import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { EnergyCostPredictionFrom } from '../EnergyCostPredictionFrom';

describe('EnergyCostPredictionFrom', () => {
  it('Renders error message when the CTA button gets clicked without enough input', () => {
    render(<EnergyCostPredictionFrom />);

    const [, , calculate] = screen.getAllByRole('button');

    expect(screen.queryByTestId('evaluationError')).not.toBeInTheDocument();

    fireEvent.click(calculate); // CTA button

    expect(screen.getByTestId('evaluationError')).toBeInTheDocument();
  });
});
