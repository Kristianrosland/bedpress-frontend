import React, { Component } from 'react';
import HeaderButton from './HeaderButton';
import { withRouter } from 'react-router-dom';
import header from './header.png';
import './header.css';

class Header extends Component {
  render() {
    const route = this.props.isAuthenticated ? 'myProfile' : 'login';
    const text = this.props.isAuthenticated ? 'MIN PROFIL' : 'LOGG INN';
    const myProfileButton = (
      <HeaderButton
        icon='user'
        text={text}
        route={route} />);

    const Logo = withRouter(({ history }) => (
      <img
        className='header-logo'
        onClick={() => {history.push('/')}}
        src={header}
        alt='Header'
      />)
    );

    return (
      <div className='header'>
        <Logo />
        { myProfileButton }
      </div>
    );
  }
}

export default Header;
