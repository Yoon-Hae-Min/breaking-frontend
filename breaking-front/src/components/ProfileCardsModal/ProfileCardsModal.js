import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import Modal from 'components/Modal/Modal';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserInformationContext } from 'providers/UserInformationProvider';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUnFollow, postFollow } from 'api/profile';
import { FollowCardSkeleton } from 'components/Skeleton/Skeleton';
import FollowCard from 'components/FollowCard/FollowCard';
import { PAGE_PATH } from 'constants/path';

const ProfileCardsModal = ({
  title,
  toggleModal,
  isModalOpen,
  infiniteQueryResult,
  isPermission,
}) => {
  const navigate = useNavigate();
  const userData = useContext(UserInformationContext);
  const queryClient = useQueryClient();
  const {
    data: FollowData,
    isFetching: isFollowListFetching,
    fetchNextPage: FetchNextFollowList,
    hasNextPage: isFollowListHasNextPage,
  } = infiniteQueryResult;

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

  const Cards = ({ isRowLoaded, rowIndex, columnIndex, style, key }) => {
    return !isRowLoaded(rowIndex * 2 + columnIndex) ? (
      <div style={style} key={key}>
        <FollowCardSkeleton />
      </div>
    ) : (
      <div style={style} key={key}>
        <FollowCard
          cardClick={() => {
            toggleModal();
            navigate(
              PAGE_PATH.PROFILE(FollowData[rowIndex * 2 + columnIndex].userId)
            );
          }}
          isPermission={
            FollowData[rowIndex * 2 + columnIndex].userId !== userData.userId &&
            userData.isLogin &&
            isPermission
          }
          profileData={FollowData[rowIndex * 2 + columnIndex]}
          key={`follow-${FollowData[rowIndex * 2 + columnIndex].userId}`}
          FollowMutation={FollowMutation}
          UnFollowMutation={UnFollowMutation}
        />
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
  toggleModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  infiniteQueryResult: PropTypes.object,
  isPermission: PropTypes.bool,
};

export default ProfileCardsModal;
