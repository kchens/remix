import React, { PureComponent } from 'react'

class Bus extends PureComponent {
    addTripToBus = () => {
        const { bus, hasSelectedTrip, selected } = this.props
        if (!hasSelectedTrip) {
            this.props.addBus()
            return
        }

        let selectedTrip = selected.trip
        const newBus = Object.assign({}, bus)

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
        const { children } = this.props 
        return (
            <div
                onClick={this.addTripToBus}
                style={{
                    display: 'flex',
                    margin: '0.5rem',
                    backgroundColor: 'yellow',
                    padding: '0.5rem',
                    borderBottom: '1px solid black',
                    minHeight: '22px'
                }}
            >
                {children}
            </div>
        )
    }
} 

export default Bus