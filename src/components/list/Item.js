import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { GET_SPACESTATION } from '../../graplql/queries';
import Flights from './Flights';

const Item = ({
    /* variables */
    spaceCenter,
    selectedSpaceCenter,
    date,
    time,
    /* functions */
    hoverSpaceCenter
}) => {
    const itemRef = useRef(null)
    const [spaceCenterId, setSpaceCenterId] = useState()
    const [planetName, setPlanetName] = useState()
    const { loading, error, data } = useQuery(GET_SPACESTATION, {
        variables: {
            uid: spaceCenter.uid
        },
    })

    useEffect(() => {
        if (!data) return
        setSpaceCenterId(data.spaceCenter.id)
        setPlanetName(data.spaceCenter.planet.name)
    }, [data])

    useEffect(() => {
        if (spaceCenter && selectedSpaceCenter && selectedSpaceCenter.uid === spaceCenter.uid) {
            // itemRef.current.scrollIntoView({ block: "nearest", inline: "center",  behavior: "smooth", alignToTop: false // })
            itemRef.current.parentNode.scrollTop = itemRef.current.offsetTop - 20
        }
    }, [selectedSpaceCenter, spaceCenter])

    return (
        <div className={`item ${spaceCenter && selectedSpaceCenter && selectedSpaceCenter.uid === spaceCenter.uid && "focus"}`}
            ref={itemRef}
            onMouseOver={() => hoverSpaceCenter(spaceCenter)}
            onMouseOut={() => hoverSpaceCenter(null)}
        >
            <header>
                <div className='title'>
                    <h4 className="center">{spaceCenter.name}</h4>
                    <span className="location">{planetName || spaceCenter.planet_code}</span>
                    {loading && <div>Loading...</div>}
                    {error && <div>Unknown error occured...</div>}
                </div>
                <span className="icon"></span>
            </header>
            <div className='details'>
                {spaceCenterId && <Flights date={date} time={time} from={spaceCenterId} spaceCenter={spaceCenter} />}
            </div>
            <footer>
                <button >SEE ALL FLIGHTS</button>
            </footer>
        </div>
    );
}

export default Item;
