import { getFollowers } from 'api/profile';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const useFollowerList = (userId) =>
  useInfiniteQuery(['followerList', userId], getFollowers, {
    cacheTime: 0,
    staleTime: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
export default useFollowerList;
