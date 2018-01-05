import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectId } from '../../utils/selectors';
import { fetchEvents } from '../../actions';
import { BarLoader } from 'react-spinners';
import './SingleEventPage.css';

class SingleEventPage extends Component {
  componentWillMount() {
    this.props.fetchEvents()
  }

  render() {
    const id = selectId(this.props)
    const event = id && this.props.events ? this.props.events.find(e => e.id === id) : null;
    const eventInfo = event
      ? <div> { event.company } </div>
      : null;
      
    const spinner = !eventInfo
    ? <div className='spinner'> <BarLoader loading={ this.props.isFetching } /> </div>
    : null;

    return (
      <div>
        { spinner }
        { eventInfo }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.events.isFetching,
    events: state.events.events,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleEventPage);
