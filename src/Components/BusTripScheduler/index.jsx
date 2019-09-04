import React, { PureComponent } from 'react'
import withBusTripManager from './with-bus-trip-manager'

const BusTripScheduler = ({trips}) => (
    <div
        style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
    >
        BusTripScheduler
        {trips.map((trip, i) => {
            const left = `${trip.startTime}px`
            const right = `${trip.endTime}px`
            console.log(left)
            console.log(right)
            return (
                <div
                    key={i}
                    style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black' }}
                >
                    <div
                        style={{ marginLeft: left, width: right, backgroundColor: 'orange', padding: '0.5rem', border: '1px solid black' }}
                    >
                        {trip.id}
                    </div>
                </div>
            )
        })}
    </div>
)

export default withBusTripManager(BusTripScheduler)
