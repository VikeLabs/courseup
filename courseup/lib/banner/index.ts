/* eslint-disable camelcase */
import { load } from 'cheerio';

import { Fetch } from './fetch';
import { Section } from './types';

const ROOT_URL = 'https://banner.uvic.ca';
const BANNER_SSB_URL = `${ROOT_URL}/StudentRegistrationSsb/ssb`;
const BANNER_SSB_SEARCH_URL = `${BANNER_SSB_URL}/classSearch/`;
const BANNER_SSB_SEARCH_GET_SUBJECTS = `${BANNER_SSB_SEARCH_URL}/get_subject`;
const BANNER_SSD_SEARCH_RESULTS_URL = `${BANNER_SSB_URL}/searchResults/searchResults`;
const BANNER_SSB_GET_TERMS = `${BANNER_SSB_URL}/classSearch/getTerms`;

export type TermsResponse = {
  code: string;
  description: string;
};

export interface BannerResponse<T> {
  success: boolean;
  totalCount: number;
  data: T;
  pageOffset: number;
  pageMaxSize: number;
  sectionsFetchedCount: number;
  pathMode: string;
  searchResultsConfigs: SearchResultsConfig[];
  ztcEncodedImage: null;
  allowHoldRegistration: null;
}

export interface SearchResultsConfig {
  config: string;
  display: string;
  title: string;
  required: boolean;
  width: string;
}

export type SearchResultsParams = {
  id: string;
  /**
   * e.g. "CSC"
   */
  subject?: string;
  /**
   * e.g. "201920"
   */
  term: string;
  /**
   * e.g. "111"
   */
  courseNumber?: string;
  offset?: number;
  max?: number;
};

export async function getTerms(fc: Fetch, offset: number, max: number): Promise<TermsResponse[]> {
  const urlParams = new URLSearchParams({
    searchTerms: '',
    offset: offset.toString(),
    max: max.toString(),
  });

  const url = `${BANNER_SSB_GET_TERMS}?${urlParams}`;

  const response = await fc(url);
  const json = (await response.json()) as TermsResponse[];
  return json;
}

export async function setTerm(fc: Fetch, term: string, id: string): Promise<void> {
  const url = `${BANNER_SSB_URL}/term/search?mode=search`;
  const params = new URLSearchParams({ term, id });

  const response = await fc(url, {
    method: 'POST',
    body: params.toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.status !== 200) throw new Error();
}

export function makeSearchResultsParams({
  subject,
  term,
  offset,
  max,
  courseNumber,
  id,
}: SearchResultsParams): URLSearchParams {
  const params = new URLSearchParams({
    txt_subject: subject ?? '',
    txt_term: term ?? '',
    txt_courseNumber: courseNumber ?? '',
    startDatepicker: '',
    endDatepicker: '',
    pageOffset: offset?.toString() ?? '0',
    // has a limit of 500
    pageMaxSize: max?.toString() ?? '1000',
    sortColumn: 'subjectDescription',
    sortDirection: 'asc',
    uniqueSessionId: id,
  });
  return params;
}

export async function getSearchResults(fc: Fetch, p: SearchResultsParams): Promise<BannerResponse<Section[]>> {
  const params = makeSearchResultsParams(p);
  const url = `${BANNER_SSD_SEARCH_RESULTS_URL}?${params.toString()}`;
  const response = await fc(url);
  const data = (await response.json()) as BannerResponse<Section[]>;

  if (!data.success) throw new Error('banner search unsuccessful');

  return data;
}

export async function getCourseDescription(fc: Fetch, term: string, crn: string): Promise<string | null> {
  const url = `${BANNER_SSB_URL}/searchResults/getCourseDescription`;
  const params = new URLSearchParams({ term, courseReferenceNumber: crn });

  const response = await fc(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const $ = load(await response.text());
  const text = $('*').find('br').replaceWith('\n').end().text();

  return text;
}

export async function getSubjects(
  fc: Fetch,
  searchTerm: string,
  term: string,
  offset: string,
  max: string
): Promise<{ response: string }> {
  const params = new URLSearchParams({
    searchTerm,
    offset,
    term,
    max,
  });

  const url = `${BANNER_SSB_SEARCH_GET_SUBJECTS}?${params.toString()}`;
  const response = await fc(url);
  const data = await response.text();
  return {
    response: data,
  };
}
