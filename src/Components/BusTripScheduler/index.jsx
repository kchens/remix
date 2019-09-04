import React from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trip from '../Trip'

const BusTripScheduler = ({ trips, selectTrip }) => (
    <div
        style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
    >
        BusTripScheduler
        {trips.map((trip, i) => {
            return <Trip key={i} {...trip} selectTrip={() => selectTrip(i)} />
        })}
    </div>
)

export default withBusTripManager(BusTripScheduler)
