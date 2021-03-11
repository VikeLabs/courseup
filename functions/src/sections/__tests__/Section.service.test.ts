jest.mock('@vikelabs/uvic-course-scraper/dist/index');
import { UVicCourseScraper } from '@vikelabs/uvic-course-scraper/dist/index';

import * as testing from '@firebase/testing';
import { injectTestingAdaptor } from 'typesaurus/testing';

import { getSections, getSectionSeats } from '../Section.service';
import { mocked } from 'ts-jest/utils';

const mockScraper = mocked(UVicCourseScraper);

const mockGetCourseDetails = jest.fn();
const mockGetSectionSeats = jest.fn();
const mockGetSections = jest.fn();

injectTestingAdaptor(
  testing.initializeAdminApp({ projectId: 'staging-clockwork' })
);

beforeAll(() => {
  testing.clearFirestoreData({
    projectId: 'staging-clockwork',
  });
});

describe('getSections', () => {
  mockScraper.mockImplementation(() => {
    return {
      getCourseDetails: mockGetCourseDetails,
      getSectionSeats: mockGetSectionSeats,
      getSections: mockGetSections,
    };
  });
  mockGetSections.mockResolvedValue([]);

  it('works as expected', async () => {
    const seats = await getSections('202101', 'CSC', '115');
    expect(seats.length).toBeGreaterThan(0);
  });
});

describe('getSectionSeats', () => {
  it('works', async () => {
    await getSectionSeats('202101', 'CSC', '115');
  });
});
