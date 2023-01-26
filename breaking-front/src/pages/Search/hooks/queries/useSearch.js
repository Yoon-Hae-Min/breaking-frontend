import { getSearch } from 'api/search';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const useSearch = (content, size, sort, option) =>
  useInfiniteQuery(['search', { content, size, sort, option }], getSearch, {
    staleTime: 0,
    cacheTime: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
export default useSearch;
