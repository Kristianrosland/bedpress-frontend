import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

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
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class AllergyInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: allergies,
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
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

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Allergi..',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
      />
    );
  }
}

export default AllergyInputField;
