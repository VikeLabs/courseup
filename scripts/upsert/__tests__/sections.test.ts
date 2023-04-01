import { waitFor } from '@testing-library/react';

import { differenceInMinutes } from 'date-fns';

import { createTask } from '../../../lib/task';
import { upsertSectionsScript } from '../functions/upsertSections';

jest.mock('date-fns', () => ({
  differenceInMinutes: jest.fn(),
}));

jest.mock('../../../lib/task', () => ({
  findLatestTask: jest.fn(),
  findLatestTaskByTerm: jest.fn(),
  createTask: jest.fn(),
}));

jest.mock('../../../lib/sections', () => ({
  upsertSections: jest.fn(),
}));

jest.mock('../../../lib/banner', () => ({
  getSearchResults: jest.fn().mockReturnValue({
    data: [],
    totalCount: 0,
    pageMaxSize: 0,
  }),
  setTerm: jest.fn(),
}));

describe('upsert-sections', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should run the task every time if before the drop date', async () => {
    const registrationDate = new Date(2020, 9, 1);
    const dropDate = new Date(2020, 10, 31);
    jest.setSystemTime(new Date(2020, 9, 16));
    await waitFor(() => upsertSectionsScript('202009', registrationDate, dropDate, new Date(2020, 8, 21)));
    expect(createTask).toBeCalledTimes(1);
  });

  it('should run the task every time if on drop date', async () => {
    const registrationDate = new Date(2020, 9, 1);
    const dropDate = new Date(2020, 10, 31);
    jest.setSystemTime(new Date(2020, 10, 31));
    await waitFor(() => upsertSectionsScript('202009', registrationDate, dropDate, new Date(2020, 8, 21)));
    expect(createTask).toBeCalledTimes(1);
  });

  describe('run task less frequently if drop date has passed', () => {
    it('should run the task if after drop date and courses have not been updated within the last 12 hours', async () => {
      const registrationDate = new Date(2020, 9, 1);
      const dropDate = new Date(2020, 10, 31);
      (differenceInMinutes as jest.Mock).mockReturnValue(730);
      await waitFor(() => upsertSectionsScript('202009', registrationDate, dropDate, new Date(2020, 11, 5)));
      expect(createTask).toBeCalledTimes(1);
    });

    it('should not run the task if after drop date and courses have been updated within the last 12 hours', async () => {
      const registrationDate = new Date(2020, 9, 1);
      const dropDate = new Date(2020, 10, 31);
      (differenceInMinutes as jest.Mock).mockReturnValue(300);
      await waitFor(() => upsertSectionsScript('202009', registrationDate, dropDate, new Date(2020, 11, 5)));
      expect(createTask).toBeCalledTimes(0);
    });
  });
});
