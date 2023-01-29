import { postFollow } from 'api/profile';
import { useMutation, useQueryClient } from 'react-query';
import { toggleIsFollowingField } from './useUnFollow';

const useFollow = (queryKey, option) => {
  const queryClient = useQueryClient();
  return useMutation(postFollow, {
    onSuccess: (data, followId) =>
      queryKey && toggleIsFollowingField({ queryClient, followId, queryKey }),
    ...option,
  });
};

export default useFollow;
