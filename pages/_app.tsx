import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import {appWithTranslation} from 'next-i18next';

import 'emoji-mart/css/emoji-mart.css';
import 'react-toastify/dist/ReactToastify.css';

import '~/styles/index.scss';
import React, {useEffect} from 'react';

import store, {wrapper} from '~/store';
import {getCookieFromBrowser} from '~/libraries';
import {authActions, authSelect} from '~/store/auth';
import {useAppDispatch, useAppSelector} from '~/hooks';
import {
  HistoryProvider,
  ModalContextProvider,
  ToastContextProvider,
} from '~/context';

import nextI18nConfig from '../next-i18next.config';

const ProdApp: React.FC<AppProps> = ({Component, pageProps}) => {
  const dispatch = useAppDispatch();
  const token = getCookieFromBrowser('token');
  const {userInfo} = useAppSelector(authSelect);

  useEffect(() => {
    if (!userInfo && token) {
      dispatch(authActions.loginWithToken({token: token as string}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
};

export default wrapper.withRedux(appWithTranslation(ProdApp, nextI18nConfig));
