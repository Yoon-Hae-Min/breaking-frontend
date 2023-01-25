import useFollowerList from 'pages/Profile/Profile/hooks/queries/useFollowerList';
import useFollowingList from 'pages/Profile/Profile/hooks/queries/useFollowingList';
import React from 'react';
import PropTypes from 'prop-types';
import FollowModal from '../FollowModal/FollowModal';

const ProfileFollowModal = ({
  isFollowerModalOpen,
  isFollowingModalOpen,
  toggleFollowerModal,
  toggleFollowingModal,
  userId,
}) => {
  return (
    <>
      <FollowModal
        title="팔로워"
        userId={userId}
        toggleFollowModal={toggleFollowerModal}
        isFollowModalOpen={isFollowerModalOpen}
        infiniteQuery={useFollowerList}
        isPermission={true}
      />
      <FollowModal
        title="팔로잉"
        userId={userId}
        toggleFollowModal={toggleFollowingModal}
        isFollowModalOpen={isFollowingModalOpen}
        infiniteQuery={useFollowingList}
        isPermission={true}
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
