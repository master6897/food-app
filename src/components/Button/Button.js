import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    outline: none;
    background-color: #8a2b06;
    border: 1px solid transparent;
    border-radius: 20px;
    color: white;
    padding: .5rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s ease;
    ${props => props.cancel ? 'border: 1px solid #8a2b06; background: transparent; color: #8a2b06;' : null}
    &:hover{
        background-color: #b94517;
        ${props => props.cancel ? 'color: white;' : null}
    }
`
const Button = (props) => {
    return(
        <StyledButton onClick={props.onClick} cancel={props.cancel}>
            {props.value}
        </StyledButton>
    )
}
export default Button;