import { render } from '@testing-library/react';

import { useMediaQuery } from '@chakra-ui/react';

import Location from '../Location';

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}));

describe('Location Component', () => {
  it('should render the short form on mobile', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([true]);
    const { container } = render(
      <Location long={'Engineering Lab Wing B215'} alwaysShort={false} short={'ELW B215'} />
    );
    expect(container.textContent).toContain('ELW B215');
    expect(container.textContent).not.toContain('Engineering Lab Wing B215');
  });

  it('should render the long form on desktop', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([false]);
    const { container } = render(
      <Location long={'Engineering Lab Wing B215'} alwaysShort={false} short={'ELW B215'} />
    );
    expect(container.textContent).toContain('Engineering Lab Wing B215');
    expect(container.textContent).not.toContain('ELW B215');
  });

  it('should always render the short form on desktop if flag set', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([false]);
    const { container } = render(<Location long={'Engineering Lab Wing B215'} alwaysShort={true} short={'ELW B215'} />);
    expect(container.textContent).toContain('ELW B215');
    expect(container.textContent).not.toContain('Engineering Lab Wing B215');
  });

  it('should always render the short form on mobile if flag set', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([true]);
    const { container } = render(<Location long={'Engineering Lab Wing B215'} alwaysShort={true} short={'ELW B215'} />);
    expect(container.textContent).toContain('ELW B215');
    expect(container.textContent).not.toContain('Engineering Lab Wing B215');
  });

  it('should display long form if short form is not available', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([false]);
    const { container } = render(<Location long={'Engineering Lab Wing B215'} short={''} alwaysShort={false} />);
    expect(container.textContent).toContain('Engineering Lab Wing B215');
  });

  it('should display long form if short form is not available even if flag set', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue([false]);
    const { container } = render(<Location long={'Engineering Lab Wing B215'} short={''} alwaysShort={true} />);
    expect(container.textContent).toContain('Engineering Lab Wing B215');
  });
});
