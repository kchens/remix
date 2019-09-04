import React, {PureComponent} from 'react'

const Trip = ({ id, startTime, endTime, selected, selectTrip }) => (
    <div
        style={{ margin: '0.5rem', backgroundColor: 'yellow', padding: '0.5rem', borderBottom: '1px solid black' }}
    >
        <div
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
    </div>
)

export default Trip