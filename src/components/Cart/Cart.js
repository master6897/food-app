import React, { useContext } from "react";
import CartContext from "../../Store/Store";
import CartListMeals from "../ListMeals/CartListMeals";
import Modal from "../Modal/Modal";

const Cart = (props) =>{
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const minusMealHandler = (meal) => {
        const tempArray = [...mealsCtx];
        const indexOfMeal = mealsCtx.indexOf(meal);
        tempArray[indexOfMeal].amount -=1;
        if(tempArray[indexOfMeal].amount === 0){
            tempArray.splice(indexOfMeal,1);
        }
        setMealsCtx(tempArray);
    }
    const plusMealHandler = (meal) => {
        const tempArray = [...mealsCtx];
        const indexOfMeal = mealsCtx.indexOf(meal);
        tempArray[indexOfMeal].amount +=1;
        setMealsCtx(tempArray);
    }

    return(
        <Modal>
            <CartListMeals 
                listMeals={mealsCtx} 
                cart={true}
                minusMealHandler={minusMealHandler}
                plusMealHandler={plusMealHandler}
            />

        </Modal>
    )
}
export default Cart;