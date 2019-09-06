import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'
import {remove} from 'lodash'

class BusTripScheduler extends PureComponent {
    onClick = (event, busId) => {
        const { buses, selectedIndices } = this.props
        if (selectedIndices.busIndex === null) {
            this.props.addBus()
            return
        }
        console.log(event.target)
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
        
        // TODO: Move to with-bus-trip-manager
        // remove selectedTrip from oldBuses
        const oldBus = buses[selectedTrip.busId]
        remove(oldBus.trips, selectedTrip)
        
        // update selectedTrip, add to newBus, sort on startTimes
        selectedTrip.busId = newBus.id
        selectedTrip.selected = false
        this.props.unselectTrip()
        newBus.trips = [ ...newBus.trips, selectedTrip]
        newBus.trips.sort((a, b) => a.startTime - b.startTime)

        this.props.updateBuses(oldBus, newBus)
    }

    render() {
        const { buses, selectTrip, selectedIndices } = this.props
        return (
            <div
                style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
            >
                BusTripScheduler
                {buses.map((bus, i) => {
                    if (selectedIndices.busIndex !== null && (buses.length - 1) === i) {
                        return <div
                            key={i}
                            onClick={(event) => this.onClick(event, bus.id)}
                            style={{ display: 'flex', margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black', minHeight: '22px' }}
                        >
                        </div>
                    }
                    if (bus.trips.length === 0) return null
                    
                    return <div
                        key={i}
                        onClick={(event) => this.onClick(event, bus.id)}
                        style={{ display: 'flex', margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black', minHeight: '22px' }}
                    >
                        <Trips trips={bus.trips} selectTrip={selectTrip} />
                    </div>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
