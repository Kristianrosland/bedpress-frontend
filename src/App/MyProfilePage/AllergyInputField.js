import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './allergyInput.css';

const allergies = [
  { name: 'Gluten' },
  { name: 'Laktose' },
  { name: 'Nøtter' },
  { name: 'Skalldyr' },
  { name: 'Vegetarianer' },
  { name: 'Veganer' },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : allergies.filter(allergy =>
    allergy.name.toLowerCase().slice(0, inputLength) === inputValue
    && value !== allergy.name
  );
};

const getSuggestionValue = suggestion => suggestion.name;

class AllergyInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: allergies,
    };
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'click') {
      if (this.isValid(newValue)) {
        this.props.onEnter(newValue)
      }
      this.setState({ value: '' })
    } else {
      this.setState({
        value: newValue
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion, { isHighlighted }) => {
    const cls = isHighlighted ? 'suggestion highlight' : 'suggestion';
    return <div className={cls}> {suggestion.name} </div>;
  };

  isValid = (allergy) => {
    return this.props.currentAllergies
      .filter(a => a.toLowerCase() === allergy.toLowerCase())
      .length === 0;
  }

  render() {
    const { value, suggestions } = this.state;

    const onKeyPress = (event) => {
      if (event.key === 'Enter') {
        const allergy = this.state.value.trim();
        const isValid = this.isValid(allergy)
        if (allergy.length > 2 && isValid) {
          this.props.onEnter(allergy)
          this.setState({ value: '' })
        } else if (allergy.length > 2) {
          this.setState({ value: '' });
        }
      }
    }
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Legg til spesielle diettbehov..',
      value,
      onChange: this.onChange,
      onKeyPress: onKeyPress,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AllergyInputField;
