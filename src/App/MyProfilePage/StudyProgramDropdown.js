import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import './dropdown.css';

class StudyProgramDropdown extends Component {
  render() {
    const options = [
      'Datateknologi', 'Datavitenskap', 'Datasikkerhet', 'Bioinformatikk', 'IMØ', 'Master'
    ]

    return (
      <Dropdown options={options} placeholder="Velg studieprogram" />
    );
  }
}

export default StudyProgramDropdown;
