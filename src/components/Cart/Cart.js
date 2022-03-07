import React, { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "../../Store/Store";
import CartListMeals from "../ListMeals/CartListMeals";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import UserDetailsForm from "../Form/UserForm";


const StyledMealsContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 60%;
    background: white;
    border: 1px solid transparent;
    border-radius: 20px;
    z-index: 1001;
    & div.list-container{
        width: 100%;
        max-height: 40vh;
        padding: 1rem;
        overflow-Y: scroll;
    }
    & div.container-buttons{
        display: flex;
        width: 70%;
        align-items: center;
        justify-content: space-around;
        padding: 1rem;
        & button{
            font-size: 1.2rem;
        }
    }
    @media (max-width: 480px){
        width: 80%;
    }
`;
const Cart = (props) =>{
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const {cartActive, setCartActive} = useContext(CartContext);
    const [form, setForm] = useState(false);

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

    const orderMealHandler = (evt) => {
        evt.preventDefault();
        console.log('Ordering...');
        setForm(true);
    }

    const formClosingHandler = () => {
        setForm(false);
    }

    return(
        <Modal>
            <StyledMealsContainer>
                <CartListMeals 
                    listMeals={mealsCtx} 
                    cart={true}
                    minusMealHandler={minusMealHandler}
                    plusMealHandler={plusMealHandler}
                />
                {form && <UserDetailsForm formClosingHandler={formClosingHandler}/>}
                {!form && 
                <div className='container-buttons'>
                    <Button value='Cancel' cancel={true} onClick={() => setCartActive(!cartActive)}/>
                    {mealsCtx.length > 0 && <Button value='Order' margin='1rem' onClick={orderMealHandler}/>}
                </div>}
            </StyledMealsContainer>
        </Modal>
    )
}
export default Cart;