import React, {PureComponent} from 'react'
import withBusTripManager from './with-bus-trip-manager'
import Trips from '../Trips'
import Bus from '../Bus'

class BusTripScheduler extends PureComponent {
    addBus = () => {
        if (!this.props.hasSelectedTrip) {
            this.props.addBus()
            return
        }
    }

    render() {
        const { updateTripToBusError, addTripToBus, buses, selectTrip, hasSelectedTrip, selected, isAddTripError } = this.props
        const isLastBus = (i) => buses.length - 1 === i
        const isTripsEmpty = (bus) => bus.trips.length === 0

        return (
            <div style={{ marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}
                onClick={this.addBus}
            >
                BusTripScheduler
                {isAddTripError && (
                    <div style={{ backgroundColor: 'yellow' }}>
                        Can't add trip to this busline b/c timing doesn't work.
                    </div>
                )}
                {buses.map((bus, i) => {
                    if (hasSelectedTrip && isLastBus(i)) {
                        return <Bus key={i} 
                                    bus={bus} 
                                    selected={selected} 
                                    addTripToBus={addTripToBus} 
                                    hasSelectedTrip={hasSelectedTrip}
                                    updateTripToBusError={updateTripToBusError} 
                                />
                    }

                    if (isTripsEmpty(bus)) return null
                    
                    return <Bus key={i} 
                                bus={bus} 
                                selected={selected}
                                addTripToBus={addTripToBus} 
                                hasSelectedTrip={hasSelectedTrip}
                                updateTripToBusError={updateTripToBusError}
                            >
                                <Trips trips={bus.trips} selectTrip={selectTrip} />
                            </Bus>
                })}
            </div>
        )
    }
}

export default withBusTripManager(BusTripScheduler)
