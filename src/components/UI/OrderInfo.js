import React, { useContext } from "react";
import CartContext from "../../Store/Store";
import Modal from "../Modal/Modal";
import styled from "styled-components";
import Button from "../Button/Button";

const StyledInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 20px;
    background-color: white;
    width: 70%;
    padding: 1rem;
    & button{
        width: 30%;
    }
`

const OrderInfo = () => {
    const {isOrdered, setIsOrdered} = useContext(CartContext);
    const isOrderHandler = () => {
        setIsOrdered(false);
    }
    return(
        <>
        {isOrdered &&
        <Modal>
            <StyledInfoContainer>
                <h1>Your food is being prepared!</h1>
                <Button value="Okay" onClick={isOrderHandler}></Button>
            </StyledInfoContainer>
        </Modal>}
        </>
    )
}
export default OrderInfo;