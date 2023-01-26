import { getPostBoughtList } from 'api/post';
import { USEINFINITEQUERY_OPTION } from 'constants/queryOption';
import { useInfiniteQuery } from 'react-query';

const usePostBoughtList = (postId) => {
  return useInfiniteQuery(['postBoughtList', postId], getPostBoughtList, {
    getNextPageParam: (lastPage) => {
      return lastPage.cursor;
    },
    select: USEINFINITEQUERY_OPTION.SELECT,
  });
};

export default usePostBoughtList;
