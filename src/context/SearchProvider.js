import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import SearchContext from './SearchContext';

export const fetchRecipes = async (
  searchCategory,
  searchType,
  searchText,
  initialFetch = false,
) => {
  let apiUrl = searchCategory === 'meals' ? 'https://www.themealdb.com/api/json/v1/1' : 'https://www.thecocktaildb.com/api/json/v1/1';

  if (initialFetch) {
    apiUrl += '/search.php?s=';
  } else {
    switch (searchType) {
    case 'ingredient':
      apiUrl += `/filter.php?i=${searchText}`;
      break;
    case 'name':
      apiUrl += `/search.php?s=${searchText}`;
      break;
    case 'first-letter':
      apiUrl += `/search.php?f=${searchText}`;
      break;
    default:
      console.error('Invalid search type');
      return;
    }
  }

  const response = await fetch(apiUrl);

  const data = await response.json();
  return data.meals || data.drinks;
};

export default function SearchProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      const searchCategory = pathname.includes('drinks') ? 'drinks' : 'meals';
      const initialRecipes = await fetchRecipes(searchCategory, null, null, true);
      setRecipes(initialRecipes);
    };

    fetchInitialRecipes();
  }, [pathname]);

  const fetchCategories = useCallback(async (searchCategory) => {
    const apiUrl = searchCategory === 'meals' ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list' : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

    const response = await fetch(apiUrl);
    const data = await response.json();
    setCategories(data.meals || data.drinks);
  }, []);

  useEffect(() => {
    const searchCategory = pathname.includes('drinks') ? 'drinks' : 'meals';
    (async () => {
      await fetchCategories(searchCategory);
    })();
  }, [pathname, fetchCategories]);

  const filterByCategory = useCallback(async (searchCategory, categoryName) => {
    if (categoryName === currentCategory) {
      setCurrentCategory(null);
      const initialRecipes = await fetchRecipes(searchCategory, null, null, true);
      setRecipes(initialRecipes);
    } else {
      setCurrentCategory(categoryName);
      const apiUrl = searchCategory === 'meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRecipes(data.meals || data.drinks);
    }
  }, [currentCategory]);

  const handleSearch = useCallback(async (searchCategory, searchType, searchText) => {
    if (searchType === 'first-letter' && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    if (!searchText) {
      global.alert('Please enter a search term');
      return;
    }

    const responseData = await fetchRecipes(searchCategory, searchType, searchText);

    if (!responseData || responseData.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (responseData.length === 1) {
      history.push(`/${searchCategory}/${responseData[0].idMeal
          || responseData[0].idDrink}`);
    } else {
      setRecipes(responseData);
    }
  }, [history]);

  const values = useMemo(() => ({
    handleSearch,
    filterByCategory,
    recipes,
    categories,
    fetchRecipes,
    setRecipes,
    currentCategory,
    setCurrentCategory,
  }), [handleSearch, recipes, categories, filterByCategory, currentCategory]);

  return (
    <SearchContext.Provider value={ values }>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
