import {Provider} from 'react-redux';
import {AppProps} from 'next/app';

import '~/styles/index.scss';

import store, {wrapper} from '~/store';
import {HistoryProvider} from '~/context';

const ProdApp: React.FC<AppProps> = ({Component, pageProps}) => (
  <Provider store={store}>
    <HistoryProvider>
      <Component {...pageProps} />
    </HistoryProvider>
  </Provider>
);

export default wrapper.withRedux(ProdApp);
