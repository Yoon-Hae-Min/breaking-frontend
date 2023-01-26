import React from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import * as Style from '../FollowList/FollowList.styles';
import FollowCardList from '../FollowCardList/FollowCardList';
import { FollowCardSkeleton } from 'components/Skeleton/Skeleton';
import PropTypes from 'prop-types';

const FollowList = ({
  hasNextPage,
  items,
  isNextPageLoading,
  loadNextPage,
  toggleFollowModal,
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length - 1;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const Cards = ({ index, style }) => {
    return (
      <Style.CardListLayout style={style}>
        {!isItemLoaded(index) ? (
          <>
            <FollowCardSkeleton />
            <FollowCardSkeleton />
            <FollowCardSkeleton />
            <FollowCardSkeleton />
            <FollowCardSkeleton />
            <FollowCardSkeleton />
          </>
        ) : (
          <FollowCardList
            toggleModal={toggleFollowModal}
            followList={items[index].result}
          />
        )}
      </Style.CardListLayout>
    );
  };

  Cards.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
  };

  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      isItemLoaded={isItemLoaded}
      threshold={1}
    >
      {({ onItemsRendered }) => {
        return (
          <Style.ReactWindowList
            className="List"
            height={400}
            width={850}
            itemCount={itemCount}
            itemSize={360}
            onItemsRendered={onItemsRendered}
          >
            {Cards}
          </Style.ReactWindowList>
        );
      }}
    </InfiniteLoader>
  );
};

FollowList.propTypes = {
  hasNextPage: PropTypes.func,
  items: PropTypes.array,
  isNextPageLoading: PropTypes.bool,
  loadNextPage: PropTypes.func,
  toggleFollowModal: PropTypes.func,
};

export default FollowList;
