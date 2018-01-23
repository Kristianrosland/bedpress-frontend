import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './EventCard.css';
import { signUpForEvent } from '../../actions';

class EventCard extends Component {
  render() {
    const event = this.props.event;
    const onClick = () => {
      this.props.signUpForEvent(this.props.event.id, this.props.idToken)
    }
    const Card = withRouter(({ history }) => (
      <div className='card-wrapper' onClick={ onClick }>
        <p>{event.title}</p>
        <p>{event.capacity}</p>
      </div>
    ));

    return (
      <Card/>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpForEvent: (eventId, idToken) => dispatch(signUpForEvent(eventId, idToken)),
  }
}

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
  }
}

EventCard.propTypes = {
  event: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
