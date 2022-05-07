import { Section } from "./banner/interface";
import fetch, { Response } from "node-fetch";
const ROOT_URL = "https://banner.uvic.ca";
const BANNER_SSB_URL = `${ROOT_URL}/StudentRegistrationSsb/ssb`;
const BANNER_SSB_SEARCH_URL = `${BANNER_SSB_URL}/classSearch/`;
const BANNER_SSB_SEARCH_GET_SUBJECTS = `${BANNER_SSB_SEARCH_URL}/get_subject`;
const BANNER_SSD_SEARCH_RESULTS_URL = `${BANNER_SSB_URL}/searchResults/searchResults`;
const BANNER_SSB_GET_TERMS = `${BANNER_SSB_URL}/classSearch/getTerms`;

type TermsResponse = {
  response: {
    code: string;
    description: string;
  }[];
}

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
  subject?: string;
  term?: string;
  offset?: number;
  max?: number
}

export class BannerClient {
  // member variable
  cookies?: string;
  term?: string;

  constructor() {

  }

  saveCookies(response?: Response): string | undefined {
    // we cookeis exist, return them
    if (this.cookies) return this.cookies

    // if there's no response, we can't get cookies
    if (!response) return

    // get the cookies
    const cookies = response.headers.get('set-cookie');
    // if there's no cookies, return
    if (cookies) {
      this.cookies = cookies;
    }
  }

  defaultHeaders(init?: HeadersInit): HeadersInit {
    const cookies: string | undefined = this.cookies
    console.log(cookies)
    return cookies === undefined ?
      init : {
        ...init,
        'Cookie': cookies
      }
  }

  async getTerms(offset: number, max: number): Promise<TermsResponse> {
    const urlParams = new URLSearchParams({
      searchTerms: '',
      offset: offset.toString(),
      max: max.toString(),
    });

    const url = `${BANNER_SSB_GET_TERMS}?${urlParams}`;
    const response = await fetch(url);
    this.saveCookies(response);

    return {
      response: await response.json()
    } as TermsResponse;
  }

  async setTerm(term: string) {
    if (!this.cookies) await this.getTerms(0, 1);

    if (this.term === term && this.cookies) return

    const url = `${BANNER_SSB_URL}/term/search?mode=search`;
    const params = new URLSearchParams({ term });
    // post fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: params,
    });
    this.saveCookies(response);

    if (response.status !== 200) throw new Error()
    this.term = term
  }

  async getSubjects(searchTerm: string, term: string, offset: string, max: string) {
    const params = new URLSearchParams({
      searchTerm,
      offset,
      term,
      max,
    });

    const url = `${BANNER_SSB_SEARCH_GET_SUBJECTS}?${params}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders()
    });
    this.saveCookies(response);

    return {
      response: await response.json()
    }
  };

  static getSearchResultsParams({ subject, term, offset, max }: SearchResultsParams): URLSearchParams {
    const params = new URLSearchParams({
      txt_subject: subject ?? '',
      txt_term: term ?? '',
      startDatepicker: "",
      endDatepicker: "",
      pageOffset: offset?.toString() ?? '0',
      // has a limit of 500
      pageMaxSize: max?.toString() ?? '1000',
      sortColumn: "subjectDescription",
      sortDirection: "asc",
    });
    return params;
  }

  async getSearchResults(subject?: string, offset?: number) {
    if (!this.cookies) throw new Error('cookies not set')
    const params = BannerClient.getSearchResultsParams({ subject, term: this.term, offset });

    const url = `${BANNER_SSD_SEARCH_RESULTS_URL}?${params}`;
    const headers = this.defaultHeaders()
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    this.saveCookies(response);

    const result = await response.json() as BannerResponse<any[]>

    return {
      response: result,
    };
  }

  async getSearchResultsAll(subject?: string): Promise<Section[]> {
    if (!this.cookies) throw new Error('cookies not set')
    const params = BannerClient.getSearchResultsParams({ subject, term: this.term });

    const url = `${BANNER_SSD_SEARCH_RESULTS_URL}?${params}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders()
    });
    this.saveCookies(response);

    // parse initial response
    const result = await response.json() as BannerResponse<any[]>

    if (!result.success) throw new Error('')

    // create offsets
    const offsets: number[] = []
    for (let offset = result.data.length; offset <= result.sectionsFetchedCount; offset += result.pageMaxSize) {
      offsets.push(offset)
    }

    // grab remaining data
    const results = await Promise.all(offsets.map(async (o) => {
      return (await this.getSearchResults(subject, o)).response.data
    }))
    // concat
    const data = result.data.concat(...results) as Section[]
    return data
  }
} 