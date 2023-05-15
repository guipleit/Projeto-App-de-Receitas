import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const getTestEmail = regexEmail.test(userEmail);
    const MIN_VALUE_INPUT = 6;
    if (getTestEmail && userPassword.length > MIN_VALUE_INPUT) setDisabled(false);
    else {
      setDisabled(true);
    }
  }, [userEmail, userPassword]);

  const history = useHistory();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const keyLocalEmail = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(keyLocalEmail));
    history.push('/meals');
  };

  return (
    <div className="container1">
      <div className="container-login1">
        <form
          onSubmit={ handleFormSubmit }
        >
          <label className="login-label">
            Email
            <input
              type="text"
              data-testid="email-input"
              value={ userEmail }
              onChange={ ({ target: { value } }) => setUserEmail(value) }
              className="login-input"
            />
          </label>
          <label className="login-label">
            Senha
            <input
              type="password"
              data-testid="password-input"
              value={ userPassword }
              onChange={ ({ target: { value } }) => setPassword(value) }
              className="login-input"
            />
          </label>
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={ disabled }
            className="login-button"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
