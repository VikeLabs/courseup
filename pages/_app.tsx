import type { AppProps /*, AppContext */ } from 'next/app';
// React Big Calendar
import 'react-big-calendar/lib/sass/styles.scss';
import '../src/index.css';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}
export default App;
