import React from 'react';
import SearchHeader from 'pages/Search/components/SearchHeader/SearchHeader';
import SearchUserResultCard from 'pages/Search/SearchUser/components/SearchUserResultCard/SearchUserResultCard';
import * as Style from 'pages/Search/SearchUser//SearchUser.styles';
import SearchUserResultCardSkeleton from 'pages/Search/SearchUser/components/SearchUserResultCardSkeleton/SearchUserResultCardSkeleton';
import useSearchUser from 'pages/Search/hooks/queries/useSearchUser';
import useConvertURLQuery from 'pages/Search/hooks/useConvertURLQuery';
import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import PropTypes from 'prop-types';

const SearchUser = () => {
  const currentQuery = useConvertURLQuery();

  const {
    data: searchUserResult,
    isFetching: isSearchUserFetching,
    fetchNextPage: FetchNextSearchUser,
    hasNextPage: hasNextSearchUser,
  } = useSearchUser(currentQuery, 10);

  const UserResultCard = ({
    isRowLoaded,
    rowIndex,
    columnIndex,
    style,
    key,
  }) => {
    return !isRowLoaded(rowIndex + columnIndex) ? (
      <Style.UserCardWrapper style={style} key={key}>
        <SearchUserResultCardSkeleton />
      </Style.UserCardWrapper>
    ) : (
      <Style.UserCardWrapper style={style} key={key}>
        <SearchUserResultCard
          user={searchUserResult[rowIndex + columnIndex]}
          key={searchUserResult[rowIndex + columnIndex]?.userId}
        />
      </Style.UserCardWrapper>
    );
  };

  UserResultCard.propTypes = {
    isRowLoaded: PropTypes.func,
    rowIndex: PropTypes.number,
    columnIndex: PropTypes.number,
    style: PropTypes.object,
    key: PropTypes.string,
  };

  return (
    <>
      <SearchHeader focusTab={3} />
      {searchUserResult && (
        <InfiniteGridWrapper
          hasNextPage={hasNextSearchUser}
          data={searchUserResult}
          isNextPageLoading={isSearchUserFetching}
          loadNextPage={FetchNextSearchUser}
          rowHeight={160}
          columnWidth={950}
          columnCount={1}
          itemComponent={UserResultCard}
          isUseWindowScroll={true}
        />
      )}
      {/* <Style.NoDataContainer>
              <NoData message="검색결과 없음" />
            </Style.NoDataContainer> */}
    </>
  );
};

export default SearchUser;
