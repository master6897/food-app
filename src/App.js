import React, {useState} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Meals from './components/ListMeals/Meals';
import CartContext from './Store/Store';

function App() {
  const [meals, setMeals] = useState([]);
  const [listMeals, setListMeals] = useState([
    {
        id: 'e1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: '22.99'
    },
    {
        id: 'e2',
        name: 'Schnitzel',
        description: 'A german speciality',
        price: '16.50'
    },
    {
        id: 'e3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: '12.99'
    },
    {
        id: 'e4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: '18.99'
    }
]);
  const [cartActive, setCartActive] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  return (
    <div className="App">
      <CartContext.Provider value={{
        mealsCtx: meals, 
        setMealsCtx: setMeals, 
        meals: listMeals, 
        setMeals: setListMeals,
        cartActive: cartActive,
        setCartActive: setCartActive,
        animationActive: animationActive,
        setAnimationActive: setAnimationActive}}>
        <Navigation />
        <Meals />
      </CartContext.Provider>
    </div>
  );
}

export default App;
