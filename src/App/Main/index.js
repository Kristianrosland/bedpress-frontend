import React, { Component } from 'react';
import { connect } from 'react-redux';
//https://www.npmjs.com/package/react-spinners <-- Different spinners 
import { BarLoader } from 'react-spinners';
import { fetchEvents } from '../../actions';
import EventCard from './EventCard';
import './Main.css';

class Main extends Component {
  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    const eventList = this.props.events
      ? this.props.events.map(e => <EventCard key={e.company} event={e} />)
      : null;

    return (
      <div>
        <div className='spinner'>
          <BarLoader loading={ this.props.isFetching } />
        </div>
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
