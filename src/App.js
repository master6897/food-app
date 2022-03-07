import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Meals from './components/ListMeals/Meals';
import CartContext from './Store/Store';
import useHttpRequst from './components/Hooks/use-http';
import Modal from './components/Modal/Modal';

function App() {
  const [meals, setMeals] = useState([]);
  const [listMeals, setListMeals] = useState([]);

  const [cartActive, setCartActive] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  /*const [listMeals, setListMeals] = useState(
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
);*/
    const transformData = useCallback((taskObject) => {
      const loadedTasks = [];

      for (const key in taskObject){
        loadedTasks.push({
          id: key,
          name: taskObject[key].name,
          description: taskObject[key].description,
          price: taskObject[key].price
        });
      }
      setListMeals(loadedTasks);
    }, []);

  const {isLoading, error, sendRequest: fetchMeals} = useHttpRequst(transformData);
  useEffect(() => {
    fetchMeals({
      url: 'https://react-custom-hooks-9a46e-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
    });
  }, [fetchMeals]);

  return (
    <div className="App">
      {!isLoading && !error &&
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
        </CartContext.Provider>}
      {(isLoading || error) &&
        <Modal>
          {error ? <h1 style={{color: 'white'}}>{error}</h1>:<h1 style={{color: 'white'}}>Loading...</h1>}
        </Modal>
      }
      
    </div>
  );
}

export default App;
