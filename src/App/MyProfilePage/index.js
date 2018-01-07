import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllergyInputField from './AllergyInputField';
import StudyProgramDropdown from './StudyProgramDropdown';
import YearDropdown from './YearDropdown';
import AllergyTags from './AllergyTags';
import './myProfilePage.css';

class MyProfilePage extends Component {
  render() {
    const newUser = this.props.newUser ? <p> {'Welcome new user!'} </p> : null;
    const allergies = [ 'Gluten', 'Vegetarianer', 'Pesketarianer' ]
    const saveButton = <button className='save-button'> Lagre </button>;

    return (
      <div className="container">
        { newUser }
        <StudyProgramDropdown />
        <YearDropdown />
        <AllergyInputField />
        <AllergyTags allergies={allergies}/>
        { saveButton }
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
