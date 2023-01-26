import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMainFeedOption from 'pages/MainFeed/hooks/queries/useMainFeedOption';
import { PAGE_PATH } from 'constants/path';
import Feed from 'components/Feed/Feed';
import * as Style from 'pages/MainFeed/MainFeed.styles';
import { ReactComponent as PenIcon } from 'assets/svg/pen.svg';
import { FeedSkeleton } from 'components/Skeleton/Skeleton';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import InfiniteGridWrapper from 'components/InfiniteGridWrapper/InfiniteGridWrapper';
import PropTypes from 'prop-types';

const MainFeed = () => {
  const navigate = useNavigate();

  const [sort, setSort] = useState('chronological');
  const [option, setOption] = useState('all');

  const {
    data: mainFeedData,
    isFetching: isMainFeedFetching,
    fetchNextPage: FetchNextMainFeed,
    hasNextPage: isMainFeedHasNextPage,
  } = useMainFeedOption(sort, option);

  const handleUploadClick = () => {
    navigate(PAGE_PATH.POST_WRITE);
  };

  const Feeds = ({ isRowLoaded, rowIndex, columnIndex, style, key }) => {
    return !isRowLoaded(rowIndex * 2 + columnIndex) ? (
      <div style={style} key={key}>
        <FeedSkeleton />
      </div>
    ) : (
      <div style={style} key={key}>
        <Feed
          feedData={mainFeedData && mainFeedData[rowIndex * 2 + columnIndex]}
          key={mainFeedData[rowIndex * 2 + columnIndex]?.postId}
        />
      </div>
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
    <Style.MainFeed>
      <ScrollToTop />
      <Style.NavBar>
        <SearchFilter
          setSort={setSort}
          option={option}
          setOption={setOption}
          queryKey="mainFeedOption"
        />
        <Style.FeedUploadButton onClick={handleUploadClick}>
          <PenIcon />
          작성하기
        </Style.FeedUploadButton>
      </Style.NavBar>
      {mainFeedData && (
        <InfiniteGridWrapper
          hasNextPage={isMainFeedHasNextPage}
          data={mainFeedData}
          isNextPageLoading={isMainFeedFetching}
          loadNextPage={FetchNextMainFeed}
          rowHeight={520}
          columnWidth={440}
          columnCount={2}
          itemComponent={Feeds}
          isUseWindowScroll={true}
        />
      )}
    </Style.MainFeed>
  );
};

export default MainFeed;
