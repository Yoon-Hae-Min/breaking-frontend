import { getFeeds } from 'api/mainFeed';
import { useInfiniteQuery } from 'react-query';

const useMainFeedOption = (sort, option) => {
  return useInfiniteQuery(['mainFeedOption', { sort, option }], getFeeds, {
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: (data) => {
      return data.pages.reduce((acc, { result }) => [...result, ...acc], []);
    },
  });
};

export default useMainFeedOption;
