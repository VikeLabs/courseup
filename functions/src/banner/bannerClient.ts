import { Section } from './banner';
import got, { Response } from 'got';
import { load } from 'cheerio';
import { terms as currentTerms } from '../constants';
const ROOT_URL = 'https://banner.uvic.ca';
const BANNER_SSB_URL = `${ROOT_URL}/StudentRegistrationSsb/ssb`;
const BANNER_SSB_SEARCH_URL = `${BANNER_SSB_URL}/classSearch/`;
const BANNER_SSB_SEARCH_GET_SUBJECTS = `${BANNER_SSB_SEARCH_URL}/get_subject`;
const BANNER_SSD_SEARCH_RESULTS_URL = `${BANNER_SSB_URL}/searchResults/searchResults`;
const BANNER_SSB_GET_TERMS = `${BANNER_SSB_URL}/classSearch/getTerms`;

type TermsResponse = {
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

export class BannerClient {
  cookies: {
    [key: string]: string[];
  };

  availableTerms: string[];

  constructor() {
    this.cookies = {};
    this.availableTerms = [];
  }

  getCookie(term: string): string[] | undefined {
    return this.cookies?.[term];
  }

  saveCookie(response: Response<string>, term: string): void {
    // get the cookies
    const cookies = response.headers['set-cookie'];
    // if there's no cookies, return
    if (cookies) {
      this.cookies = { ...this.cookies, [term]: cookies };
    }
  }

  async init(): Promise<void> {
    const termsResponse = await BannerClient.getTerms(1, 100);
    this.availableTerms = termsResponse.map((term) => term.code);
    // TODO: set term dynamically
    // filter out terms that are availabe and set indepedent cookies for each term
    const terms = this.availableTerms.filter((term) =>
      currentTerms.includes(term as any)
    );
    await Promise.all(terms.map((term) => this.setTerm(term)));
    return;
  }

  async clear(term: string) {
    const url = `${BANNER_SSB_URL}/classSearch/resetDataForm`;
    await got.post(url, {
      headers: {
        Cookie: this.cookies[term],
      },
    });
  }

  static async getTerms(offset: number, max: number): Promise<TermsResponse[]> {
    const urlParams = new URLSearchParams({
      searchTerms: '',
      offset: offset.toString(),
      max: max.toString(),
    });

    const url = `${BANNER_SSB_GET_TERMS}?${urlParams}`;

    const response = await got(url).json<TermsResponse[]>();
    return response;
  }

  async setTerm(term: string): Promise<void> {
    const url = `${BANNER_SSB_URL}/term/search?mode=search`;
    // build params
    const params = new URLSearchParams({ term });
    // post fetch request

    const response = await got.post(url, {
      headers: {
        // TODO: might need existing cookies set here
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    // save cookies for term
    this.saveCookie(response, term);
    if (response.statusCode !== 200) throw new Error();
  }

  async getSubjects(
    searchTerm: string,
    term: string,
    offset: string,
    max: string
  ): Promise<{ response: string }> {
    if (!this.cookies[term]) await this.init();

    const params = new URLSearchParams({
      searchTerm,
      offset,
      term,
      max,
    });

    const url = `${BANNER_SSB_SEARCH_GET_SUBJECTS}?${params}`;
    const cookies = this.cookies?.[term];
    const response = await got(url, {
      method: 'GET',
      headers: cookies
        ? {
            Cookie: cookies,
          }
        : undefined,
    });

    return {
      response: response.body,
    };
  }

  static getSearchResultsParams({
    subject,
    term,
    offset,
    max,
    courseNumber,
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
    });
    return params;
  }

  async getSearchResults(
    p: SearchResultsParams
  ): Promise<BannerResponse<Section[]>> {
    if (!(p.term in this.cookies)) {
      await this.init();
    }
    const params = BannerClient.getSearchResultsParams({
      subject: p.subject,
      term: p.term,
    });

    const url = `${BANNER_SSD_SEARCH_RESULTS_URL}?${params.toString()}`;
    const cookies = this.cookies[p.term];
    const response = await got(url, {
      method: 'GET',
      headers: {
        Cookie: cookies,
      },
    }).json<BannerResponse<Section[]>>();

    return {
      ...response,
      data: response.data.filter(
        (section) => section.courseNumber === p.courseNumber
      ),
    };
  }

  async getCourseDescription(
    term: string,
    crn: string
  ): Promise<string | null> {
    if (!this.cookies) throw new Error('cookies not set');
    const url = `${BANNER_SSB_URL}/searchResults/getCourseDescription`;

    const params = new URLSearchParams({ term, courseReferenceNumber: crn });
    const cookies = this.cookies[term];
    // post fetch request
    const response = await got.post(url, {
      headers: {
        Cookie: cookies,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const body = load(response.body);
    return body.text();
  }
}
