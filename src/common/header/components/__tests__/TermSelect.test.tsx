import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';

import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { getCurrentTerm } from 'lib/utils/terms';

import { TermSelect } from '../TermSelect';

jest.mock('lib/utils/terms');
jest.mock('react-router');
jest.mock('react-router-dom');

const mockGetCurrentTerm = mocked(getCurrentTerm);
const mockUseNavigate = mocked(useNavigate);
const mockUseParams = mocked(useParams);
const mockUseSearchParams = mocked(useSearchParams);
const mockNavigate = jest.fn();

describe('TermSelect', () => {
  beforeEach(() => {
    mockGetCurrentTerm.mockReturnValue('202105');
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({ subject: '' });
    mockUseSearchParams.mockReturnValue([{ get: jest.fn() } as any, jest.fn()]);
  });

  it('should default to the current term', () => {
    render(<TermSelect />);
    const termSelect = screen.getByRole('combobox') as HTMLSelectElement;

    expect(termSelect.value).toStrictEqual('202105');
  });

  it('should navigate to the selected term', () => {
    render(<TermSelect />);
    const termSelect = screen.getByRole('combobox') as HTMLSelectElement;

    const summerOption = screen.getAllByRole('option')[0];
    userEvent.selectOptions(termSelect, summerOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202105');

    const fallOption = screen.getAllByRole('option')[1];
    userEvent.selectOptions(termSelect, fallOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202109');

    const springOption = screen.getAllByRole('option')[2];
    userEvent.selectOptions(termSelect, springOption);
    expect(mockNavigate).toBeCalledWith('/calendar/202201');
  });
});
