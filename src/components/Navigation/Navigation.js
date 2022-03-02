import React, {useContext} from 'react';
import styled from 'styled-components';
import HeaderCart from '../Cart/HeaderCart';
import Cart from '../Cart/Cart';
import meals from '../../Photos/meals.jpg';
import CartContext from '../../Store/Store';

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    background-color: #8a2b06;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    z-index:99;
`;
const StyledPhotoContainer = styled.div`
    height: 30rem;
    width: 115%;
    overflow: hidden;
    box-sizing: border-box;
    background-image: url(${meals});
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate(-5%, -20%) rotate(-3deg);
`;
const StyledInfoContainer = styled.div`
    position: absolute;
    width:50%;
    top: 15rem;
    left:24%;
    padding: 1rem;
    color: white;
    background: rgb(54,54,54);
    border: 1px solid transparent;
    border-radius: 20px;
    z-index: 1;
    -webkit-box-shadow: 3px 8px 37px 0px rgba(0, 0, 0, 1);
    -moz-box-shadow: 3px 8px 37px 0px rgba(0, 0, 0, 1);
    box-shadow: 3px 8px 37px 0px rgba(0, 0, 0, 1);
    @media (max-width: 480px){
        width: 80%;
        left: 6%;
    }
`
const Navigation = () =>{
    const {cartActive} = useContext(CartContext);
    return(
        <>
            <StyledHeader>
                <h1>ReactMeals</h1>
                <HeaderCart />
                {cartActive && <Cart/>}
            </StyledHeader>
            <StyledPhotoContainer />
            <StyledInfoContainer>
                <h1>Delicious Food, Delivered To You</h1>
                <p>Choose your favourite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home</p>
                <p>All our meal are cooked width high-quality ingredients, just-in-tiime and of courde by experienced chefs!</p>
            </StyledInfoContainer>
        </>
    )
}
export default Navigation;