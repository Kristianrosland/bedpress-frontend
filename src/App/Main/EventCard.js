import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './EventCard.css';

class EventCard extends Component {
  render() {
    const event = this.props.event;
    return (
      <div className='card-wrapper'>
        <p>{event.name}</p>
        <p>{event.company}</p>
        <p>{event.seats}</p>
      </div>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.any.isRequired,
};

export default EventCard;
