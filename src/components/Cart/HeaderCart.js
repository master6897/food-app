import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import CartContext from "../../Store/Store";

const StyledCartAnimation = keyframes`
    0% {
        transform: scale(1);
    }
    10% {
        transform: scale(0.9);
    }
    30% {
        transform: scale(1.1);
    }
    50% {
        transform: scale(1.15);
    }
    100% {
        transform: scale(1);
    }
`;
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 20%;
    background-color: #4d1601;
    border: 1px solid transparent;
    border-radius: 20px;
    padding: .7rem;
    box-sizing: border-box;
    animation: ${props => props.animation && css`${StyledCartAnimation} 0.3s linear;`};
    cursor: pointer;
    & span{
        font-weight: 700;
    }
    & :nth-child(3){
        background-color: #b94517;
        border: 1px solid transparent;
        border-radius: 50%;
        padding: 0.25rem 0.8rem;
        box-sizing: border-box;
    }
    @media (max-width: 480px){
        width: 40%;
    }
`;
const HeaderCart = (props) => {
    const {mealsCtx} = useContext(CartContext);
    const {cartActive, setCartActive} = useContext(CartContext);
    const {animationActive} = useContext(CartContext);
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(()=> {
        let temp = 0;
        mealsCtx.map((meal) => {
            return temp += meal.amount;
        })
    setTotalAmount(temp);
    },[mealsCtx])
    return(
        <StyledContainer onClick={() => setCartActive(!cartActive)} className="cart" animation={animationActive}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Your Cart</span>
            <span>{totalAmount}</span>
        </StyledContainer>
    )
}
export default HeaderCart;