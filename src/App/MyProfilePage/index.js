import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllergyInputField from './AllergyInputField';
import StudyProgramDropdown from './StudyProgramDropdown';
import YearDropdown from './YearDropdown';
import './myProfilePage.css';

class MyProfilePage extends Component {
  render() {
    const newUser = this.props.newUser ? <p> {'Welcome new user!'} </p> : null;

    return (
      <div className="container">
        <StudyProgramDropdown />
        <YearDropdown />
        <AllergyInputField />
        { newUser }
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
