import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, reset } from '../actions'

class CounterComponent extends Component {
    render() {
      return (
        <div>
          <button onClick={this.props.onIncrement}> Increment </button>
          <button onClick={this.props.onReset}> Reset </button>
          <p> Count: {this.props.count} </p>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onIncrement: () => {
      dispatch(increment())
    },
    onReset: () => {
      dispatch(reset())
    },
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    count: state.counter.count,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
