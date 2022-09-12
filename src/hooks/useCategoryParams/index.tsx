import {useEffect, useState} from 'react';
import {isEqual} from 'lodash';
import {useRouter} from 'next/router';

import {useWindowSize} from '~/hooks';
import {SortingParamsType, SetSortingParamsType} from '~/types';
import {INITIAL_PAGINATION_ROWS_PER_PAGE} from '~/constants';

const useCategoryParams = (rowsPerPage: number): SetSortingParamsType => {
  const {query} = useRouter();
  const {isMinTablet} = useWindowSize();

  const queryname = query?.name;
  const queryPage = query?.page;
  const queryEndDate = query?.endDate;
  const queryDateSort = query?.dateSort;
  const queryLikeSort = query?.likesSort;
  const queryViewSort = query.viewsSort;
  const queryStartDate = query?.startDate;
  const queryDuratonSort = query.durationSort;

  const activePage = Number(queryPage) || 0;

  const limit = isMinTablet ? rowsPerPage : INITIAL_PAGINATION_ROWS_PER_PAGE;
  const offset = !isMinTablet
    ? activePage * INITIAL_PAGINATION_ROWS_PER_PAGE
    : 0;
  const endDate = queryEndDate ? String(queryEndDate) : '';
  const startDate = queryStartDate ? String(queryStartDate) : '';
  const likesSort = Number(queryLikeSort) || '';
  const dateSort = Number(queryDateSort) || '';
  const viewsSort = Number(queryViewSort) || '';
  const categoryIds = [queryname] || [];
  const durationSort = Number(queryDuratonSort) || '';

  const initialParams = {
    limit,
    offset,
    categoryIds: categoryIds,
    startDate,
    endDate,
    dateSort,
    likesSort,
    viewsSort,
    durationSort,
  };

  const [params, setParams] = useState<SortingParamsType>(initialParams);

  useEffect(() => {
    if (!isEqual(initialParams, params)) {
      setParams(initialParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    limit,
    queryname,
    queryPage,
    queryEndDate,
    queryLikeSort,
    queryViewSort,
    queryStartDate,
    queryDuratonSort,
    queryDateSort,
  ]);

  return {
    params,
    setParams,
  };
};

export default useCategoryParams;
