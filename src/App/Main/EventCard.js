import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './EventCard.css';

class EventCard extends Component {

  render() {
    const event = this.props.event;
    const Card = withRouter(({ history }) => (
      <div className='card-wrapper' onClick={() => history.push(`/event/${event.id}`)}>
        <p>{event.title}</p>
        <p>{event.capacity}</p>
      </div>
    ));

    return (
      <Card/>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.any.isRequired,
};

export default EventCard;
