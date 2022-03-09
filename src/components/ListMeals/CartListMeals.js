import React, {useContext} from "react";
import styled from "styled-components";
import CartContext from "../../Store/Store";
import Button from "../Button/Button";


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
        & button{
            font-size: 1.5rem;
            @media (max-width: 480px){
                font-size: 1rem;
            }
        }
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
    const {isOrdering} = useContext(CartContext)
    let totalAmount = 0;
    const minusMealHandler = (meal) => (evt) => {
        evt.preventDefault();
        props.minusMealHandler(meal);
    }
    const plusMealHandler = (meal) => (evt) => {
        evt.preventDefault();
        props.plusMealHandler(meal);
    }
    return(
            <>
                <div className='list-container'>
                    {props.listMeals.length > 0 ? props.listMeals.map((meal) => {
                        totalAmount += meal.price * meal.amount;
                        return (
                            <StyledMealContainer key={meal.id} cart={props.cart}>
                                <div>
                                    <h3>{meal.name}</h3>
                                    <p className='descr'>{meal.description}</p>
                                    <p className='price'>${meal.price}</p>
                                </div>
                                {!isOrdering &&
                                <div className='cart-amount__manipulation'>
                                    <Button value="-" onClick={minusMealHandler(meal)}/>
                                    <h3>{meal.amount}</h3>
                                    <Button value="+" onClick={plusMealHandler(meal)}/>
                                </div>}
                            </StyledMealContainer>
                        )
                    }): 
                        <StyledMealContainer cart={props.cart}>
                            <h1>Nothing in the cart!</h1>
                        </StyledMealContainer>
                    }
                </div>
                {props.listMeals.length > 0 && <h1>Total amount: {totalAmount.toFixed(2)}</h1>}
            </>
    )
}
export default CartListMeals;