import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import Modal from 'components/Modal/Modal';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserInformationContext } from 'providers/UserInformationProvider';
import { FollowCardSkeleton } from 'components/Skeleton/Skeleton';
import FollowCard from 'components/FollowCard/FollowCard';
import { PAGE_PATH } from 'constants/path';

const ProfileCardsModal = ({
  title,
  FollowMutation,
  UnFollowMutation,
  infiniteQuery,
  toggleModal,
  isModalOpen,
}) => {
  const navigate = useNavigate();
  const userData = useContext(UserInformationContext);
  const {
    data: FollowData,
    isFetching: isFollowListFetching,
    fetchNextPage: FetchNextFollowList,
    hasNextPage: isFollowListHasNextPage,
  } = infiniteQuery;

  const Cards = ({ isRowLoaded, rowIndex, columnIndex, style, key }) => {
    return !isRowLoaded(rowIndex * 2 + columnIndex) ? (
      <div style={style} key={key}>
        <FollowCardSkeleton />
      </div>
    ) : (
      <div style={style} key={key}>
        {FollowData[rowIndex * 2 + columnIndex] && (
          <FollowCard
            cardClick={() => {
              toggleModal();
              navigate(
                PAGE_PATH.PROFILE(FollowData[rowIndex * 2 + columnIndex].userId)
              );
            }}
            isPermission={
              FollowData[rowIndex * 2 + columnIndex].userId !==
                userData.userId &&
              userData.isLogin &&
              !!FollowMutation &&
              !!UnFollowMutation
            }
            profileData={FollowData[rowIndex * 2 + columnIndex]}
            key={`follow-${FollowData[rowIndex * 2 + columnIndex].userId}`}
            FollowMutation={FollowMutation}
            UnFollowMutation={UnFollowMutation}
          />
        )}
      </div>
    );
  };
  Cards.propTypes = {
    isRowLoaded: PropTypes.func,
    rowIndex: PropTypes.number,
    columnIndex: PropTypes.number,
    style: PropTypes.object,
    key: PropTypes.string,
  };

  return (
    <Modal
      isOpen={isModalOpen}
      closeClick={toggleModal}
      title={title}
      grid={false}
    >
      {FollowData && (
        <InfiniteGridWrapper
          hasNextPage={isFollowListHasNextPage}
          data={FollowData}
          isNextPageLoading={isFollowListFetching}
          loadNextPage={FetchNextFollowList}
          rowHeight={100}
          columnWidth={416}
          totalWidth={850}
          totalHeight={400}
          columnCount={2}
          itemComponent={Cards}
          isUseWindowScroll={false}
        />
      )}
    </Modal>
  );
};

ProfileCardsModal.propTypes = {
  title: PropTypes.string,
  isModalOpen: PropTypes.bool,
  UnFollowMutation: PropTypes.object,
  FollowMutation: PropTypes.object,
  toggleModal: PropTypes.func,
  infiniteQuery: PropTypes.object,
};

export default ProfileCardsModal;
