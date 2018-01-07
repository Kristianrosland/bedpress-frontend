import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllergyInputField from './AllergyInputField';
import StudyProgramDropdown from './StudyProgramDropdown';
import YearDropdown from './YearDropdown';
import AllergyTags from './AllergyTags';
import './myProfilePage.css';

class MyProfilePage extends Component {
  render() {
    const newUser = this.props.newUser;
    const allergies = [] // [ 'Gluten', 'Vegetarianer', 'Pesketarianer', 'YES' ]
    const saveButton = <button className='save-button'> Lagre innstillinger </button>;

    return (
      <div className='outer-container'>
        <div className='container'>
          <div className='display-name'> { "Kristian Rosland" } </div>
          <div className='email'> { "Kristian.rosland@gmail.com" } </div>
          <StudyProgramDropdown redBorder={newUser} />
          <YearDropdown redBorder={newUser} />
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

  }
}

const mapStateToProps = state => {
  return {
    newUser: state.auth.newUserSignIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage)
