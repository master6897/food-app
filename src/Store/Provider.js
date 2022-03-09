import { useState, useEffect, useCallback } from "react";
import CartContext from "./Store";
import useHttpRequest from "../components/Hooks/use-http";


const Provider = (props) => {
  const [meals, setMeals] = useState([]);
  const [listMeals, setListMeals] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const [cartActive, setCartActive] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
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

const {isLoading, error, sendRequest: fetchMeals} = useHttpRequest(transformData);
useEffect(() => {
  fetchMeals({
    url: 'https://react-custom-hooks-9a46e-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
  });
}, [fetchMeals]);
    return(
        <CartContext.Provider value={{
            mealsCtx: meals, 
            setMealsCtx: setMeals, 
            meals: listMeals, 
            setMeals: setListMeals,
            cartActive: cartActive,
            setCartActive: setCartActive,
            animationActive: animationActive,
            setAnimationActive: setAnimationActive,
            isLoading,
            error,
            isOrdered,
            setIsOrdered,
            isOrdering,
            setIsOrdering}}>
                {props.children}

        </CartContext.Provider>
    )
}

export default Provider;