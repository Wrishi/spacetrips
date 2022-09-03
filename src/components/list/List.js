import React from 'react';
import Item from './Item';
import Wrapper from './list.style';

const List = (props) => {

  return (
    <Wrapper>
      <div className="list">
        {
          props.spaceCenters && props.spaceCenters.length > 0 && props.spaceCenters.map((spaceCenter, index) => {
            return <Item spaceCenter={spaceCenter} selectedSpaceCenter={props.selectedSpaceCenter} key={index} />
          })
        }
      </div>
    </Wrapper>
  );
}

export default List;
