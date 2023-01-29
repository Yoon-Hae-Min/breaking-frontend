import React from 'react';
import PropTypes from 'prop-types';
import usePostLikeList from 'pages/Post/Post/hooks/queries/usePostLikeList';
import ProfileCardsModal from 'components/ProfileCardsModal/ProfileCardsModal';
import useFollow from 'hooks/mutations/useFollow';
import useUnFollow from 'hooks/mutations/useUnFollow';

const PostLikeListModal = ({ postId, isOpen, closeClick }) => {
  const queryKey = ['postLikeList', postId, 10];
  return (
    <ProfileCardsModal
      title="좋아요"
      toggleModal={closeClick}
      isModalOpen={isOpen}
      infiniteQuery={usePostLikeList(queryKey)}
      FollowMutation={useFollow(queryKey)}
      UnFollowMutation={useUnFollow(queryKey)}
    />
  );
};

PostLikeListModal.propTypes = {
  postId: PropTypes.number,
  isOpen: PropTypes.bool,
  closeClick: PropTypes.func,
};

export default PostLikeListModal;
