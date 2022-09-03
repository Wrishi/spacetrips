import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { GET_FLIGHTS_FOR_SPACESTATIONS } from '../../graplql/queries';
import { TODAY } from '../../utilities/constants';

const Item = (props) => {
    const itemRef = useRef(null)
    const { loading, error, data } = useQuery(GET_FLIGHTS_FOR_SPACESTATIONS, {
        variables: { 
            from: props.spaceCenter.id, 
            departureDay: TODAY 
        },
    })
    const [flights, setFlights] = useState()

    useEffect(() => {
        if (data) setFlights(data.flights.nodes)
    }, [data])

    useEffect(() => {
        if (props.spaceCenter && props.selectedSpaceCenter && props.selectedSpaceCenter.id === props.spaceCenter.id) {
            // itemRef.current.scrollIntoView({
            //     block: "nearest",
            //     inline: "center",
            //     behavior: "smooth",
            //     alignToTop: false
            // })
            itemRef.current.parentNode.scrollTop = itemRef.current.offsetTop - 20
        }
    }, [props.selectedSpaceCenter, props.spaceCenter])

    return (
        <div className={`item ${props.spaceCenter && props.selectedSpaceCenter && props.selectedSpaceCenter.id === props.spaceCenter.id && "focus"}`} ref={itemRef}>
            <header>
                <div className='title'>
                    <h4 className="center">{props.spaceCenter.name}</h4>
                    <span className="location">{props.spaceCenter.planet.name}</span>
                </div>
                <span className="icon"></span>
            </header>
            <div className='details'>
                {loading && <div>Loading flights...</div>}
                {error && <div>Unknown error occured...</div>}
                {flights && <p>{flights.length} Departure{flights.length > 1 && 's'} planned today</p>}
            </div>
            <footer>
                <button>SEE ALL FLIGHTS</button>
            </footer>
        </div>
    );
}

export default Item;
