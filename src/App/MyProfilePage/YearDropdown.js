import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import './dropdown.css';

class YearDropdown extends Component {
  render() {
    const options = [
      '1. årsstudent', '2. årsstudent', '3. årsstudent', '4. årsstudent', '5. årsstudent'
    ]

    return (
      <Dropdown options={options} placeholder="Velg årstrinn" />
    );
  }
}

export default YearDropdown;
