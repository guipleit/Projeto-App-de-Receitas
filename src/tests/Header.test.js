import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Testes do componente Header', () => {
  const searchId = 'search-top-btn';
  it('testa se o título é renderizado', () => {
    const title = 'Meals';
    render(<Header title={ title } searchIconBool />);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toHaveTextContent(title);
  });

  it('testa se o ícone de profile é renderizado', () => {
    render(<Header title="Meals" />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
  });

  it('testa se ícone de busca é renderizado corretamente', () => {
    render(<Header title="Meals" searchIconBool />);
    const searchIcon = screen.getByTestId(searchId);
    expect(searchIcon).toBeInTheDocument();
  });

  it('testa se ícone de busca não é renderizado ao passar a prop', () => {
    render(<Header title="Meals" searchIconBool={ false } />);
    const searchIcon = screen.queryByTestId(searchId);
    expect(searchIcon).not.toBeInTheDocument();
  });

  it('testa se o search bar é renderizado ao clicar no ícone de busca', () => {
    render(<Header title="Meals" searchIconBool />);
    const searchButton = screen.getByTestId(searchId);
    userEvent.click(searchButton);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  it('testa se o search bar é ocultado ao clicar novamente no ícone de busca', () => {
    render(<Header title="Meals" searchIconBool />);
    const searchButton = screen.getByTestId(searchId);
    userEvent.click(searchButton);
    userEvent.click(searchButton);
    const searchBar = screen.queryByTestId('search-input');
    expect(searchBar).not.toBeInTheDocument();
  });

  it('testa se o botão de profile redireciona para a página de perfil', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <Header title="Meals" searchIconBool />
      </Router>,
    );
    const profileButton = screen.getByTestId('profile-top-btn');
    userEvent.click(profileButton);
    expect(history.location.pathname).toBe('/profile');
  });
});
