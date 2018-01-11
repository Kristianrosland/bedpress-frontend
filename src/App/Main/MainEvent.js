import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainEvent extends Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <p>{this.props.company}</p>
        <p>{this.props.seats}</p>
        <p>{this.props.participants.length}</p>
      </div>
    );
  }
}

MainEvent.propTypes = {
  event: PropTypes.any.isRequired,
};

MainEvent.defaultProps = {
  name: 'Ingen',
  company: 'Ingen',
  seats: -1,
  participants: []
};

export default MainEvent;
