import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
`;
const modalRoot = document.getElementById('modal-cart');

const Modal = (props) =>{
    return(
        ReactDOM.createPortal(
            <StyledModal>
                {props.children}
            </StyledModal>,
            modalRoot
        )
    )
}
export default Modal;