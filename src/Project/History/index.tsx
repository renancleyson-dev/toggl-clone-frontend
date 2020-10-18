import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from '../../Contexts/UserContext';
import { fetchTimeRecords } from '../../resources/timeRecords';
import HistoryItem from './HistoryItem';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

interface IGroupedTimeRecords {
  date: string;
  timeRecords: ITimeRecord[];
}

const dateGroupsReducer = (
  groups: IGroupedTimeRecords[],
  actualGroupedTimeRecords: IGroupedTimeRecords
) => {
  const { date } = actualGroupedTimeRecords;
  const dateIndex = groups.findIndex(
    (groupedTimeRecords) => date === groupedTimeRecords.date
  );

  if (dateIndex === -1) {
    return [...groups, actualGroupedTimeRecords];
  }

  const newGroupedTimeRecords = groups[dateIndex].timeRecords.concat(
    actualGroupedTimeRecords.timeRecords
  );
  groups[dateIndex].timeRecords = newGroupedTimeRecords;
  return groups;
};

const HistoryWrapper = styled.div`
  margin-top: 60px;
`;

const DayHistory = styled.div``;

const recordsMapper = ({ startTime, endTime, label, category, id }: ITimeRecord) => (
  <HistoryItem
    key={id}
    startTime={moment(startTime)}
    endTime={moment(endTime)}
    recordLabel={label}
    recordCategory={category}
    id={id}
  />
);

const loader = (
  <div className="loader" key={0}>
    Loading ...
  </div>
);

// infinite scroll to control and inform about time records
export default function History() {
  const [groupedTimeRecords, setGroupedTimeRecords] = useState<IGroupedTimeRecords[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);
  const groups = groupedTimeRecords.map(({ date, timeRecords }) => (
    <DayHistory>{timeRecords.map(recordsMapper)}</DayHistory>
  ));

  const loadMore = (page: number) => {
    if (user && user.id) {
      fetchTimeRecords(page).then((response) => {
        if (response) {
          setGroupedTimeRecords((prevState: IGroupedTimeRecords[]) =>
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
    <InfiniteScroll isReverse loadMore={loadMore} hasMore={hasMore} loader={loader}>
      <HistoryWrapper>{groups}</HistoryWrapper>
    </InfiniteScroll>
  );
}
