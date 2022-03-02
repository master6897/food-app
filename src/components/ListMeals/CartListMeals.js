import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../Store/Store";
import Button from "../Button/Button";

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
    & div.container-buttons{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        & nth-child(1){
            margin-left: 1rem;
        }
    }
    @media (max-width: 480px){
        width: 80%;
    }
`;
const StyledMealContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    ${props => props.cart ? 'color: black;' : null}
    & div{
        text-align: left;
        & p.descr{
            font-style: italic;
        }
        & p.price{
            font-weight: 700;
            color: #b94517;
        }
    }
    & div.cart-amount__manipulation{
        display: flex;
        flex-drection: row;
        align-items: center;
        justify-content: space-between;
        width: 20%;
    }
    & div.container-inputs{
        display: flex;
        flex-direction: column;
        & h3{
            display: inline-block;
        }
        & input{
            margin-left: .5rem;
            width: 2rem;
            text-align: center;
        }
    }
`

const CartListMeals = (props) => {
    const {cartActive, setCartActive} = useContext(CartContext);
    let totalAmount = 0;
    const minusMealHandler = (meal) => (evt) => {
        evt.preventDefault();
        props.minusMealHandler(meal);
    }
    const plusMealHandler = (meal) => (evt) => {
        evt.preventDefault();
        props.plusMealHandler(meal);
    }
    const orderMealHandler = (evt) => {
        evt.preventDefault();
        console.log('Ordering...');
    }
    return(
            <StyledMealsContainer>
                {props.listMeals.length > 0 ? props.listMeals.map((meal) => {
                    totalAmount += meal.price * meal.amount;
                    return (
                        <StyledMealContainer key={meal.id} cart={props.cart}>
                            <div>
                                <h3>{meal.name}</h3>
                                <p className='descr'>{meal.description}</p>
                                <p className='price'>${meal.price * meal.amount}</p>
                            </div>
                            <div className='cart-amount__manipulation'>
                                <Button value="-" onClick={minusMealHandler(meal)}/>
                                <h3>{meal.amount}</h3>
                                <Button value="+" onClick={plusMealHandler(meal)}/>
                            </div>
                        </StyledMealContainer>
                    )
                }): 
                    <StyledMealContainer cart={props.cart}>
                        <h1>Nothing in the cart!</h1>
                    </StyledMealContainer>
                }
                {props.listMeals.length > 0 && <h1>Total amount: {totalAmount.toFixed(2)}</h1>}
                <div className='container-buttons'>
                    <Button value='Cancel' cancel={true} onClick={() => setCartActive(!cartActive)}/>
                    {props.listMeals.length > 0 && <Button value='Order' margin='1rem' onClick={orderMealHandler}/>}
                </div>
                
            </StyledMealsContainer>
    )
}
export default CartListMeals;