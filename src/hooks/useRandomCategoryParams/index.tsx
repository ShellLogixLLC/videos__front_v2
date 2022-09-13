import {useEffect, useState} from 'react';
import {isEqual} from 'lodash';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {RandomSortingParamsType, SetRandomSortingParamsType} from '~/types';
import {INITIAL_PAGINATION_ROWS_PER_PAGE} from '~/constants';

const useCategoryParams = (rowsPerPage: number): SetRandomSortingParamsType => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const queryname = query?.name;
  const queryPage = query?.page;
  const queryEndDate = query?.endDate;
  const queryStartDate = query?.startDate;

  const limit = isMinTablet ? rowsPerPage : INITIAL_PAGINATION_ROWS_PER_PAGE;
  const endDate = queryEndDate ? String(queryEndDate) : '';
  const startDate = queryStartDate ? String(queryStartDate) : '';
  const categoryIds = [queryname];

  const initialParams = {
    limit,
    categoryIds: categoryIds,
    startDate,
    endDate,
  };

  const [params, setParams] = useState<RandomSortingParamsType>(initialParams);

  useEffect(() => {
    if (!isEqual(initialParams, params)) {
      setParams(initialParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, queryname, queryPage, queryEndDate, queryStartDate]);

  return {
    params,
    setParams,
  };
};

export default useCategoryParams;
