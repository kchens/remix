import React from 'react'

const Trip = ({ id, startTime, endTime, selected, selectTrip }) => {
    return (
        <div
            className={'trip'}
            style={{
                marginLeft: `${startTime}px`,
                width: `${endTime}px`,
                backgroundColor: selected ? 'gray' : '',
                border: '1px solid black'
            }}
            onClick={selectTrip}
        >
            {id}
        </div>
    )
}
export default Trip