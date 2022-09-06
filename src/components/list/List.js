import React from 'react';
import { connectHits } from 'react-instantsearch-dom';
import Item from './Item';
import Wrapper from './list.style';

const List = connectHits((props) => {

  return (
    <Wrapper>
      <div className="list" id="list-1">
        {
          props.hits && props.hits.length > 0
            ? props.hits.map((spaceCenter, index) => {
              return <Item spaceCenter={spaceCenter}
                selectedSpaceCenter={props.selectedSpaceCenter}
                date={props.date}
                time={props.time}
                key={index}
                hoverSpaceCenter={props.hoverSpaceCenter}
                />
            })
            : <div>No space centers were found in viewport...</div>
        }
      </div>
    </Wrapper>
  );
})

export default List;
