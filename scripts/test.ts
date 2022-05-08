import { BannerClient } from '../utils/bannerClient'

const banner = new BannerClient()

const main = async () => {
    console.log(await banner.getTerms(1, 199))
    await banner.setTerm('202201');
    const results = await banner.getSearchResultsAll();
    console.log(JSON.stringify(results, null, 2))
}
main()