import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from 'src/Contexts/UserContext';
import { fetchTimeRecords } from 'src/resources/timeRecords';
import { IDateGroup } from 'src/types/timeRecord';
import DateGroup from './DateGroup';

const dateGroupsReducer = (groups: IDateGroup[], actualDateGroup: IDateGroup) => {
  const { date, timeRecords } = actualDateGroup;
  const dateIndex = groups.findIndex((dateGroups) => date === dateGroups.date);

  if (dateIndex === -1) {
    return [...groups, actualDateGroup];
  }

  const newTimeRecords = groups[dateIndex].timeRecords.concat(timeRecords);
  groups[dateIndex] = { date, timeRecords: newTimeRecords };

  return [...groups];
};

const HistoryWrapper = styled.div`
  margin-top: 60px;
  height: 100%;
`;

const loader = (
  <div className="loader" key={0}>
    Loading ...
  </div>
);

// infinite scroll to control and inform about time records
export default function History() {
  const [dateGroups, setDateGroups] = useState<IDateGroup[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);
  const dateGroupsUI = dateGroups.map(({ date, timeRecords }) => (
    <DateGroup key={date} date={date} timeRecords={timeRecords} />
  ));

  const loadMore = (page: number) => {
    if (user && user.id) {
      fetchTimeRecords(page).then((response) => {
        if (response) {
          setDateGroups((prevState: IDateGroup[]) =>
            response.data.reduce(dateGroupsReducer, prevState)
          );
          if (!response.data.length) {
            setHasMore(false);
          }
        }
      });
    }
  };

  return (
    <HistoryWrapper>
      <InfiniteScroll isReverse loadMore={loadMore} hasMore={hasMore} loader={loader}>
        {dateGroupsUI}
      </InfiniteScroll>
    </HistoryWrapper>
  );
}
