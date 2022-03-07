import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const StyledMealsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 60%;
    background: white;
    border: 1px solid transparent;
    border-radius: 20px;
    @media (max-width: 480px){
        width: 80%;
    }
`;
const StyledMealContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0,0.1);
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
        width: 10%;
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

const ListMeals = (props) => {
    return(
            <StyledMealsContainer>
                {props.listMeals.map((meal) => {
                    return (
                        <StyledMealContainer key={meal.id} cart={props.cart}>
                            <div>
                                <h3>{meal.name}</h3>
                                <p className='descr'>{meal.description}</p>
                                <p className='price'>${meal.price}</p>
                            </div>
                            <div className='container-inputs'>
                                <div>
                                    <h3>Amount</h3>
                                    <input type='number' defaultValue='1' onChange={props.inputAmountHandler(meal)}/>
                                </div>
                                <Button value='+ Add' onClick={props.addMealToCartHandler(meal)}></Button>
                            </div>
                        </StyledMealContainer>
                    )
                })}
            </StyledMealsContainer>
    )
}
export default ListMeals;