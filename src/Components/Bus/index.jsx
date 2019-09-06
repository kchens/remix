import React from 'react'

const Bus = ({addTripToBus, children}) =>  (
        <div
            onClick={addTripToBus}
            style={{
                display: 'flex',
                margin: '0.5rem',
                backgroundColor: 'yellow',
                padding: '0.5rem',
                borderBottom: '1px solid black',
                minHeight: '22px'
            }}
        >
            {children}
        </div>
    )

export default Bus