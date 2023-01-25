import React from 'react';
import PropTypes from 'prop-types';
import usePostBoughtList from 'pages/Post/Post/hooks/queries/usePostBoughtList';
import ProfileCardsModal from 'components/ProfileCardsModal/ProfileCardsModal';

const PostBoughtListModal = ({ postId, isOpen, closeClick }) => {
  return (
    <ProfileCardsModal
      title="구매자 목록"
      toggleModal={closeClick}
      isModalOpen={isOpen}
      infiniteQueryResult={usePostBoughtList(postId)}
      isPermission={false}
    />
  );
};

PostBoughtListModal.propTypes = {
  postId: PropTypes.number,
  isOpen: PropTypes.bool,
  closeClick: PropTypes.func,
};

export default PostBoughtListModal;
