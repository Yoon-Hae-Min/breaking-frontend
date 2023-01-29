import { deleteUnFollow } from 'api/profile';
import { useMutation, useQueryClient } from 'react-query';

export const toggleIsFollowingField = ({ queryClient, followId, queryKey }) => {
  const previousFollow = queryClient.getQueryData(queryKey);
  console.log(queryKey);
  if (previousFollow) {
    queryClient.setQueryData(queryKey, {
      ...previousFollow,
      pages: [
        ...previousFollow.pages.map(({ cursor, result }) => {
          return {
            cursor,
            result: result.map((item) =>
              item.userId === followId
                ? {
                    ...item,
                    isFollowing: !item.isFollowing,
                  }
                : {
                    ...item,
                  }
            ),
          };
        }),
      ],
    });
  }
};

const useUnFollow = (queryKey, option) => {
  const queryClient = useQueryClient();
  return useMutation(deleteUnFollow, {
    onSuccess: (data, followId) =>
      queryKey && toggleIsFollowingField({ queryClient, followId, queryKey }),
    ...option,
  });
};

export default useUnFollow;
