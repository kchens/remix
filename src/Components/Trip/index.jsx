import React, {PureComponent} from 'react'

class Trip extends PureComponent {
    constructor(props) {
        super(props)
        this.onDragStart = this.onDragStart.bind(this)
    }

    onDragStart = (event, trip) => {
        console.log('dragstart on div: ', trip);
        event.dataTransfer.setData("trip", trip);
    }

    render() {
        const { id, startTime, endTime, selected, selectTrip } = this.props
        return (            
            <div
                draggable
                onDragStart={(event) => this.onDragStart(event, id)}
                style={{
                    marginLeft: `${startTime}px`,
                    width: `${endTime - startTime}px`,
                    backgroundColor: selected ? 'gray' : '',
                    border: '1px solid black'
                }}
                onClick={selectTrip}
            >
                {id}
            </div>
        )

    }
} 
export default Trip