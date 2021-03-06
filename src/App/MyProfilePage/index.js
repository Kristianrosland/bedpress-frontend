import React, { Component } from 'react';
import { connect } from 'react-redux';
/* import { Redirect } from 'react-router'; */
import firebase from 'firebase';
import { fetchUser, updateAllergies, receivedUserInfo, updateProgramAndYear } from '../../actions';
import AllergyInputField from './AllergyInputField';
import StudyProgramDropdown from './StudyProgramDropdown';
import YearDropdown from './YearDropdown';
import AllergyTags from './AllergyTags';
import { BarLoader } from 'react-spinners';
import { db } from '../../utils/firebase'
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
          db.collection("users").doc(user.uid).onSnapshot(doc => {
            if (doc.exists) {
              this.props.receivedUserInfo(doc.data())
            }
          });
        } else {
          this.props.authFail();
        }
    });
  }

  render() {
    if (!this.props.userInfo || !firebase.auth().currentUser) {
      return <div className='outer-container'><BarLoader /></div>
    }
    const uid = firebase.auth().currentUser.uid
    const submitProgramAndYearUpdate = () => {
      var program = this.state.program;
      var year = this.state.year;
      if (!program) { program = this.props.userInfo.studyProgram; }
      if (!year) { year = this.props.userInfo.studyProgram; }
      if (program && year) {
        this.props.updateStudyProgramAndYear(program, year, uid);
      }
    }

    const name = this.props.userInfo.name;
    const email = this.props.userInfo.email;
    const program = this.state.program ? this.state.program : this.props.userInfo.studyProgram;
    const year = this.state.year ? this.state.year : this.props.userInfo.year;
    const allergies = this.props.userInfo.allergies ? this.props.userInfo.allergies : [];
    const saveButton = <button className='save-button'
                          onClick={ submitProgramAndYearUpdate }>
                          Lagre innstillinger </button>;

    return (
      <div className='outer-container'>
        <div className='container'>
          <div className='display-name'> { name } </div>
          <div className='email'> { email } </div>
          <StudyProgramDropdown
            currentProgram={program}
            onChange={({ value }) => { this.setState({program: value}) }}
            disabled={false}
          />
          <YearDropdown
            currentYear={year}
            onChange={({ value }) => { this.setState({year: value }) }}
            disabled={false}
          />
          <AllergyInputField
            onEnter={(allergy) => {
              allergies.push(allergy);
              this.props.updateAllergies(allergies, uid);
            }}
            currentAllergies={allergies}
          />
          <AllergyTags
            allergies={allergies}
            removeAllergy={(allergy) => {
              const newAllergies = allergies.filter(a => a !== allergy);
              this.props.updateAllergies(newAllergies, uid);
            }}
          />
          { saveButton }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: user => dispatch(fetchUser(user)),
    receivedUserInfo: user => dispatch(receivedUserInfo(user)),
    updateAllergies: (allergies, uid) => dispatch(updateAllergies(allergies, uid)),
    updateStudyProgramAndYear: (program, year, uid) => {
      dispatch(updateProgramAndYear(program, year, uid));
    }
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
