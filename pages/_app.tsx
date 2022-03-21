import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import {GetStaticProps} from 'next';
import {appWithTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import 'emoji-mart/css/emoji-mart.css';
import 'react-toastify/dist/ReactToastify.css';

import '~/styles/index.scss';
import store, {wrapper} from '~/store';
import {
  HistoryProvider,
  ModalContextProvider,
  ToastContextProvider,
} from '~/context';

import nextI18NextConfig from '../next-i18next.config';

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

export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['common'],
        nextI18NextConfig,
      )),
    },
  };
};

export default wrapper.withRedux(appWithTranslation(ProdApp));
