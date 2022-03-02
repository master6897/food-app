import React, {useContext} from "react";
import styled from "styled-components";
import CartContext from "../../Store/Store";
import ListMeals from "./ListMeals";

const StyledMealsWrapper = styled.article`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    paddng: 2rem;
    background: transparent;
    margin-top: 6rem;
`;

const Meals = (props) => {
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const {setAnimationActive} = useContext(CartContext);
    const {meals} = useContext(CartContext);
    const inputAmountHandler = (meal) => (evt) => {
        evt.preventDefault();
        meal.inputValue = parseInt(evt.target.value);
    }
    const addMealToCartHandler = (meal) => (evt) =>{
        evt.preventDefault();
        if(mealsCtx.indexOf(meal) >= 0){
            const copyMeals = [...mealsCtx];
            const tempIndex = mealsCtx.indexOf(meal);
            copyMeals[tempIndex].amount += meal.inputValue;
            setAnimationActive(true);
            console.log(copyMeals);
            setMealsCtx(copyMeals);
            setTimeout(()=>{
                setAnimationActive(false);
            }, 300);
        }else{
            meal.amount = meal.inputValue;
            setAnimationActive(true);
            setTimeout(()=>{
                setAnimationActive(false);
            }, 300);
            setMealsCtx((prevState) => {
                return [meal, ...prevState];
            })
        }
    }
    return(
        <StyledMealsWrapper>
            <ListMeals
                listMeals={meals}
                addMealToCartHandler={addMealToCartHandler}
                inputAmountHandler={inputAmountHandler}
            />
        </StyledMealsWrapper>
    )
}
export default Meals;