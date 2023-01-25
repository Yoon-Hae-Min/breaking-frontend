import { getFollowings } from 'api/profile';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const useFollowingList = (userId) =>
  useInfiniteQuery(['followingList', userId], getFollowings, {
    cacheTime: 0,
    staleTime: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
export default useFollowingList;
