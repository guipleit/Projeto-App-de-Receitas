import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';

describe('Testando os elementos do componente Login', () => {
  it('testa se existe o input do email', () => {
    render(<App />);
    expect(screen.getByRole('textbox', {
      name: /email/i,
    })).toBeInTheDocument();
  });

  it('testa se existe o input para password', () => {
    render(<App />);
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('testa se é possível escrever o email e a senha', () => {
    render(<App />);
    const getPasswordInput = screen.getByLabelText(/senha/i);
    const getEmailInput = screen.getByRole('textbox', {
      name: /email/i,
    });

    userEvent.type(getEmailInput, 'exemplo1@email.com');
    userEvent.type(getPasswordInput, 'minhasenha');
    expect(getEmailInput).toHaveValue('exemplo1@email.com');
    expect(getPasswordInput).toHaveValue('minhasenha');
  });

  it('testa se o botão é desabilitado quando os dois campos são preenchidos corretamente', async () => {
    render(<App />);
    const getPasswordInput = screen.getByLabelText(/senha/i);
    const getEmailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    userEvent.type(getEmailInput, 'meuemail@email.com');
    userEvent.type(getPasswordInput, '1234567');
    await waitFor(() => {
      expect(screen.getByRole('button', {
        name: /enter/i,
      })).toBeEnabled();
    });
  });

  it('Testa o redirecionamento após o submit do formulário', () => {
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, 'push');

    render(
      <Router history={ history }>
        <Login />
      </Router>,
    );

    const form = screen.getByRole('button', {
      name: /enter/i,
    });
    fireEvent.submit(form);

    expect(pushSpy).toHaveBeenCalledWith('/meals');
  });
});
