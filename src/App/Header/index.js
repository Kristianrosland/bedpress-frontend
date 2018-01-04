import React, { Component } from 'react';
import HeaderButton from './HeaderButton';
import header from './header.png';
import './header.css';

class Header extends Component {
  render() {
    const myProfileButton = (
      <HeaderButton
        icon='user'
        text='MIN PROFIL'
        route='myProfile' />);

    return (
      <div className='header'>
        <img src={header} alt='Header' className='header-logo'/>
        { myProfileButton }
      </div>
    );
  }
}

export default Header;
