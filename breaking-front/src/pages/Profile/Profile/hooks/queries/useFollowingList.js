import { getFollowings } from 'api/profile';
import { useInfiniteQuery } from 'react-query';

const useFollowingList = (userId) =>
  useInfiniteQuery(['followingList', userId], getFollowings, {
    cacheTime: 0,
    staleTime: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: (data) => {
      return data.pages.reduce((acc, { result }) => [...result, ...acc], []);
    },
  });
export default useFollowingList;
