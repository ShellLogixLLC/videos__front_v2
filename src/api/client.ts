import axios from 'axios';
import * as cookie from 'cookie';
import * as setCookie from 'set-cookie-parser';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const defaultOptions = {
  baseURL: 'https://obscure-harbor-76716.herokuapp.com/api',
};

const api = axios.create(defaultOptions);

createAuthRefreshInterceptor(api, (failedRequest) =>
  api.get('/api/refreshToken').then((resp) => {
    if (api.defaults.headers.setCookie) {
      delete api.defaults.headers.setCookie;
    }
    const {accessToken} = resp.data;

    const bearer = `Bearer ${accessToken}`;
    api.defaults.headers.Authorization = bearer;

    const responseCookie = setCookie.parse(resp.headers['set-cookie'])[0];
    api.defaults.headers.setCookie = resp.headers['set-cookie'];
    api.defaults.headers.cookie = cookie.serialize(
      responseCookie.name,
      responseCookie.value,
    );

    failedRequest.response.config.headers.Authorization = bearer;

    return Promise.resolve();
  }),
);

export default api;
