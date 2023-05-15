import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

export default function Profile() {
  const history = useHistory();
  const logoutFunction = () => {
    localStorage.clear();
    history.push('/');
  };

  const getEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <main>
      <Header title="Profile" searchIconBool={ false } />
      {
        getEmail && (
          <div
            data-testid="profile-email"
            className="profile-email"
          >
            {getEmail.email}
          </div>
        )
      }
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        data-testid="profile-logout-btn"
        onClick={ logoutFunction }
        className="profile-logout-btn"

      >
        Logout!
      </button>
      <Footer />
    </main>
  );
}
