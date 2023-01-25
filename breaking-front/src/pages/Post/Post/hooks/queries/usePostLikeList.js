import { getPostLikeList } from 'api/post';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const usePostLikeList = (postId, size) => {
  return useInfiniteQuery(['postLikeList', postId, size], getPostLikeList, {
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
};

export default usePostLikeList;
