import React from 'react'
import { showTrip } from '../../api/trips'
import messages from '../AutoDismissAlert/messages'
import { Container, Row, Col } from 'react-bootstrap'

import TripUpdate from './UpdateTrip'
import GetTide from '../Tide/GetTide'

class TripShow extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      trip: null,
      notFound: false
    }
  }

  componentDidMount () {
    const { user, msgAlert, match, setTrip } = this.props
    showTrip(match.params.id, user)
      .then(res => {
        this.setState({ trip: res.data, notFound: false })
        setTrip(this.state.trip)
      })
      .catch(error => {
        msgAlert({
          heading: 'Could not find this tirp: ' + error.message,
          message: messages.showTripFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    let jsx
    if (this.state.notFound) {
      jsx = <p>Cannot connect to server.</p>
    } else if (this.state.trip === null) {
      jsx = <p>Loading... </p>
    } else {
      jsx = (
        <div>
          <Container fluid>
            <Row>
              <h5 className="main">Launch Date {this.state.trip.launchDate} at Coordinates {this.state.trip.latitude}, {this.state.trip.longitude}</h5>
            </Row>
            <Row>
              <Col md="auto">
                <TripUpdate trip={this.state.trip} user={this.props.user} msgAlert={this.props.msgAlert} />
              </Col>
              <Col sm={3}>
                <GetTide user={this.props.user} trip={this.state.trip} msgAlert={this.props.msgAlert} />
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
    return (
      <div>
        <br></br>
        {jsx}
      </div>
    )
  }
}

export default TripShow