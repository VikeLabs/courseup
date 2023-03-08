import { differenceInDays, differenceInMinutes } from 'date-fns';

import { createTask } from '../../../lib/task';
import { upsertTextbooksScript } from '../textbooks';

jest.mock('date-fns', () => ({
  differenceInMinutes: jest.fn(),
  differenceInDays: jest.fn(),
}));

jest.mock('../../../lib/task', () => ({
  findLatestTask: jest.fn(),
  createTask: jest.fn(),
}));

jest.mock('../../../lib/textbooks', () => ({
  upsertTextbooks: jest.fn(),
}));

describe('upsert-textbooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should run the task every time if less than a week away from registration', async () => {
    (differenceInDays as jest.Mock).mockReturnValue(6);
    await upsertTextbooksScript('202009', new Date(2020, 9, 1), new Date(2020, 10, 31), new Date(2020, 9, 16));
    expect(createTask).toBeCalledTimes(1);
  });

  it('should run the task every time if exactly a week away from registration', async () => {
    (differenceInDays as jest.Mock).mockReturnValue(7);
    await upsertTextbooksScript('202101', new Date(2020, 9, 1), new Date(2020, 10, 31), new Date(2020, 9, 16));
    expect(createTask).toBeCalledTimes(1);
  });

  describe('run task less frequently if over a week away from registration', () => {
    it('should run the task if before drop date and courses have not been updated within the last hour', async () => {
      (differenceInDays as jest.Mock).mockReturnValue(8);
      (differenceInMinutes as jest.Mock).mockReturnValue(61);
      await upsertTextbooksScript('202101', new Date(2020, 9, 1), new Date(2020, 10, 31), new Date(2020, 8, 21));
      expect(createTask).toBeCalledTimes(1);
    });

    it('should not run the task if before drop date and courses have been updated within the last hour', async () => {
      (differenceInDays as jest.Mock).mockReturnValue(8);
      (differenceInMinutes as jest.Mock).mockReturnValue(59);
      await upsertTextbooksScript('202101', new Date(2020, 9, 1), new Date(2020, 10, 31), new Date(2020, 8, 21));
      expect(createTask).toBeCalledTimes(0);
    });

    it('should run the task if after drop date and courses have not been updated within the last 24 hours', async () => {
      (differenceInDays as jest.Mock).mockReturnValue(8);
      (differenceInMinutes as jest.Mock).mockReturnValue(1441);
      await upsertTextbooksScript('202101', new Date(2020, 9, 1), new Date(2020, 8, 20), new Date(2020, 8, 21));
      expect(createTask).toBeCalledTimes(1);
    });

    it('should not run the task if after drop date and courses have been updated within the last 24 hours', async () => {
      (differenceInDays as jest.Mock).mockReturnValue(8);
      (differenceInMinutes as jest.Mock).mockReturnValue(1439);
      await upsertTextbooksScript('202101', new Date(2020, 9, 1), new Date(2020, 8, 20), new Date(2020, 8, 21));
      expect(createTask).toBeCalledTimes(0);
    });
  });
});
