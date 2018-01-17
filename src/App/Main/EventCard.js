import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './EventCard.css';
import firebase from 'firebase';

class EventCard extends Component {

  render() {
    const event = this.props.event;
    const signUpForEvent = (event_id) => {
      firebase.auth().currentUser.getIdToken(true).then(idToken => {
        fetch('https://us-central1-bedpress-backend.cloudfunctions.net/app/signUpForEvent', {
          method: 'post',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + idToken,
            'mode': 'cors',
          }),
          body: JSON.stringify({ event_id: event_id }),
        })
        .then(data => data.text())
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
      }).catch(function(error) {
        console.log("FUCKING ERRROR...")
      });
    }
    //<div className='card-wrapper' onClick={() => history.push(`/event/${event.id}`)}>
    const Card = withRouter(({ history }) => (
      <div className='card-wrapper' onClick={() => signUpForEvent(this.props.event.id)}>
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
