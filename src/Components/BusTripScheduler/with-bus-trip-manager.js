import React, { PureComponent } from 'react'
import tripsData from '../../bus-scheduling-input.json'
import { isEqual } from 'lodash'

const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                selectedIndices: {
                    busIndex: 0,
                    tripIndex: 0,
                },
                buses: []
            }

            this.selectTrip = this.selectTrip.bind(this)
            this.updateBuses = this.updateBuses.bind(this)
        }
        componentDidMount() {
            let buses = tripsData.map((trip, i) => {
                trip.selected = false
                trip.busId = i
                return { trips: [trip] , ...{ id: i} }
            })
            this.setState({ buses })
        }

        updateBuses(oldBus, newBus) {
            const buses = Object.assign([], this.state.buses)
            buses[oldBus.id] = oldBus
            buses[newBus.id] = newBus
            this.setState({ buses })
        }

        selectTrip(trip, tripIndex) {
            const { buses, selectedIndices } = this.state
            const newBuses = Object.assign([], buses)
            const newSelectedIndices = {
                busIndex: trip.busId,
                tripIndex
            }

            // toggle 'selected' on same trip
            if (isEqual(selectedIndices, newSelectedIndices)) {
                trip.selected = trip.selected ? false : true
                newBuses[selectedIndices.busIndex].trips[selectedIndices.tripIndex] = trip
            } else {
                // get old trip, reset 'selected'
                const oldTrip = newBuses[selectedIndices.busIndex].trips[selectedIndices.tripIndex]
                oldTrip.selected = false
                newBuses[selectedIndices.busIndex].trips[selectedIndices.tripIndex] = oldTrip

                // get new trip, set 'selected' 
                const newTrip = newBuses[newSelectedIndices.busIndex].trips[newSelectedIndices.tripIndex]
                newTrip.selected = true
                newBuses[newSelectedIndices.busIndex].trips[newSelectedIndices.tripIndex] = newTrip
            }
            
            this.setState({ selectedIndices: newSelectedIndices, buses: newBuses })
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.state}
                    selectTrip={this.selectTrip}
                    updateBuses={this.updateBuses}
                />
            )
        }
    }

}

export default withBusTripManager