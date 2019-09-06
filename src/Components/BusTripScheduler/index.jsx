import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'
import Bus from '../Bus'

class BusTripScheduler extends PureComponent {
    addTripToBus = (busId) => {
        const { buses, selectedIndices, hasSelectedTrip } = this.props
        if (!hasSelectedTrip) {
            this.props.addBus()
            return
        }

        let selectedTrip = buses[selectedIndices.busIndex].trips[selectedIndices.tripIndex]
        const newBus = buses[busId]
        
        // check if trip can be added
        let currentTrip 
        for (let i = 0; i < newBus.trips.length; i++) {
            currentTrip = newBus.trips[i]
            if ((selectedTrip.startTime < currentTrip.endTime && selectedTrip.endTime > currentTrip.endTime) // trip start can't be before currentTrip ends
                || (selectedTrip.startTime > currentTrip.startTime && selectedTrip.endTime < currentTrip.endTime) // trip can't be within currentTrip
                || (selectedTrip.endTime > currentTrip.startTime && selectedTrip.endTime < currentTrip.endTime) // trip end can't be after currentTrip starts
            ) {
                console.log("Can't add trip to this busline b/c timing doesn't work.")
                return
            }
        }

        this.props.updateBuses(newBus, selectedTrip)
    }

    render() {
        const { buses, selectTrip, hasSelectedTrip } = this.props
        return (
            <div style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}>
                BusTripScheduler
                {buses.map((bus, i) => {
                    if (hasSelectedTrip && (buses.length - 1) === i) {
                        return <Bus key={i} addTripToBus={() => this.addTripToBus(bus.id)} />
                    }

                    if (bus.trips.length === 0) return null
                    
                    return <Bus key={i} addTripToBus={() => this.addTripToBus(bus.id)}>
                        <Trips trips={bus.trips} selectTrip={selectTrip} />
                    </Bus>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
