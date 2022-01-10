import { fireEvent, screen } from '@testing-library/react';

import { renderWithSearch } from 'lib/utils/jest';

import { Search } from '../SearchBar';

const mockOnChange = jest.fn();

describe('SearchBar', () => {
  it('should update the input value', () => {
    renderWithSearch(<Search onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toStrictEqual('');

    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toStrictEqual('hello world');
  });

  it('should call onChange', () => {
    renderWithSearch(<Search onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toStrictEqual('');

    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(mockOnChange).toBeCalledWith('hello world');
  });
});
