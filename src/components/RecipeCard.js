import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeCard.css';

function RecipeCard({ recipe, index }) {
  const history = useHistory();

  const handleClick = () => {
    const searchCategory = recipe.idMeal ? 'meals' : 'drinks';
    history.push(`/${searchCategory}/${recipe.idMeal || recipe.idDrink}`);
  };
  return (
    <button
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
      onClick={ handleClick }
    >
      <img
        className="recipe-img"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        {recipe.strMeal || recipe.strDrink}
      </p>
    </button>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
