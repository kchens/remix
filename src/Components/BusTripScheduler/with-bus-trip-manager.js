import React, { PureComponent } from 'react'
import tripsData from '../../bus-scheduling-input.json'
import { isEqual, remove } from 'lodash'


const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                hasSelectedTrip: false,
                selectedIndices: {
                    busIndex: null,
                    tripIndex: null,
                },
                buses: []
            }
        }

        componentDidMount() {
            let buses = tripsData.map((trip, i) => {
                trip.selected = false
                trip.busId = i
                return { trips: [trip] , ...{ id: i} }
            })
            this.setState({ buses })
        }

        addBus = () => {
            const newBus = {
                id: this.state.buses.length,
                trips: []
            }

            const buses = Object.assign([], this.state.buses) 
            buses.push(newBus)
            this.setState({ buses })
        }

        updateBuses = (newBus, selectedTrip) => {
            const buses = Object.assign([], this.state.buses)

            // remove selectedTrip from oldBuses
            const oldBus = buses[selectedTrip.busId]
            remove(oldBus.trips, selectedTrip)

            // update selectedTrip, add to newBus, sort on startTimes
            selectedTrip.busId = newBus.id
            selectedTrip.selected = false
            this.unselectTrip()
            newBus.trips = [...newBus.trips, selectedTrip]
            newBus.trips.sort((a, b) => a.startTime - b.startTime)

            buses[oldBus.id] = oldBus
            buses[newBus.id] = newBus
            this.setState({ buses })
        }

        selectTrip = (trip, tripIndex) => {
            const { buses, selectedIndices, hasSelectedTrip } = this.state
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
                if (hasSelectedTrip) {
                    const oldTrip = newBuses[selectedIndices.busIndex].trips[selectedIndices.tripIndex]
                    oldTrip.selected = false
                    newBuses[selectedIndices.busIndex].trips[selectedIndices.tripIndex] = oldTrip
                }

                // get new trip, set 'selected' 
                const newTrip = newBuses[newSelectedIndices.busIndex].trips[newSelectedIndices.tripIndex]
                newTrip.selected = true
                newBuses[newSelectedIndices.busIndex].trips[newSelectedIndices.tripIndex] = newTrip
            }
            
            this.setState({ 
                hasSelectedTrip: true,
                selectedIndices: newSelectedIndices, 
                buses: newBuses
            })
        }

        unselectTrip = () => {
            this.setState({ 
                hasSelectedTrip: false,
                selectedIndices: {
                    busIndex: null,
                    tripIndex: null,
                }
            })
        }
        
        render() {
            return (
                <WrappedComponent 
                    {...this.state}
                    selectTrip={this.selectTrip}
                    unselectTrip={this.unselectTrip}
                    updateBuses={this.updateBuses}
                    addBus={this.addBus}
                />
            )
        }
    }

}

export default withBusTripManager