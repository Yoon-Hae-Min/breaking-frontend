import { getPostLikeList } from 'api/post';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const usePostLikeList = (queryKey) => {
  console.log(queryKey);
  return useInfiniteQuery(queryKey, getPostLikeList, {
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
};

export default usePostLikeList;
