import Modal from 'components/Modal/Modal';
import useFollowerList from 'pages/Profile/Profile/hooks/queries/useFollowerList';
import useFollowingList from 'pages/Profile/Profile/hooks/queries/useFollowingList';
import React from 'react';
import PropTypes from 'prop-types';
import FollowList from '../FollowList/FollowList';

const ProfileFollowModal = ({
  isFollowerModalOpen,
  isFollowingModalOpen,
  toggleFollowerModal,
  toggleFollowingModal,
  userId,
}) => {
  const {
    data: followerListData,
    isFetching: isFollowerListFetching,
    fetchNextPage: FetchNextFollowerList,
    hasNextPage: isFollowerListHasNextPage,
  } = useFollowerList(userId);

  const {
    data: followingListData,
    isFetching: isFollowingListFetching,
    fetchNextPage: FetchNextFollowingList,
    hasNextPage: isFollowingListHasNextPage,
  } = useFollowingList(userId);

  return (
    <>
      <Modal
        isOpen={isFollowerModalOpen}
        closeClick={toggleFollowerModal}
        title="팔로워"
        grid={false}
      >
        {followerListData && (
          <FollowList
            hasNextPage={isFollowerListHasNextPage}
            items={followerListData.pages}
            isNextPageLoading={isFollowerListFetching}
            loadNextPage={FetchNextFollowerList}
            toggleFollowModal={toggleFollowerModal}
          />
        )}
      </Modal>
      <Modal
        isOpen={isFollowingModalOpen}
        closeClick={toggleFollowingModal}
        title="팔로잉"
      >
        {followingListData && (
          <FollowList
            hasNextPage={isFollowingListHasNextPage}
            items={followingListData.pages}
            isNextPageLoading={isFollowingListFetching}
            loadNextPage={FetchNextFollowingList}
            toggleFollowModal={toggleFollowingModal}
          />
        )}
      </Modal>
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
