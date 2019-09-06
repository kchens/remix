import React, { PureComponent } from 'react'
import tripsData from '../../bus-scheduling-input.json'
import { isEqual, remove } from 'lodash'


const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                isAddTripError: false,
                selected: {
                    trip: null
                },
                hasSelectedTrip: false,
                buses: []
            }
        }

        componentDidMount() {
            // prepare data
            let buses = tripsData.map((trip, i) => {
                trip.selected = false
                trip.busId = i
                return { trips: [trip] , ...{ id: i} }
            })
            this.setState({ buses })
        }

        updateTripToBusError = (isAddTripError) => {
            this.setState({ isAddTripError })
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

        addTripToBus = (newBus, selectedTrip) => {
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
            this.updateTripToBusError(false)

            const { selected, buses, hasSelectedTrip } = this.state
            const newBuses = Object.assign([], buses)
            const oldTrip = selected.trip
            let newSelectedState
            
            // toggle 'selected' on same trip
            if (isEqual(oldTrip, trip)) {
                newSelectedState = trip.selected ? false : true
                trip.selected = newSelectedState
                newBuses[trip.busId].trips[tripIndex] = trip
            } else {
                // get old trip, reset 'selected'
                if (hasSelectedTrip) {
                    oldTrip.selected = false
                    newBuses[trip.busId].trips[tripIndex] = oldTrip
                }

                // get new trip, set 'selected' 
                newSelectedState = true
                trip.selected = newSelectedState
                newBuses[trip.busId].trips[tripIndex] = trip
            }
            
            this.setState({ 
                selected: { trip },
                hasSelectedTrip: newSelectedState,
                buses: newBuses
            })
        }

        unselectTrip = () => {
            this.setState({ 
                hasSelectedTrip: false,
                selected: {
                    trip: null
                }
            })
        }
        
        render() {
            return (
                <WrappedComponent 
                    {...this.state}
                    selectTrip={this.selectTrip}
                    unselectTrip={this.unselectTrip}
                    addTripToBus={this.addTripToBus}
                    addBus={this.addBus}
                    updateTripToBusError={this.updateTripToBusError}
                />
            )
        }
    }

}

export default withBusTripManager