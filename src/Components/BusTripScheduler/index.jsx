import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trip from '../Trip'

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
        console.log('onDrop on div: ', busId);
        event.dataTransfer.setData("busId", busId);
    }

    render() {
        const { trips, selectTrip } = this.props
        return (
            <div
                style={{ marginTop: '1rem', backgroundColor: 'gray', padding: '1rem' }}
            >
                BusTripScheduler
            {trips.map((trip, i) => {
                    return <div
                        key={i}
                        onDragOver={(event) => this.onDragOver(event)}
                        onDrop={(event) => { this.onDrop(event, i) }}
                        style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black' }}
                    >
                        <Trip {...trip} selectTrip={() => selectTrip(i)} />
                    </div>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
