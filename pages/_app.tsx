import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {appWithTranslation} from 'next-i18next';

import 'emoji-mart/css/emoji-mart.css';

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

export default wrapper.withRedux(appWithTranslation(ProdApp));
