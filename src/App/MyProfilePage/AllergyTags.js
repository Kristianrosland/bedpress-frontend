import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './allergyInput.css';

class AllergyTags extends Component {

  render() {
    const renderAllergyTag = allergy => {
      const cross = <FontAwesome
          className='tag-remove-icon'
          name='times'
        />
      return (
        <div className='allergy-tag' key={allergy}>
          { allergy }
          { cross }
        </div>
      );
    }
    const tags = this.props.allergies.map(renderAllergyTag);
    return (
        <div className="tag-container">
            { tags }
        </div>
    )
  }
}

export default AllergyTags;
