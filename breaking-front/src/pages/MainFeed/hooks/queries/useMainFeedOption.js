import { getFeeds } from 'api/mainFeed';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const useMainFeedOption = (sort, option) => {
  return useInfiniteQuery(['mainFeedOption', { sort, option }], getFeeds, {
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
};

export default useMainFeedOption;
