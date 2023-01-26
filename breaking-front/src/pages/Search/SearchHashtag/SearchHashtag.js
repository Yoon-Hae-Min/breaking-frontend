import React, { useState } from 'react';
import * as Style from 'pages/Search/SearchHashtag/SearchHashtag.styles';
import SearchHeader from 'pages/Search/components/SearchHeader/SearchHeader';
import Feed from 'components/Feed/Feed';
import useSearchHashtag from 'pages/Search/hooks/queries/useSearchHashtag';
import { FeedSkeleton } from 'components/Skeleton/Skeleton';
import useConvertURLQuery from 'pages/Search/hooks/useConvertURLQuery';
import NoData from 'components/NoData/NoData';
import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import PropTypes from 'prop-types';

const SearchHashtag = () => {
  const currentQuery = useConvertURLQuery();

  const [sort, setSort] = useState('chronological');
  const [option, setOption] = useState('all');

  const {
    data: searchHashtagResult,
    fetchNextPage: FetchNextSearchHashtag,
    isFetching: isFetchSearchHashtag,
    hasNextPage: hasNextSearchHashtag,
  } = useSearchHashtag(currentQuery, 10, sort, option);

  const Feeds = ({ isRowLoaded, rowIndex, columnIndex, style, key }) => {
    return !isRowLoaded(rowIndex * 2 + columnIndex) ? (
      <Style.FeedWrapper style={style} key={key}>
        <FeedSkeleton />
      </Style.FeedWrapper>
    ) : (
      <Style.FeedWrapper style={style} key={key}>
        <Feed
          feedData={
            searchHashtagResult &&
            searchHashtagResult[rowIndex * 2 + columnIndex]
          }
          key={searchHashtagResult[rowIndex * 2 + columnIndex]?.postId}
        />
      </Style.FeedWrapper>
    );
  };

  Feeds.propTypes = {
    isRowLoaded: PropTypes.func,
    rowIndex: PropTypes.number,
    columnIndex: PropTypes.number,
    style: PropTypes.object,
    key: PropTypes.string,
  };

  return (
    <>
      <SearchHeader focusTab={2} />
      <Style.PostFilter
        setSort={setSort}
        option={option}
        setOption={setOption}
        queryKey="search"
      />
      {searchHashtagResult && (
        <InfiniteGridWrapper
          hasNextPage={hasNextSearchHashtag}
          data={searchHashtagResult}
          isNextPageLoading={isFetchSearchHashtag}
          loadNextPage={FetchNextSearchHashtag}
          totalWidth={950}
          rowHeight={520}
          columnWidth={475}
          columnCount={2}
          itemComponent={Feeds}
          isUseWindowScroll={true}
          noContentRenderer={() => (
            <Style.NoDataContainer>
              <NoData message="검색결과 없음" />
            </Style.NoDataContainer>
          )}
        />
      )}
    </>
  );
};

export default SearchHashtag;
