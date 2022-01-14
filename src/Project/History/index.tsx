import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { buttonResets } from 'src/styles';
import { fetchTimeRecords } from 'src/resources/timeRecords';
import useDateGroups, { useDateGroupsSelector } from 'src/hooks/useDateGroups';
import { dateGroupActions } from 'src/Contexts/DateGroupsContext';
import ProjectLoader from '../ProjectLoader';
import DateGroup from './DateGroup';

const HistoryWrapper = styled.div`
  margin: 60px 0 360px;
`;

const NoHistoryFallback = styled.div`
  text-align: center;
  color: #666;
`;

const LoadMoreButton = styled.button`
  ${buttonResets}
  display: block;
  margin: 40px auto 0;
  padding: 7px 18px;
  border-radius: 6px;
  border: 1.8px solid #888;
  background-color: #fff;
`;

// infinite scroll to control and inform about time records
export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const { dispatchDateGroups } = useDateGroups();
  const dateGroups = useDateGroupsSelector(({ list }) => list);

  const loadMore = useCallback(
    async (page: number) => {
      setIsLoading(true);
      const { data } = await fetchTimeRecords(page);
      dispatchDateGroups(dateGroupActions.fetch(data));

      if (data.length) {
        setIsEnd(true);
      }

      setIsLoading(false);
      setHasMore(false);
    },
    [dispatchDateGroups]
  );

  useEffect(() => {
    loadMore(0);
  }, [loadMore]);

  const requestMore = () => setHasMore(true);

  let footerView = null;
  const hasFooter = isEnd && !dateGroups.length;
  const canLoadMore = isLoading || isEnd;

  const dateGroupsUI = dateGroups.map(({ date, timeRecords }) => (
    <DateGroup key={date} date={date} timeRecords={timeRecords} />
  ));

  if (hasFooter) {
    footerView = (
      <NoHistoryFallback>
        <span>Get ready to track time and boost your productivity!</span>
      </NoHistoryFallback>
    );
  } else if (canLoadMore) {
    footerView = <LoadMoreButton onClick={requestMore}>Load more</LoadMoreButton>;
  }

  return (
    <HistoryWrapper>
      <InfiniteScroll
        pageStart={1}
        useWindow={false}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<ProjectLoader key={0} />}
      >
        {dateGroupsUI}
        {footerView}
      </InfiniteScroll>
    </HistoryWrapper>
  );
}
