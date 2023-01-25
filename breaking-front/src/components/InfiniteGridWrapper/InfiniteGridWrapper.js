import React from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
// 자동으로 width나 height을 가져옴
import { Grid, InfiniteLoader, WindowScroller } from 'react-virtualized';
// InfiniteLoader: 무한스크롤, WindowScroller: 브라우저의 window 스크롤바를 사용하려면 사용,

const InfiniteGridWrapper = ({
  data,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  totalHeight,
  totalWidth,
  rowHeight,
  columnWidth,
  columnCount,
  itemComponent,
  isUseWindowScroll = false,
}) => {
  const rowCount = hasNextPage ? data.length / 2 + 1 : data.length / 2 - 1;
  // 다음페이지가 있다면 로딩창(스켈레톤 UI)을 생성해야함 (+2개 생성)
  // react-query는 마지막 데이터를 가져왔는데 값이 없으면 hasNextPage가 false가 되므로 0이 되므로 한번 더 가져온 꼴이 되니 -2로 조정해 주어야함
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;
  // 데이터를 불러오는 도중에는 Fetch가 실행되지 않도록 막음

  const isRowLoaded = (index) => !hasNextPage || index < data.length;
  // 해당 index가 받아온 데이터의 범위안에 들어가는 확인
  // 받아온 데이터보다 크면 false를 return

  return (
    <InfiniteLoader
      rowCount={rowCount}
      loadMoreRows={loadMoreRows}
      isRowLoaded={isRowLoaded}
      threshold={1}
    >
      {({ onRowsRendered }) => {
        const onSectionRendered = ({
          rowStartIndex,
          rowStopIndex,
          columnStopIndex,
        }) => {
          const startIndex = rowStartIndex * columnStopIndex;
          // 2차원을 grid를 1차원으로 변환
          const stopIndex = rowStopIndex * columnStopIndex;

          if (stopIndex >= data.length / 2 - 2)
            // 브라우저가 보여지는 곳이 바닥보다 1칸 위라면 다음데이터를 불러옴
            onRowsRendered({
              startIndex,
              stopIndex,
            });
        };
        return isUseWindowScroll ? (
          // 브라우저의 window 스크롤을 사용하려면 WindowScroller wrapper가 있어야하고 사용하지 않으려면 wrapper가 필요없음
          <AutoSizer className="autoSizer">
            {({ height: rowDefaultHeight, width }) => (
              <WindowScroller class="windowScroller">
                {({ height, scrollTop }) => {
                  return (
                    <Grid
                      autoHeight={isUseWindowScroll}
                      width={totalWidth ?? width}
                      height={totalHeight ?? height}
                      columnWidth={columnWidth}
                      rowHeight={rowHeight ?? rowDefaultHeight}
                      rowCount={rowCount}
                      columnCount={columnCount}
                      scrollTop={scrollTop}
                      onSectionRendered={onSectionRendered}
                      cellRenderer={({ rowIndex, columnIndex, style, key }) =>
                        itemComponent({
                          isRowLoaded,
                          rowIndex,
                          columnIndex,
                          style,
                          key,
                        })
                      }
                    />
                  );
                }}
              </WindowScroller>
            )}
          </AutoSizer>
        ) : (
          <Grid
            width={totalWidth}
            height={totalHeight}
            columnWidth={columnWidth}
            rowHeight={rowHeight}
            rowCount={rowCount}
            columnCount={columnCount}
            onSectionRendered={onSectionRendered}
            cellRenderer={({ rowIndex, columnIndex, style, key }) =>
              itemComponent({
                isRowLoaded,
                rowIndex,
                columnIndex,
                style,
                key,
              })
            }
          />
        );
      }}
    </InfiniteLoader>
  );
};

InfiniteGridWrapper.propTypes = {
  hasNextPage: PropTypes.bool,
  data: PropTypes.array,
  isNextPageLoading: PropTypes.bool,
  loadNextPage: PropTypes.func,
  totalHeight: PropTypes.number,
  totalWidth: PropTypes.number,
  rowHeight: PropTypes.number,
  columnWidth: PropTypes.number,
  columnCount: PropTypes.number,
  itemComponent: PropTypes.func,
  isUseWindowScroll: PropTypes.bool,
};

export default InfiniteGridWrapper;
