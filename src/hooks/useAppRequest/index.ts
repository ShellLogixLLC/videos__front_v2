import useSWR from 'swr';
import {AxiosResponse, AxiosError} from 'axios';

import {client} from '~/api';

import {GetRequest, IConfig, IUseRequestReturn} from './types';

const useRequest = <Data = any, Error = unknown>(
  request: GetRequest,
  {fallbackData, ...config}: IConfig<Data, Error> = {},
): IUseRequestReturn<Data, Error> => {
  const {
    error,
    mutate,
    isValidating,
    data: response,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => client(request!),
    {
      ...config,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      fallbackData: fallbackData && {
        status: 200,
        statusText: 'InitialData',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        config: request!,
        headers: {},
        data: fallbackData,
      },
    },
  );

  return {
    error,
    mutate,
    response,
    isValidating,
    data: response && response.data,
  };
};

export default useRequest;
