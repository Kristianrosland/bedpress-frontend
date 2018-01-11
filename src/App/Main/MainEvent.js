import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainEvent extends Component {
  render() {
    return (
      <p>YES</p>
    );
  }
}

MainEvent.propTypes = {
  event: PropTypes.any.isRequired,
};

export default MainEvent;
