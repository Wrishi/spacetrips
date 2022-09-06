import { useQuery } from '@apollo/client';
import { GET_FLIGHTS_FOR_SPACESTATIONS } from '../../graplql/queries';
import { FLIGHT_TIME_DIFF_RANGE, TODAY } from '../../utilities/constants';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import tzlookup from "tz-lookup"
import { useEffect, useState } from 'react';

const Flights = (props) => {
    const { loading, error, data } = useQuery(GET_FLIGHTS_FOR_SPACESTATIONS, {
        variables: {
            from: props.from,
            departureDay: props.date
        },
    })
    
    const [flights, setFlights] = useState()

    useEffect(() => {
        if (!data) return
        setFlights(data.flights.nodes.filter((flight) => {
            /* Time difference calculated based on timezone */
            const launchSiteTZ = tzlookup(props.spaceCenter._geoloc.lat, props.spaceCenter._geoloc.lng),
                flightTime = moment.tz(flight.departureAt, launchSiteTZ),
                currentTZ = moment.tz.guess(),
                currentTime = moment.tz(`${props.date}T${props.time}:00.000Z`, currentTZ)
            const timeDiff = currentTime.diff(flightTime, 'minutes')

            return timeDiff >= - FLIGHT_TIME_DIFF_RANGE && timeDiff <= FLIGHT_TIME_DIFF_RANGE
        }))
    }, [data, props.date, props.time, props.spaceCenter])

    return (
        <>
            {loading && <div>Loading flights...</div>}
            {error && <div>Unknown error occured...</div>}
            {!loading && !error && flights &&
                <p>
                    {flights.length} Departure{flights.length > 1 && 's'} planned
                    &nbsp;{props.date === TODAY ? "today" : <span>on <Moment format="ddd, D MMM YYYY">{props.date}</Moment></span>}
                    &nbsp;at around {props.time}
                </p>}
        </>
    )
}

export default Flights