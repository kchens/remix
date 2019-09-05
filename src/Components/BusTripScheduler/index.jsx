import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'
import {remove} from 'lodash'

class BusTripScheduler extends PureComponent {
    constructor(props) {
        super(props)
        this.onDrop = this.onDrop.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, busId) => {
        const { buses } = this.props
        let selectedTrip = JSON.parse(event.dataTransfer.getData('selectedTrip'))
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
        
        // remove selectedTrip from oldBuses
        const oldBus = buses[selectedTrip.busId]
        remove(oldBus.trips, selectedTrip)
        
        // update selectedTrip, add to newBus, sort on startTimes
        selectedTrip.busId = newBus.id
        newBus.trips = [ ...newBus.trips, selectedTrip]
        newBus.trips.sort((a, b) => a.startTime - b.startTime)

        this.props.updateBuses(oldBus, newBus)
    }

    render() {
        const { buses, selectTrip } = this.props
        return (
            <div
                style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
            >
                BusTripScheduler
                {buses.map((bus, i) => {
                    if (bus.trips.length === 0) return null
                    return <div
                        key={i}
                        onDragOver={(event) => this.onDragOver(event)}
                        onDrop={(event) => { this.onDrop(event, bus.id) }}
                        style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black', minHeight: '22px' }}
                    >
                        <Trips trips={bus.trips} selectTrip={() => selectTrip(i)} />
                    </div>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
