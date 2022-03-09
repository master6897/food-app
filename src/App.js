import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Meals from './components/ListMeals/Meals';
import Provider from './Store/Provider';
import OrderInfo from './components/UI/OrderInfo';

function App() {
  return (
    <div className="App">
        <Provider>
          <Navigation />
          <Meals />
          <OrderInfo />
        </Provider>
    </div>
  );
}

export default App;
