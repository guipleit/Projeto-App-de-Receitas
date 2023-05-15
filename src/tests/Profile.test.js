import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('teste do componente profile', () => {
  test('testa a existência do elemento de email', () => {
    const emailTest = { email: 'example@hotmail.com' };
    localStorage.setItem('user', JSON.stringify(emailTest));
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const getEmailLocalStorage = screen.getByTestId('profile-email');
    expect(getEmailLocalStorage).toBeInTheDocument();
  });

  test('testando se existe o botão done recipes', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();
  });

  test('testando se existe o botão done recipes', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeInTheDocument();
  });
  test('testando se existe o botão de logout', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
  });
  test('testando a função do botão logout', () => {
    const emailTestObj = { email: 'example2@hotmail.com' };
    localStorage.setItem('user', JSON.stringify(emailTestObj));
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    fireEvent.click(btnLogout);
    const tryGetEmailStorage = JSON.parse(localStorage.getItem('user'));
    expect(tryGetEmailStorage).toEqual(null);
  });
});
