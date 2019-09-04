import React, {PureComponent} from 'react'

class Trip extends PureComponent {
    toggleSelectColor(e) {
        const trip = e.target
        const color = trip.style.backgroundColor ? '' : 'gray'
        trip.style.backgroundColor = color
    }

    render() {
        const { id, startTime, endTime } = this.props
        return (
            <div
                style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black' }}
            >
                <div
                    style={{
                        marginLeft: `${startTime}px`,
                        width: `${endTime}px`,
                        padding: '0.5rem',
                        border: '1px solid black'
                    }}
                    onClick={this.toggleSelectColor}
                >
                    {id}
                </div>
            </div>
        )
    }
} 

export default Trip