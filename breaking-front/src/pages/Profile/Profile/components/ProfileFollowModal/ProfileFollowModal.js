import useFollowerList from 'pages/Profile/Profile/hooks/queries/useFollowerList';
import useFollowingList from 'pages/Profile/Profile/hooks/queries/useFollowingList';
import React from 'react';
import PropTypes from 'prop-types';
import ProfileCardsModal from '../../../../../components/ProfileCardsModal/ProfileCardsModal';

const ProfileFollowModal = ({
  isFollowerModalOpen,
  isFollowingModalOpen,
  toggleFollowerModal,
  toggleFollowingModal,
  userId,
}) => {
  return (
    <>
      <ProfileCardsModal
        title="팔로워"
        toggleModal={toggleFollowerModal}
        isModalOpen={isFollowerModalOpen}
        infiniteQueryResult={useFollowerList(userId)}
        isPermission={true}
      />
      <ProfileCardsModal
        title="팔로잉"
        toggleModal={toggleFollowingModal}
        isModalOpen={isFollowingModalOpen}
        infiniteQueryResult={useFollowingList(userId)}
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
