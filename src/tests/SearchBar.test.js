import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../context/SearchProvider';
import SearchContext from '../context/SearchContext';
import SearchBar from '../components/SearchBar';

const customRender = (children) => render(
  <BrowserRouter>
    <SearchProvider>
      { children }
    </SearchProvider>
  </BrowserRouter>,
);

const renderWithRouter = (children, initialRoute) => render(
  <MemoryRouter initialEntries={ [initialRoute] }>
    <SearchProvider>
      { children }
    </SearchProvider>
  </MemoryRouter>,
);

describe('Testes do componente SearchBar', () => {
  const searchInputString = 'search-input';
  const ingredientSearchRadioString = 'ingredient-search-radio';
  const nameSearchRadioString = 'name-search-radio';
  const firstLetterSearchRadioString = 'first-letter-search-radio';
  const execSearchBtnString = 'exec-search-btn';

  it('testa se os botoes radio são renderizados', () => {
    customRender(<SearchBar />);

    const searchInput = screen.getByTestId(searchInputString);
    expect(searchInput).toBeInTheDocument();

    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioString);
    expect(ingredientSearchRadio).toBeInTheDocument();

    const nameSearchRadio = screen.getByTestId(nameSearchRadioString);
    expect(nameSearchRadio).toBeInTheDocument();

    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioString);
    expect(firstLetterSearchRadio).toBeInTheDocument();

    const execSearchBtn = screen.getByTestId(execSearchBtnString);
    expect(execSearchBtn).toBeInTheDocument();
  });

  it('testa se input é atualizado', () => {
    customRender(<SearchBar />);
    const searchInput = screen.getByTestId(searchInputString);
    userEvent.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
  });

  it('testa se botoes radio funcionam', () => {
    customRender(<SearchBar />);
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioString);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioString);
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioString);

    userEvent.click(nameSearchRadio);
    expect(nameSearchRadio).toBeChecked();
    expect(ingredientSearchRadio).not.toBeChecked();
    expect(firstLetterSearchRadio).not.toBeChecked();

    userEvent.click(firstLetterSearchRadio);
    expect(firstLetterSearchRadio).toBeChecked();
    expect(ingredientSearchRadio).not.toBeChecked();
    expect(nameSearchRadio).not.toBeChecked();
  });

  it('testa se handleSearch é chamada', async () => {
    const handleSearch = jest.fn();
    customRender(
      <SearchContext.Provider value={ { handleSearch } }>
        <SearchBar />
      </SearchContext.Provider>,
    );
    const searchInput = screen.getByTestId(searchInputString);
    userEvent.type(searchInput, 'test');

    const execSearchBtn = screen.getByTestId(execSearchBtnString);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalled();
    });
  });

  it('testa se alert aparece corretamente', async () => {
    customRender(<SearchBar />);
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const execSearchBtn = screen.getByTestId(execSearchBtnString);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Please enter a search term');
    });

    alertSpy.mockRestore();
  });

  it('testa se tipo buscado é atualizado corretamente', () => {
    customRender(<SearchBar />);
    const ingredientSearchRadio = screen.getByTestId(ingredientSearchRadioString);
    const nameSearchRadio = screen.getByTestId(nameSearchRadioString);
    const firstLetterSearchRadio = screen.getByTestId(firstLetterSearchRadioString);

    userEvent.click(nameSearchRadio);
    expect(ingredientSearchRadio).not.toBeChecked();
    expect(nameSearchRadio).toBeChecked();
    expect(firstLetterSearchRadio).not.toBeChecked();
    expect(screen.getByTestId(searchInputString)).toHaveAttribute('value', '');

    userEvent.click(ingredientSearchRadio);
    expect(ingredientSearchRadio).toBeChecked();
    expect(nameSearchRadio).not.toBeChecked();
    expect(firstLetterSearchRadio).not.toBeChecked();
    expect(screen.getByTestId(searchInputString)).toHaveAttribute('value', '');

    userEvent.click(firstLetterSearchRadio);
    expect(ingredientSearchRadio).not.toBeChecked();
    expect(nameSearchRadio).not.toBeChecked();
    expect(firstLetterSearchRadio).toBeChecked();
    expect(screen.getByTestId(searchInputString)).toHaveAttribute('value', '');
  });

  it('testa se o tipo muda corretamente', () => {
    renderWithRouter(<SearchBar />, '/drinks');
    const drinksRadio = screen.getByTestId(nameSearchRadioString);
    userEvent.click(drinksRadio);
    const execSearchBtn = screen.getByTestId(execSearchBtnString);
    userEvent.click(execSearchBtn);

    renderWithRouter(<SearchBar />, '/meals');
    const mealsRadio = screen.getByTestId(nameSearchRadioString);
    userEvent.click(mealsRadio);
    const execSearchBtn2 = screen.getByTestId(execSearchBtnString);
    userEvent.click(execSearchBtn2);
  });
});
