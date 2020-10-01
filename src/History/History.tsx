import React, { useState, useContext } from 'react';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from '../Contexts/UserContext';
import { fetchTimeRecord } from '../resources/timeRecords';
import HistoryItem from './HistoryItem';

interface ITimeRecord {
  startTime: string;
  endTime: string;
  label: string;
  category: string;
  id: number;
}

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
  const [timeRecords, setTimeRecords] = useState<ITimeRecord[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useContext(UserContext);
  const records = timeRecords.map(recordsMapper);

  const loadMore = (page: number) => {
    if (user && user.id) {
      fetchTimeRecord(page).then((response) => {
        if (response) {
          setTimeRecords((prevState: ITimeRecord[]) => [...prevState, ...response.data]);
          if (!response.data.length) {
            setHasMore(false);
          }
        }
      });
    }
  };

  return (
    <InfiniteScroll isReverse loadMore={loadMore} hasMore={hasMore} loader={loader}>
      {records}
    </InfiniteScroll>
  );
}
