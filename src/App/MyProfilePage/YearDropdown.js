import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import './dropdown.css';

class YearDropdown extends Component {
  render() {
    const options = [
      { value: 1, label: '1. årsstudent'},
      { value: 2, label: '2. årsstudent'},
      { value: 3, label: '3. årsstudent'},
      { value: 4, label: '4. årsstudent'},
      { value: 5, label: '5. årsstudent'},
    ]

    const year = this.props.currentYear
      ? { value: this.props.currentYear, label: `${this.props.currentYear}. årsstudent`}
      : null;

    return (
      <Dropdown
        options={options}
        value={year}
        onChange={this.props.onChange}
        placeholder="Velg årstrinn" />
    );
  }
}

export default YearDropdown;
