import useFollowerList from 'pages/Profile/Profile/hooks/queries/useFollowerList';
import useFollowingList from 'pages/Profile/Profile/hooks/queries/useFollowingList';
import React from 'react';
import PropTypes from 'prop-types';
import ProfileCardsModal from '../../../../../components/ProfileCardsModal/ProfileCardsModal';
import { useQueryClient } from 'react-query';
import useUnFollow, {
  toggleIsFollowingField,
} from 'hooks/mutations/useUnFollow';
import useFollow from 'hooks/mutations/useFollow';

const ProfileFollowModal = ({
  isFollowerModalOpen,
  isFollowingModalOpen,
  toggleFollowerModal,
  toggleFollowingModal,
  userId,
}) => {
  const queryClient = useQueryClient();

  const option = {
    onSuccess: (data, followId) => {
      queryClient.invalidateQueries('profile');
      toggleIsFollowingField({
        queryClient,
        followId,
        queryKey: ['followingList', userId],
      });
      toggleIsFollowingField({
        queryClient,
        followId,
        queryKey: ['followerList', userId],
      });
    },
  };

  const UnFollowMutation = useUnFollow(null, option);

  const FollowMutation = useFollow(null, option);

  return (
    <>
      <ProfileCardsModal
        title="팔로워"
        toggleModal={toggleFollowerModal}
        isModalOpen={isFollowerModalOpen}
        FollowMutation={FollowMutation}
        UnFollowMutation={UnFollowMutation}
        infiniteQuery={useFollowerList(userId)}
      />
      <ProfileCardsModal
        title="팔로잉"
        toggleModal={toggleFollowingModal}
        isModalOpen={isFollowingModalOpen}
        FollowMutation={FollowMutation}
        UnFollowMutation={UnFollowMutation}
        infiniteQuery={useFollowingList(userId)}
      />
    </>
  );
};

ProfileFollowModal.propTypes = {
  isFollowerModalOpen: PropTypes.bool,
  isFollowingModalOpen: PropTypes.bool,
  toggleFollowerModal: PropTypes.func,
  toggleFollowingModal: PropTypes.func,
  userId: PropTypes.number,
};

export default ProfileFollowModal;
