import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('teste do componente footer', () => {
  it('existência do footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('testando a existência dos botões drinks e meals', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });

  it('deve ter o link para meals e o atributo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    expect(mealsButton).toHaveAttribute('alt', 'meal svg');
  });

  it('testando se existe o link de drinks e o atributo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toHaveAttribute('alt', 'drinks svg');
  });
});
