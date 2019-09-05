import React, { PureComponent } from 'react'
import tripsData from '../../bus-scheduling-input.json'

const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                lastSelectedIndex: 0,
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
            console.log(buses)
            this.setState({ buses })
        }

        updateBuses(buses) {
            this.setState({ buses })
        }

        selectTrip(newTripIndex) {
        //     const { trips, lastSelectedIndex } = this.state
        //     const newTrips = Object.assign([], trips)
        //     const lastTrip = newTrips[lastSelectedIndex]

        //     // toggle 'selected' on same trip
        //     if (lastSelectedIndex === newTripIndex) {
        //         lastTrip.selected = lastTrip.selected ? false : true
        //         newTrips[lastSelectedIndex] = lastTrip
        //         this.setState({ lastSelectedIndex: newTripIndex, trips: newTrips })
        //         return 
        //     } 
            

        //     // // get old trip, reset 'selected'
        //     lastTrip.selected = false
        //     newTrips[lastSelectedIndex] = lastTrip
        //     // get new trip, set 'selected' 
        //     const trip = newTrips[newTripIndex]
        //     trip.selected = true
        //     newTrips[newTripIndex] = trip

        //     this.setState({ lastSelectedIndex: newTripIndex, trips: newTrips })
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