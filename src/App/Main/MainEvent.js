import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/utils';

class MainEvent extends Component {
  render() {
    // TODO: Move to utils class
    const registration_start = formatDate(this.props.registration_start);
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
        <p>{this.props.location}</p>
        <p>{this.props.year_limit}</p>
        <p>{registration_start}</p>
        <p>{this.props.capacity}</p>
        <p>{this.props.participants.length}</p>
      </div>
    );
  }
}

MainEvent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  year_limit: PropTypes.number,
  registration_start: PropTypes.objectOf(Date),
  capacity: PropTypes.number,
  participants: PropTypes.arrayOf(String)
};

MainEvent.defaultProps = {
  title: 'Tom',
  description: 'Tom',
  location: 'Tom',
  year_limit: -1,
  registration_start: new Date(),
  capacity: -1,
  participants: []
};

export default MainEvent;
