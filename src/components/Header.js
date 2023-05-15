import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

export default function Header({ title, searchIconBool }) {
  const [isSearchBarTrue, setSearchBar] = useState(false);
  const history = useHistory();

  return (
    <div className="header-container">
      <h1 data-testid="page-title">{title}</h1>
      <div className="header-div">

        {searchIconBool && (
          <button
            type="button"
            onClick={ () => setSearchBar(!isSearchBarTrue) }
            className="header-input"
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="search icon" />
          </button>
        )}

        <button
          type="button"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
          className="header-input"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
        </button>
      </div>
      {isSearchBarTrue && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIconBool: PropTypes.bool.isRequired,
};
