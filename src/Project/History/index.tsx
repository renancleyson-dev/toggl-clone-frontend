import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from 'src/Contexts/UserContext';
import { fetchTimeRecords } from 'src/resources/timeRecords';
import { IDateGroup } from 'src/types/timeRecord';
import { FETCH_TYPE } from 'src/reducers/dateGroupsReducer/types';
import { DateGroupContext } from 'src/Contexts/DateGroupsContext';
import DateGroup from './DateGroup';

const fetchAction = (payload: IDateGroup[]) => ({ type: FETCH_TYPE, payload });

const HistoryWrapper = styled.div`
  margin-top: 60px;
  height: 100%;
`;

const Loader = () => (
  <div className="loader" key={0}>
    Loading ...
  </div>
);

// infinite scroll to control and inform about time records
export default function History() {
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);
  const { dateGroups, dispatchDateGroups } = useContext(DateGroupContext);
  const dateGroupsUI = dateGroups.map(({ date, timeRecords }) => (
    <DateGroup key={date} date={date} timeRecords={timeRecords} />
  ));

  const loadMore = (page: number) => {
    if (user && user.id) {
      fetchTimeRecords(page).then((response) => {
        if (dispatchDateGroups) {
          dispatchDateGroups(fetchAction(response.data));
        }
        if (!response.data.length) {
          setHasMore(false);
        }
      });
    }
  };

  return (
    <InfiniteScroll
      useWindow={false}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <HistoryWrapper>{dateGroupsUI}</HistoryWrapper>
    </InfiniteScroll>
  );
}
