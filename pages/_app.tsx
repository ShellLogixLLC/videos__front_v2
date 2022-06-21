import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import {appWithTranslation} from 'next-i18next';

import nextI18nConfig from '../next-i18next.config';

import 'emoji-mart/css/emoji-mart.css';
import 'react-toastify/dist/ReactToastify.css';

import '~/styles/index.scss';
import store, {wrapper} from '~/store';
import {
  HistoryProvider,
  ModalContextProvider,
  ToastContextProvider,
} from '~/context';

const ProdApp: React.FC<AppProps> = ({Component, pageProps}) => (
  <Provider store={store}>
    <ModalContextProvider>
      <ToastContextProvider>
        <HistoryProvider>
          <NextNprogress
            height={3}
            color="#f32d36"
            stopDelayMs={200}
            startPosition={0.3}
            showOnShallow={true}
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
        </HistoryProvider>
      </ToastContextProvider>
    </ModalContextProvider>
  </Provider>
);

export default wrapper.withRedux(appWithTranslation(ProdApp, nextI18nConfig));
