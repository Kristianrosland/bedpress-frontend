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
  constructor(props) {
    super(props)
    this.state = {}
  }

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
    const name = this.props.userInfo.name;
    const email = this.props.userInfo.email;
    const program = this.state.program ? this.state.program : this.props.userInfo.studyProgram;
    const year = this.state.year ? this.state.year : this.props.userInfo.year;
    const allergies = this.props.userInfo.allergies ? this.props.userInfo.allergies : [];
    const saveButton = <button className='save-button'> Lagre innstillinger </button>;

    return (
      <div className='outer-container'>
        <div className='container'>
          <div className='display-name'> { name } </div>
          <div className='email'> { email } </div>
          <StudyProgramDropdown
            currentProgram={program}
            onChange={({ value }) => { this.setState({program: value}) }}
            disabled={true}
          />
          <YearDropdown
            currentYear={year}
            onChange={({ value }) => { this.setState({year: value}) }}
            disabled={false}
          />
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
