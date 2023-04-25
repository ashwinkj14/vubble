import React from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
    <div className='navbar-container'>
    <div className='navbar-main'>
       <div className='navbar-logo'>
          <div className='logo-inner'>
          <div className='logo-container'>
                <Link to='/home' className='no-underline'>
                    <svg fill="currentColor" viewBox="0 0 16 16" className='logo'>
                        <path d="M6 12c0 .667-.083 1.167-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75c-.167-.333-.25-.833-.25-1.5h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h4z" fill="#9c75cc"></path> 
                    </svg>
                </Link>
           </div>
                <Link to='/home' className='no-underline'>
                    <h1 className='head-logo'>Vubble</h1>
                </Link>
          </div>
       </div>
       <div className='navbar-search'>
            <div className='search-container'>
                <div className='search-box'>
                        <form onSubmit={this.handleSubmit}>
                        <input
                        type="text"
                        placeholder="Search"
                        value={this.state.searchTerm}
                        onChange={this.handleInputChange}
                        />
                        <button type="submit">
                        <div className='search-btn-container'>
                                <svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" className="search-btn">
                                    <g>
                                        <path fill-rule="evenodd" d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z" clip-rule="evenodd">
                                        </path>
                                    </g>
                            </svg>
                        </div>
                        </button>
                    </form>
                </div>
            </div>
            
       </div> 
       <div className='navbar-settings'>
            <div className='user-settings'>
                <div className='btns'>
                    <div className='login-btn'>
                        <button className='btn login-btn-textures'>
                            <div>
                                Log In
                            </div>
                        </button>
                    </div>
                    <div className='sign-btn'>
                        <button className='btn signup-btn-textures'>
                            <div>
                                Sign Up
                            </div>
                        </button>
                    </div>
                </div>
                <div className='account-btn'>
                    <Link to='/profile'>
                    <svg width="100%" height="100%" viewBox="0 0 20 20" x="0px" y="0px" className="account-icon">
                        <g>
                            <path fill-rule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clip-rule="evenodd">
                                </path>
                        </g>
                    </svg>
                    </Link>
                </div>
            </div>
       </div>
    </div>
    </div>
    );
  }
}

export default NavBar;
//rgb(255, 132, 0)