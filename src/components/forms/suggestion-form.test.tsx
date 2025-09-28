
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SuggestionForm from './SuggestionForm';

describe('SuggestionForm', () => {
  it('should display a success message after submitting a valid suggestion', async () => {
    const { getByPlaceholderText, getByText } = render(<SuggestionForm />);
    const textarea = getByPlaceholderText('Tell us what you think...');
    const submitButton = getByText('Send Suggestion');

    fireEvent.change(textarea, { target: { value: 'This is a test suggestion' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Suggestion Sent!')).toBeInTheDocument();
    });
  });

  it('should display an error message if the suggestion is too short', async () => {
    const { getByPlaceholderText, getByText } = render(<SuggestionForm />);
    const textarea = getByPlaceholderText('Tell us what you think...');
    const submitButton = getByText('Send Suggestion');

    fireEvent.change(textarea, { target: { value: 'short' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Suggestion must be at least 10 characters.')).toBeInTheDocument();
    });
  });
});
