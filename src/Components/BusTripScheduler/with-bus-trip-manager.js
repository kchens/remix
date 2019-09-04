import React, { PureComponent } from 'react'
import data from '../../bus-scheduling-input.json'

const withBusTripManager = WrappedComponent => {
    return class extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                trips: []
            }
        }
        componentDidMount() {
            this.setState({trips: data})
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.state}
                />
            )
        }
    }

}

export default withBusTripManager