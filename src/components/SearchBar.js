import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import '../styles/Search.css';

function SearchBar() {
  const { pathname } = useLocation();
  const searchCategory = pathname.includes('drinks') ? 'drinks' : 'meals';

  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const firstLetter = 'first-letter';
  const { handleSearch } = useContext(SearchContext);

  return (
    <div className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search"
        value={ searchText }
        onChange={ (e) => setSearchText(e.target.value) }
      />
      <div>
        <label>
          <input
            type="radio"
            name="searchType"
            data-testid="ingredient-search-radio"
            checked={ searchType === 'ingredient' }
            onChange={ () => setSearchType('ingredient') }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            data-testid="name-search-radio"
            checked={ searchType === 'name' }
            onChange={ () => setSearchType('name') }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            data-testid="first-letter-search-radio"
            checked={ searchType === firstLetter }
            onChange={ () => setSearchType(firstLetter) }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch(searchCategory, searchType, searchText) }
        className="search-button"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
