import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { recipes,
    categories,
    filterByCategory,
    fetchRecipes,
    setRecipes,
  } = useContext(SearchContext);
  const { pathname } = useLocation();
  const categoryFilter = pathname.includes('drinks') ? 'drinks' : 'meals';

  const maxButtonCount = 5;
  const maxRecipes = 12;

  const applyAllFilter = async () => {
    const initialRecipes = await fetchRecipes(categoryFilter, null, null, true);
    setRecipes(initialRecipes);
  };

  return (
    <>
      <div className="category-filters">
        {categories.slice(0, maxButtonCount).map((category) => {
          const categoryName = category.strCategory || category.strCategoryDescription;

          return (
            <button
              key={ categoryName }
              data-testid={ `${categoryName}-category-filter` }
              onClick={ () => { filterByCategory(categoryFilter, categoryName); } }
            >
              {categoryName}
            </button>
          );
        })}
        <button
          key="All"
          data-testid="All-category-filter"
          onClick={ applyAllFilter }
        >
          All
        </button>
      </div>
      <div className="recipes" data-category-filter={ categoryFilter }>
        {recipes.slice(0, maxRecipes).map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </>
  );
}

export default Recipes;
