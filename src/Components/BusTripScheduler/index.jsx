import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'
import Bus from '../Bus'

class BusTripScheduler extends PureComponent {
    render() {
        const { addBus, updateBuses, buses, selectTrip, hasSelectedTrip, selectedIndices, selected } = this.props
        const isLastBus = (i) => buses.length - 1 === i
        const isTripsEmpty = (bus) => bus.trips.length === 0
        return (
            <div style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}>
                BusTripScheduler
                {buses.map((bus, i) => {
                    if (hasSelectedTrip && isLastBus(i)) {
                        return <Bus key={i} bus={bus} selected={selected}  updateBuses={updateBuses} addBus={addBus} selectTrip={selectTrip} hasSelectedTrip={hasSelectedTrip} />
                    }

                    if (isTripsEmpty(bus)) return null
                    
                    return <Bus key={i} bus={bus} selected={selected} updateBuses={updateBuses} addBus={addBus} selectTrip={selectTrip} hasSelectedTrip={hasSelectedTrip} >
                        <Trips trips={bus.trips} selectTrip={selectTrip} />
                    </Bus>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
