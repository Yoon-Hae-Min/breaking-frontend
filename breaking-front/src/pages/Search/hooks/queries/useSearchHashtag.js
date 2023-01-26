import { getSearchHashtag } from 'api/search';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const useSearchHashtag = (content, size, sort, option) =>
  useInfiniteQuery(
    ['searchHashtag', { content, size, sort, option }],
    getSearchHashtag,
    {
      staleTime: 0,
      cacheTime: 0,
      getNextPageParam: (lastPage) => {
        return lastPage.cursor;
      },
      select: USEINFINITEQUERY_OPTION.SELECT,
    }
  );
export default useSearchHashtag;
