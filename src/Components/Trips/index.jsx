import React, {Component} from 'react'

class Trips extends Component {
    onDragStart = (event, trip) => {
        event.dataTransfer.setData('selectedTrip', JSON.stringify(trip))
    }

    render() {
        const { trips, selectTrip } = this.props
        let previousEndTime = 0
        return (            
            <div style={{
                display: 'flex',
            }}>
                {trips.map((trip, i) => {
                    const {id, startTime, endTime, selected} = trip
                    const tripDisplay = (<div
                        key={i}
                        draggable
                        onDragStart={(event) => {
                            selectTrip(trip, i)
                            this.onDragStart(event, trip)
                        }}
                        style={{
                            marginLeft: `${startTime - previousEndTime}px`,
                            width: `${endTime - startTime}px`,
                            backgroundColor: selected ? 'gray' : '',
                            border: '1px solid black'
                        }}
                    >
                        {id}
                    </div>)

                    previousEndTime = endTime
                    return tripDisplay
                })}
            </div>
        )

    }
} 
export default Trips