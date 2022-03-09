import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Meals from './components/ListMeals/Meals';
import Provider from './Store/Provider';

function App() {
  return (
    <div className="App">
        <Provider>
          <Navigation />
          <Meals />
        </Provider>
    </div>
  );
}

export default App;
