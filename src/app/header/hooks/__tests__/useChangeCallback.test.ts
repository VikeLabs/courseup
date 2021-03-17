import { renderHook } from '@testing-library/react-hooks';

import { useChangeCallback } from '../useChangeCallback';

describe('useChangeCallback', () => {
  it('is called with the correct params', () => {
    const mockOnChange = jest.fn();
    const event = {
      preventDefault() {},
      target: { value: 'test' },
    };
    const { result } = renderHook(() => useChangeCallback(mockOnChange));
    result.current(event as any);
    expect(mockOnChange).toBeCalledWith(event.target.value);
  });
});
