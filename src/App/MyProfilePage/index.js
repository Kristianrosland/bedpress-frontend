import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyProfilePage extends Component {
  render() {
    const newUser = this.props.newUser ? <p> New user! </p> : null;
    
    return (
      <div>
        { newUser }
        MY PROFILE
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

const mapStateToProps = state => {
  return {
    newUser: state.auth.newUserSignIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage)
