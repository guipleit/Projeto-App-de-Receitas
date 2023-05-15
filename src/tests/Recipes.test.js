import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import SearchContext from '../context/SearchContext';
import { beefMeals, mealCategories } from './helpers/recipesMock';
import SearchProvider from '../context/SearchProvider';

jest.mock('../context/SearchContext');

describe('Testes do componente Recipes', () => {
  function renderWithMemoryAndContext(
    ui,
    { initialContextState = {}, mockFunctions = {}, ...renderOptions } = {},
  ) {
    return render(
      <MemoryRouter>
        <SearchContext.Provider
          value={ { ...initialContextState, ...mockFunctions } }
        >
          {ui}
        </SearchContext.Provider>
      </MemoryRouter>,
      renderOptions,
    );
  }

  const renderWithRouter = (children, initialRoute) => render(
    <MemoryRouter initialEntries={ [initialRoute] }>
      <SearchProvider>
        { children }
      </SearchProvider>
    </MemoryRouter>,
  );

  it('testa se os cards são renderizados', async () => {
    const initialState = { recipes: [beefMeals], categories: [mealCategories] };

    renderWithMemoryAndContext(<Recipes />, { initialContextState: initialState,
    });
    const card = await waitFor(() => screen.getByTestId('0-recipe-card'));
    expect(card).toBeInTheDocument();
  });

  it('test applyAllFilter when "All" button is clicked', async () => {
    const mockFetchRecipes = jest.fn().mockResolvedValue(beefMeals);
    const mockSetRecipes = jest.fn();
    const filterByCategory = jest.fn();
    const initialState = {
      recipes: beefMeals.meals,
      categories: mealCategories.meals,
      fetchRecipes: mockFetchRecipes,
      setRecipes: mockSetRecipes,
      filterByCategory,
    };

    renderWithMemoryAndContext(<Recipes />, { initialContextState: initialState });

    const allButton = await waitFor(() => screen.getByTestId('All-category-filter'));
    userEvent.click(allButton);

    expect(mockFetchRecipes).toHaveBeenCalled();
    expect(mockSetRecipes).toHaveBeenCalled();
  });

  it('testa se filterByCategory é chamada', async () => {
    const mockFetchRecipes = jest.fn().mockResolvedValue(beefMeals);
    const mockSetRecipes = jest.fn();
    const filterByCategory = jest.fn();
    const initialState = {
      recipes: beefMeals.meals,
      categories: mealCategories.meals,
      fetchRecipes: mockFetchRecipes,
      setRecipes: mockSetRecipes,
      filterByCategory,
    };

    renderWithMemoryAndContext(<Recipes />, { initialContextState: initialState });

    const categoryButton = await waitFor(() => screen.getByTestId('Beef-category-filter'));
    userEvent.click(categoryButton);

    expect(filterByCategory).toHaveBeenCalled();
  });

  it('testa se as categorias mudam de acordo com a rota', async () => {
    renderWithRouter(<Recipes />, '/meals');
    const mealCategoryButton = await waitFor(() => screen.getByTestId('Beef-category-filter'));
    expect(mealCategoryButton).toBeInTheDocument();

    renderWithRouter(<Recipes />, '/drinks');
    const drinkCategoryButton = await waitFor(() => screen.getByTestId('Ordinary Drink-category-filter'));
    expect(drinkCategoryButton).toBeInTheDocument();
  });
});
