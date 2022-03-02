import React, {useContext, useState} from "react";
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
    const [isValid, setIsValid] = useState(true);
    const inputAmountHandler = (meal) => (evt) => {
        evt.preventDefault();
        meal.inputValue = parseInt(evt.target.value);
    }
    const addMealToCartHandler = (meal) => (evt) =>{
        evt.preventDefault();
        if(meal.inputValue > 0 && meal.inputValue <5){
            if(mealsCtx.indexOf(meal) >= 0){
                const copyMeals = [...mealsCtx];
                const tempIndex = mealsCtx.indexOf(meal);
                copyMeals[tempIndex].amount += meal.inputValue;
                setAnimationActive(true);
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
        }else{
            setIsValid(false);
        }
    }
    return(
        <>
            {isValid && <StyledMealsWrapper>
                <ListMeals
                    listMeals={meals}
                    addMealToCartHandler={addMealToCartHandler}
                    inputAmountHandler={inputAmountHandler}
                />
            </StyledMealsWrapper>}
            {!isValid && <Modal onClick={() => setIsValid(!isValid)}>
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
        </>
    )
}
export default Meals;