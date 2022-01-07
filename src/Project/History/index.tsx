import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { buttonResets } from 'src/styles';
import { fetchTimeRecords } from 'src/resources/timeRecords';
import { IDateGroup } from 'src/types/timeRecord';
import { FETCH_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import ProjectLoader from '../ProjectLoader';
import DateGroup from './DateGroup';

const fetchAction = (payload: IDateGroup[]) => ({ type: FETCH_TYPE, payload });

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

type LoaderProps = {
  isLoading: boolean;
  isEnd: boolean;
  onClick: () => void;
};

const Loader = ({ isLoading, isEnd, onClick }: LoaderProps) => {
  if (isLoading || isEnd) {
    return null;
  }

  return <LoadMoreButton onClick={onClick}>Load more</LoadMoreButton>;
};

// infinite scroll to control and inform about time records
export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const { dateGroups, dispatchDateGroups } = useContext(DateGroupContext);
  const dateGroupsUI = dateGroups.map(({ date, timeRecords }) => (
    <DateGroup key={date} date={date} timeRecords={timeRecords} />
  ));

  const loadMore = useCallback(
    (page: number) => {
      setIsLoading(true);
      fetchTimeRecords(page).then((response) => {
        if (dispatchDateGroups) {
          dispatchDateGroups(fetchAction(response.data));
        }
        if (!response.data.length) {
          setIsEnd(true);
        }
      });
      setIsLoading(false);
      setHasMore(false);
    },
    [dispatchDateGroups]
  );

  useEffect(() => loadMore(0), [loadMore]);

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
        {isEnd && !dateGroups.length ? (
          <NoHistoryFallback>
            <span>Get ready to track time and boost your productivity!</span>
          </NoHistoryFallback>
        ) : (
          <Loader isLoading={isLoading} isEnd={isEnd} onClick={() => setHasMore(true)} />
        )}
      </InfiniteScroll>
    </HistoryWrapper>
  );
}
