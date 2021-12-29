import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {appWithTranslation, withTranslation} from 'next-i18next';

import '~/styles/index.scss';

import store, {wrapper} from '~/store';
import {I18nContext, HistoryProvider} from '~/context';

interface ProdAppProps extends AppProps {
  t: any;
}

const ProdApp: React.FC<ProdAppProps> = ({Component, pageProps, t}) => (
  <I18nContext.Provider value={t}>
    <Provider store={store}>
      <HistoryProvider>
        <Component {...pageProps} />
      </HistoryProvider>
    </Provider>
  </I18nContext.Provider>
);

export default wrapper.withRedux(
  appWithTranslation(withTranslation('common')(ProdApp)),
);
