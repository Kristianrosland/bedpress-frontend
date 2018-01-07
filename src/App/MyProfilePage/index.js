import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import firebase from 'firebase';
import { fetchUser } from '../../actions';
import AllergyInputField from './AllergyInputField';
import StudyProgramDropdown from './StudyProgramDropdown';
import YearDropdown from './YearDropdown';
import AllergyTags from './AllergyTags';
import { BarLoader } from 'react-spinners';
import './myProfilePage.css';

class MyProfilePage extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.fetchUser(user);
        } else {
          this.props.authFail();
        }
    });
  }

  render() {
    if (!this.props.userInfo) {
      return <div className='outer-container'><BarLoader /></div>
    }
    const newUser = this.props.newUser;
    const name = this.props.userInfo.name;
    const email = this.props.userInfo.email;
    const program = this.props.userInfo.studyProgram;
    const year = this.props.userInfo.year;
    const allergies = this.props.userInfo.allergies ? this.props.userInfo.allergies : [];
    const saveButton = <button className='save-button'> Lagre innstillinger </button>;

    return (
      <div className='outer-container'>
        <div className='container'>
          <div className='display-name'> { name } </div>
          <div className='email'> { email } </div>
          <StudyProgramDropdown currentProgram={program} />
          <YearDropdown currentYear={year} />
          <AllergyInputField />
          <AllergyTags allergies={allergies}/>
          { saveButton }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: user => dispatch(fetchUser(user)),
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.auth.newUserSignIn,
    userInfo: state.auth.userInfo,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage)
