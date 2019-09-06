import React, { PureComponent } from 'react'

class Bus extends PureComponent {
    addTripToBus = () => {
        const { bus, hasSelectedTrip, selected, addTripToBus, updateTripToBusError } = this.props
        if (!hasSelectedTrip) return

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
                updateTripToBusError(true)
                return
            }
        }

        addTripToBus(newBus, selectedTrip)
    }

    render() {
        const { bus, children } = this.props 
        const isEven = () => bus.id % 2 === 0
        return (
            <div
                onClick={this.addTripToBus}
                style={{
                    display: 'flex',
                    margin: '0.5rem',
                    backgroundColor: isEven() ? 'gray' : 'white',
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