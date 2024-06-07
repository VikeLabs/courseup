import makeFetchCookie from 'fetch-cookie';

const _ = makeFetchCookie(fetch);

export type Fetch = typeof _;
