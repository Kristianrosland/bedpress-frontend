import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { fetchEvents } from '../../actions';

class Main extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    const eventList = this.props.events
      ? this.props.events.map(e => <p> {e.company} </p>)
      : null;

    return (
      <div>
        <RingLoader loading={ this.props.isFetching } />
        { eventList }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.events.isFetching,
    events: state.events.events,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
