import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

export default function Drinks() {
  return (
    <div>
      <Header title="Drinks" searchIconBool />
      <div className="recipes">
        <Recipes />
      </div>
      <Footer />
    </div>
  );
}
