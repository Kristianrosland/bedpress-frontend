import React, { Component } from 'react';
import './header.css';
import header from './header.png'

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <img src={header} alt='Header' className='header-logo'/>
      </div>
    );
  }
}

export default Header;
