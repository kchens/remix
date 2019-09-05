import React, {Component} from 'react'

class Trips extends Component {

    render() {
        const { trips, selectTrip } = this.props
        let previousEndTime = 0
        return (            
            <div 
                id='trips'
                style={{
                    display: 'flex',
                }}
            >
                {trips.map((trip, i) => {
                    const {id, startTime, endTime, selected} = trip
                    const tripDisplay = (<div
                        id={'trip'}
                        key={i}
                        style={{
                            marginLeft: `${startTime - previousEndTime}px`,
                            width: `${endTime - startTime}px`,
                            backgroundColor: selected ? 'gray' : '',
                            border: '1px solid black'
                        }}
                        onClick={(event) => {
                            selectTrip(trip, i)
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