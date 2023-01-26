import React from 'react';
import PropTypes from 'prop-types';
import usePostLikeList from 'pages/Post/Post/hooks/queries/usePostLikeList';
import ProfileCardsModal from 'components/ProfileCardsModal/ProfileCardsModal';

const PostLikeListModal = ({ postId, isOpen, closeClick }) => {
  return (
    <ProfileCardsModal
      title="좋아요"
      toggleModal={closeClick}
      isModalOpen={isOpen}
      infiniteQueryResult={usePostLikeList(postId, 10)}
      isPermission={true}
    />
  );
};

PostLikeListModal.propTypes = {
  postId: PropTypes.number,
  isOpen: PropTypes.bool,
  closeClick: PropTypes.func,
};

export default PostLikeListModal;
