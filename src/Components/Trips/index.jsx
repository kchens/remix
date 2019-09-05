import React, {PureComponent} from 'react'

class Trips extends PureComponent {
    constructor(props) {
        super(props)
        this.onDragStart = this.onDragStart.bind(this)
    }

    onDragStart = (event, trip) => {
        console.log('dragstart on div: ', trip)
        
        event.dataTransfer.setData('selectedTrip', JSON.stringify(trip))
    }

    render() {
        const { trips, selectTrips } = this.props

        return (            
            <div style={{
                display: 'flex',
            }}>
                {trips.map((trip, i) => {
                    const {id, startTime, endTime, selected} = trip
                    return (<div
                        key={i}
                        draggable
                        onDragStart={(event) => this.onDragStart(event, trip)}
                        style={{
                            marginLeft: `${startTime}px`,
                            width: `${endTime - startTime}px`,
                            backgroundColor: selected ? 'gray' : '',
                            border: '1px solid black'
                        }}
                        onClick={selectTrips}
                    >
                        {id}
                    </div>)
                })}
            </div>
        )

    }
} 
export default Trips