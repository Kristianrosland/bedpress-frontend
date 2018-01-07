import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import './dropdown.css';

class StudyProgramDropdown extends Component {
  render() {
    const options = [
      'Datateknologi', 'Datavitenskap', 'Datasikkerhet', 'Bioinformatikk', 'IMØ', 'Master'
    ]

    return (
      <Dropdown
        options={options}
        value={this.props.currentProgram}
        onChange={this.props.onChange}
        placeholder="Velg studieprogram"
        disabled={this.props.disabled}/>
    );
  }
}

export default StudyProgramDropdown;
