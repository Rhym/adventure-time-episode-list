import React, {Component} from 'react';

import logo from './logo.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">
              <img className="header__logo" src={logo} alt="Adventure Time Logo"/>
            </div>
            {this.props.children}
          </div>
          <div className="pt-navbar-group pt-align-right">
            <a href="https://github.com/Rhym/adventure-time-episode-list"
               rel="noopener"
               target="_blank"
               className="pt-button pt-minimal pt-icon-share">
              Github
            </a>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;