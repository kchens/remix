import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'

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
        console.log('onDrop on div: ', busId);
        let selectedTrip = JSON.parse(event.dataTransfer.getData('selectedTrip'))
        const oldBus = buses[selectedTrip.busId]
        const newBus = buses[busId]
        
        // check if trip can be added
        for (let i = 0; i < newBus.trips.length; i++) {
            if (newBus.trips[i].endTime > selectedTrip.startTime) {
                return
            }
        }
        debugger
        
        // update oldBuses
        // oldBus.trips = Object.assign([])
        
        // selectedTrip.busId = newBus.id
        // newBus.trips.push(selectedTrip)
        
        // const newBuses = Object.assign([], this.props.buses)
        // newBuses[selectedTrip.busId] = oldBus
        // newBuses[busId] = newBus

        // this.props.updateBuses(newBuses)
    }

    render() {
        const { buses, selectTrip } = this.props
        return (
            <div
                style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
            >
                BusTripScheduler
                {buses.map((bus, i) => {
                    return <div
                        key={i}
                        onDragOver={(event) => this.onDragOver(event)}
                        onDrop={(event) => { this.onDrop(event, bus.id) }}
                        style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black' }}
                    >
                        <Trips trips={bus.trips} selectTrip={() => selectTrip(i)} />
                    </div>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
