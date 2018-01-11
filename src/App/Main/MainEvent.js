import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainEvent extends Component {
  render() {
    const event = this.props.event;
    return (
      <div>
        <p>{event.name}</p>
        <p>{event.company}</p>
        <p>{event.seats}</p>
        <p>{event.participants.length}</p>
      </div>
    );
  }
}

MainEvent.propTypes = {
  event: PropTypes.any.isRequired,
};

MainEvent.defaultProps = {
  event: {
    name: 'Ingen',
    company: 'Ingen',
    seats: -1,
    participants: []
  }
};

export default MainEvent;
