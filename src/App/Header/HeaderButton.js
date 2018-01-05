import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class HeaderButton extends Component {
  render() {
    const icon = <FontAwesome
        className='header-button-icon'
        name={this.props.icon}
      />
    const Button = withRouter(({ history }) => (
      <div className='header-button' onClick={() => {history.push(`/${this.props.route}`)}}>
        { icon }
        { this.props.text }
      </div>
    ))

    return (
      <div>
        <Button />
      </div>
    );
  }
}

HeaderButton.propTypes = {
  icon: PropTypes.any.isRequired,
  text: PropTypes.any.isRequired,
  route: PropTypes.any.isRequired,
};

export default HeaderButton;
