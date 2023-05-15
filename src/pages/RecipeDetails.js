import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeDetails.css';

function RecipeDetails({ history }) {
  const [foodData, setDetailFood] = useState([]);
  const [ingredientsData, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const checkTypeOfFood = history.location.pathname;
  const { id } = useParams();

  useEffect(() => {
    if (checkTypeOfFood.includes('meals')) {
      const responseFoods = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        const responseRecommended = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const dataRecommended = await responseRecommended.json();
        console.log(dataRecommended);
        const finalData = data.meals;
        setDetailFood(finalData);
        const getKeyFinalData = finalData[0];
        const getKeyAndValueRecipe = Object.entries(getKeyFinalData)
          .filter((ig) => ig[1] !== '' && ig[1] !== null);

        const ingredientsDataFilter = getKeyAndValueRecipe
          .filter((e) => e[0].includes('strIngredient'));

        const measuresDataFilter = getKeyAndValueRecipe.filter((m) => m[0]
          .includes('strMeasure'));

        setIngredients(ingredientsDataFilter);

        setMeasures(measuresDataFilter);
      };
      responseFoods();
    } else if (checkTypeOfFood.includes('drinks')) {
      const responseDrinks = async () => {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();

        const responseRecommended = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const dataRecommended = await responseRecommended.json();
        console.log(dataRecommended);
        const finalData = data.drinks;
        setDetailFood(finalData);
        const getKeyFinalData = finalData[0];

        const getKeyAndValueRecipe = Object.entries(getKeyFinalData)
          .filter((ig) => ig[1] !== '' && ig[1] !== null);

        const ingredientsDataFilter = getKeyAndValueRecipe
          .filter((e) => e[0].includes('strIngredient'));

        const measuresDataFilter = getKeyAndValueRecipe.filter((m) => m[0]
          .includes('strMeasure'));
        setIngredients(ingredientsDataFilter);
        setMeasures(measuresDataFilter);
      };
      responseDrinks();
    }
  }, [checkTypeOfFood, id]);

  return (
    <section>
      <div>
        {
          foodData.map((food) => (
            <div key={ food.idMeal }>
              <img
                src={ food.strMealThumb || food.strDrinkThumb }
                alt={ food.strMeal || food.strGlass }
                data-testid="recipe-photo"
                className="image-details"
              />
              <div>
                <h2
                  data-testid="recipe-title"
                >
                  {food.strMeal || food.strDrink}
                </h2>
                <h4
                  data-testid="recipe-category"
                >
                  { food.strAlcoholic || food.strCategory }
                </h4>
                <p
                  data-testid="instructions"
                >
                  { food.strInstructions }
                </p>
                <ul>
                  {ingredientsData.map((ig, index) => (
                    <li
                      key={ ig[1] }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${ig[1]} - `}
                      {measures[index] && (
                        <span>{measures[index][1]}</span>
                      )}
                    </li>
                  ))}
                </ul>
                {checkTypeOfFood.includes('meals') && (
                  <iframe
                    title="recipe-video"
                    data-testid="video"
                    src={ `https://www.youtube.com/embed/${food.strYoutube.split('watch?v=')[1]}` }

                  />
                )}
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}

RecipeDetails.propTypes = { history: PropTypes.shape }.isRequired;

export default RecipeDetails;
