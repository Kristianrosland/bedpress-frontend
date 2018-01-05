import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewUserPage extends Component {

  render() {
    return (<div> NEW USER PAGE </div>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
      
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserPage)
