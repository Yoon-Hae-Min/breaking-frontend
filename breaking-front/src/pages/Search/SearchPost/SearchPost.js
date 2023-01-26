import React, { useState } from 'react';
import * as Style from 'pages/Search/SearchPost/SearchPost.styles';
import SearchHeader from 'pages/Search/components/SearchHeader/SearchHeader';
import Feed from 'components/Feed/Feed';
import useSearch from 'pages/Search/hooks/queries/useSearch';
import { FeedSkeleton } from 'components/Skeleton/Skeleton';
import useConvertURLQuery from 'pages/Search/hooks/useConvertURLQuery';
import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import PropTypes from 'prop-types';

const SearchPost = () => {
  const currentQuery = useConvertURLQuery();

  const [sort, setSort] = useState('chronological');
  const [option, setOption] = useState('all');

  const {
    data: searchPostResult,
    fetchNextPage: FetchNextSearchPost,
    isFetching: isFetchSearchPost,
    hasNextPage: hasNextSearchPost,
  } = useSearch(currentQuery, 10, sort, option);

  const Feeds = ({ isRowLoaded, rowIndex, columnIndex, style, key }) => {
    return !isRowLoaded(rowIndex * 2 + columnIndex) ? (
      <Style.FeedWrapper style={style} key={key}>
        <FeedSkeleton />
      </Style.FeedWrapper>
    ) : (
      <Style.FeedWrapper style={style} key={key}>
        <Feed
          feedData={
            searchPostResult && searchPostResult[rowIndex * 2 + columnIndex]
          }
          key={searchPostResult[rowIndex * 2 + columnIndex]?.postId}
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
      <SearchHeader focusTab={1} />
      <Style.PostFilter
        setSort={setSort}
        option={option}
        setOption={setOption}
        queryKey="search"
      />
      {searchPostResult && (
        <InfiniteGridWrapper
          hasNextPage={hasNextSearchPost}
          data={searchPostResult}
          isNextPageLoading={isFetchSearchPost}
          loadNextPage={FetchNextSearchPost}
          totalWidth={950}
          rowHeight={520}
          columnWidth={475}
          columnCount={2}
          itemComponent={Feeds}
          isUseWindowScroll={true}
        />
      )}
    </>
  );
};

export default SearchPost;
