import { fireEvent, render, screen } from '@testing-library/react';

import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('changes the input when user types', () => {
    render(<SearchBar />);

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toEqual('');

    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toEqual('hello world');
  });

  it.todo('does whatever it will do on submit (when search functionality is in)');
});
