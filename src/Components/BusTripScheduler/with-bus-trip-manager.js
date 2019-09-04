import React, { PureComponent } from 'react'
import tripsData from '../../bus-scheduling-input.json'

const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                lastSelectedIndex: 0,
                trips: []
            }

            this.selectTrip = this.selectTrip.bind(this)
        }
        componentDidMount() {
            let trips = tripsData.map((trip) => {
                trip.selected = false    
                return trip
            })
            
            this.setState({ trips })
        }

        selectTrip(newTripIndex) {
            const { trips, lastSelectedIndex } = this.state
            const newTrips = Object.assign([], trips)

            // toggle 'selected' on same trip
            if (lastSelectedIndex === newTripIndex) {
                const lastTrip = newTrips[lastSelectedIndex]
                lastTrip.selected = lastTrip.selected ? false : true
                newTrips[lastSelectedIndex] = lastTrip
                this.setState({ lastSelectedIndex: newTripIndex, trips: newTrips })
                return 
            } 
            

            // // get old trip, reset 'selected'
            const lastTrip = newTrips[lastSelectedIndex]
            lastTrip.selected = false
            newTrips[lastSelectedIndex] = lastTrip
            // get new trip, set 'selected' 
            const trip = newTrips[newTripIndex]
            trip.selected = true
            newTrips[newTripIndex] = trip

            this.setState({ lastSelectedIndex: newTripIndex, trips: newTrips })
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.state}
                    selectTrip={this.selectTrip}
                />
            )
        }
    }

}

export default withBusTripManager