import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import Item from './Item';
import Wrapper from './list.style';

const List = connectHits(({
  /* variables */
  hits,
  selectedSpaceCenter,
  date,
  time,
  /* functions */
  hoverSpaceCenter
}) => {

  return (
    <Wrapper>
      <div className="list" id="list">
        {
          hits && hits.length > 0
            ? hits.map((spaceCenter) => {
              return <Item spaceCenter={spaceCenter}
                selectedSpaceCenter={selectedSpaceCenter}
                date={date}
                time={time}
                key={spaceCenter.uid}
                hoverSpaceCenter={hoverSpaceCenter}
              />
            })
            : <div>No space centers were found in viewport...</div>
        }
      </div>
    </Wrapper>
  );
})

export default List;
