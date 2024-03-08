import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { getCurrentTerm } from 'lib/utils/terms';

import { TermSelect } from '../TermSelect';

jest.mock('lib/utils/terms');
jest.mock('react-router');
jest.mock('react-router-dom');

const mockGetCurrentTerm = jest.mocked(getCurrentTerm);
const mockUseNavigate = jest.mocked(useNavigate);
const mockUseParams = jest.mocked(useParams);
const mockUseSearchParams = jest.mocked(useSearchParams);
const mockNavigate = jest.fn();

describe('TermSelect', () => {
  beforeEach(() => {
    mockGetCurrentTerm.mockReturnValue('202305');
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({ subject: '' });
    mockUseSearchParams.mockReturnValue([{ get: jest.fn() } as any, jest.fn()]);
  });

  it('should default to the current term', () => {
    render(<TermSelect />);
    const termSelect = screen.getByRole('combobox') as HTMLSelectElement;

    expect(termSelect.value).toStrictEqual('202309');
  });

  it('should navigate to the selected term', () => {
    render(<TermSelect />);
    const termSelect = screen.getByRole('combobox') as HTMLSelectElement;

    const fallOption = screen.getAllByRole('option')[0];
    userEvent.selectOptions(termSelect, fallOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202309');

    const springOption = screen.getAllByRole('option')[1];
    userEvent.selectOptions(termSelect, springOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202401');

    const summerOption = screen.getAllByRole('option')[2];
    userEvent.selectOptions(termSelect, summerOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202405');
  });
});
