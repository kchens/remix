import React, {Component} from 'react'
import Trip from './Trip'
class Trips extends Component {

    render() {
        const { trips, selectTrip } = this.props
        let previousEndTime = 0
        return (            
            <div 
                style={{ display: 'flex' }}
            >
                {trips.map((trip, i) => {
                    const {id, startTime, endTime, selected} = trip
                    const updatedStartTime = startTime - previousEndTime
                    const updatedEndTime = endTime - startTime
                    
                    const tripDisplay = (
                        <Trip
                            key={i}
                            id={id}
                            className={'trip'}
                            selected={selected}
                            startTime={updatedStartTime}
                            endTime={updatedEndTime}
                            selectTrip={(event) => {
                                if (event.target.className === 'trip') selectTrip(trip, i)
                            }}
                        />
                    )

                    previousEndTime = endTime
                    return tripDisplay
                })}
            </div>
        )

    }
} 
export default Trips