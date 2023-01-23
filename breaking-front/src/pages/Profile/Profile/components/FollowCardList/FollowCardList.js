import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATH } from 'constants/path';
import { UserInformationContext } from 'providers/UserInformationProvider';
import FollowCard from 'components/FollowCard/FollowCard';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUnFollow, postFollow } from 'api/profile';

const FollowCardList = ({ toggleModal, followList }) => {
  const navigate = useNavigate();
  const userData = useContext(UserInformationContext);

  const queryClient = useQueryClient();

  const UnFollowMutation = useMutation(deleteUnFollow, {
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      //에러처리
    },
  });
  const FollowMutation = useMutation(postFollow, {
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries('profile');
    },
    onError: () => {
      //에러처리
    },
  });
  return (
    <>
      {followList.map((item) => (
        <FollowCard
          cardClick={() => {
            toggleModal();
            navigate(PAGE_PATH.PROFILE(item.userId));
          }}
          isPermission={item.userId !== userData.userId && userData.isLogin}
          profileData={item}
          key={`follow-${item.userId}`}
          FollowMutation={FollowMutation}
          UnFollowMutation={UnFollowMutation}
        />
      ))}
    </>
  );
};

FollowCardList.propTypes = {
  toggleModal: PropTypes.func,
  followList: PropTypes.array,
};

export default FollowCardList;
