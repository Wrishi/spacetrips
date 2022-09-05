import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { GET_FLIGHTS_FOR_SPACESTATIONS } from '../../graplql/queries';
import { FLIGHT_TIME_DIFF_RANGE, TODAY } from '../../utilities/constants';
import Moment from 'react-moment';
import moment from 'moment';
import tzlookup from "tz-lookup"

const Item = (props) => {
    const itemRef = useRef(null)
    const { loading, error, data } = useQuery(GET_FLIGHTS_FOR_SPACESTATIONS, {
        variables: {
            from: props.spaceCenter.id,
            departureDay: props.date
        },
    })
    const [flights, setFlights] = useState()

    useEffect(() => {
        if (!data) return
        setFlights(data.flights.nodes.filter((flight) => {
            /* Time difference calculated based on timezone */
            const launchSiteTZ = tzlookup(props.spaceCenter.latitude, props.spaceCenter.longitude),
                flightTime = moment.tz(flight.departureAt, launchSiteTZ),
                tz = moment.tz.guess(),
                currentTime = moment.tz(`${props.date}T${props.time}:00.000Z`, tz)
            // console.log(launchSiteTZ)
            // console.log(flightTime)
            // console.log(tz)
            // console.log(currentTime)
            const timeDiff = currentTime.diff(flightTime, 'minutes')

            // console.log(timeDiff);
            return timeDiff >= - FLIGHT_TIME_DIFF_RANGE && timeDiff <= FLIGHT_TIME_DIFF_RANGE
        }))
    }, [data, props.date, props.time, props.spaceCenter])

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
        <div className={`item ${props.spaceCenter && props.selectedSpaceCenter && props.selectedSpaceCenter.id === props.spaceCenter.id && "focus"}`}
            ref={itemRef}
            onMouseOver={() => props.hoverSpaceCenter(props.spaceCenter)}
            onMouseOut={() => props.hoverSpaceCenter(null)}
        >
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
                {!loading && !error && flights &&
                    <p>
                        {flights.length} Departure{flights.length > 1 && 's'} planned
                        &nbsp;{props.date === TODAY ? "today" : <span>on <Moment format="ddd, D MMM YYYY">{props.date}</Moment></span>}
                        &nbsp;at around {props.time}
                    </p>}
            </div>
            <footer>
                <button>SEE ALL FLIGHTS</button>
            </footer>
        </div>
    );
}

export default Item;
