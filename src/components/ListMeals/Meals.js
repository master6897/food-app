import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import CartContext from "../../Store/Store";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
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
const StyledWarningContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: white;
    border-radius: 12px;
    width: 40%;
    overflow: hidden;
    @media (max-width: 480px){
        width: 80%;
    }
    & div.title{
        background-color: #8a2b06;
        color: white;
        width: 100%;
        text-align: center;
    }
    & div.actions{
        text-align: center;
        padding-bottom: 1rem;
        & button{
            font-size: 1.2rem;
        }
    }
`

const Meals = (props) => {
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const {setAnimationActive} = useContext(CartContext);
    const {meals} = useContext(CartContext);
    const {isLoading, error} = useContext(CartContext);
    const [isValid, setIsValid] = useState(true);
    const [mealsWithAmount, setMealsWithAmount] = useState([]);
    useEffect(() => {
        setMealsWithAmount(() => [...meals]);
        console.log(mealsWithAmount);
    }, [meals]);
    console.log(mealsWithAmount);
    mealsWithAmount.map((meal) => {
        return meal.inputValue = 1;
    });

    const inputAmountHandler = (meal) => (evt) => {
        evt.preventDefault();
        const indexOfMeal = mealsWithAmount.indexOf(meal);
        mealsWithAmount[indexOfMeal].inputValue = parseInt(evt.target.value);
        console.log(mealsWithAmount);
        //meal.inputValue = parseInt(evt.target.value);
    }
    const addMealToCartHandler = (meal) => (evt) =>{
        evt.preventDefault();
        const mealObject = mealsWithAmount.find((idMeal) => idMeal.id === meal.id);
        console.log(mealObject);
        if(mealObject.inputValue > 0 && mealObject.inputValue <5){
            const foundMeal = mealsCtx.find((idMeal) => idMeal.id === meal.id);
            if(foundMeal){
                const copyMeals = [...mealsCtx];
                foundMeal.amount += mealObject.inputValue;
                setAnimationActive(true);
                setMealsCtx(copyMeals);
                setTimeout(()=>{
                    setAnimationActive(false);
                }, 300);
            }else{
                const newMeal = {
                    id: mealObject.id,
                    name: mealObject.name,
                    description: mealObject.description,
                    price: mealObject.price,
                    amount: mealObject.inputValue
                }
                setAnimationActive(true);
                setTimeout(()=>{
                    setAnimationActive(false);
                }, 300);
                setMealsCtx((prevState) => {
                    return [newMeal, ...prevState];
                })
            }
        }else{
            setIsValid(false);
        }
        console.log(mealsCtx);
    }
    return(
        <>
            {!isLoading && !error && 
            <>
            {isValid && 
            <StyledMealsWrapper>
                <ListMeals
                    inputValue={mealsWithAmount.input}
                    listMeals={meals}
                    addMealToCartHandler={addMealToCartHandler}
                    inputAmountHandler={inputAmountHandler}
                />
            </StyledMealsWrapper>}
            {!isValid && 
            <Modal onClick={() => setIsValid(!isValid)}>
                    <StyledWarningContainer>
                        <div className="title">
                            <h1>An error occured!</h1>
                        </div>
                        <div className='actions'>
                            <h3>Pick number of meals greater than 0 and less than 5.</h3>
                            <Button value="Okey" onClick={() => setIsValid(!isValid)}/>
                        </div>
                    </StyledWarningContainer>
                </Modal>}
            </>}
            {(isLoading || error) && 
                <Modal>
                    {error ? <h1 style={{color: 'white'}}>An error occured!</h1> : <h1 style={{color: 'white'}}>Fetching Data...</h1>}
                </Modal>
            }
        </>
    )
}
export default Meals;