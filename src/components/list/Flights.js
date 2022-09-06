import { useQuery } from '@apollo/client';
import { GET_FLIGHTS_FOR_SPACESTATIONS } from '../../graplql/queries';
import { FLIGHT_TIME_DIFF_RANGE, TODAY } from '../../utilities/constants';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import tzlookup from "tz-lookup"
import { useEffect, useState } from 'react';

const Flights = ({
    /* variables */
    date,
    time,
    from,
    spaceCenter
    /* functions */
}) => {
    const { loading, error, data } = useQuery(GET_FLIGHTS_FOR_SPACESTATIONS, {
        variables: {
            from: from,
            departureDay: date
        },
    })
    
    const [flights, setFlights] = useState()

    useEffect(() => {
        if (!data) return
        /* Flights filtered based on flight time */
        setFlights(data.flights.nodes.filter((flight) => {
            /* Time difference calculated based on timezone */
            const launchSiteTZ = tzlookup(spaceCenter._geoloc.lat, spaceCenter._geoloc.lng),
                flightTime = moment.tz(flight.departureAt, launchSiteTZ),
                currentTZ = moment.tz.guess(),
                currentTime = moment.tz(`${date}T${time}:00.000Z`, currentTZ)
            const timeDiff = currentTime.diff(flightTime, 'minutes')

            return timeDiff >= - FLIGHT_TIME_DIFF_RANGE && timeDiff <= FLIGHT_TIME_DIFF_RANGE
        }))
    }, [data, date, time, spaceCenter])

    return (
        <>
            {loading && <div>Loading flights...</div>}
            {error && <div>Unknown error occured...</div>}
            {!loading && !error && flights &&
                <p>
                    {flights.length} Departure{flights.length > 1 && 's'} planned
                    &nbsp;{date === TODAY ? "today" : <span>on <Moment format="ddd, D MMM YYYY">{date}</Moment></span>}
                    &nbsp;at around {time}
                </p>}
        </>
    )
}

export default Flights