import React, {useContext, useState} from "react";
import styled, {keyframes, css} from "styled-components";
import Button from "../Button/Button";
import useForm from "../Hooks/use-form";
import Input from "./Input";
import useHttpRequest from "../Hooks/use-http";
import CartContext from "../../Store/Store";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    & p{
        color: red;
        margin: .3rem 0;
        text-align: left;
    }
    & div{
        display: flex;
        width: 90%;
        padding: .5rem;
        align-items: center;
        justify-content: flex-start;
        &.input-error{
            & input{
                background-color: salmon;
            }
        }
        & label{
            width: 30%;
        }
        & input{
            width: 70%;
            padding: .2rem;
            outline: none;
            border: 1px solid black;
            border-radius: 8px;
            transition: 0.2s ease;
            &:focus{
                border: 2px solid #8a2b06;
            }
        }
    }
`;

const waveAnimation = keyframes`
    0%,40%,100%{
        transform: translateY(0);
    }
    20%{
        transform: translateY(-.5rem);
        color: #8a2b06;
    }
`;

const StyledAnimateDiv = styled.div`
    position: relative;
    display: flex;
    letter-spacing: .2rem;
`;

const AnimatedSpan = styled.span`
    display: block;
    position: relative;
    font-size: 1.5rem;
    font-weight: 600;
    animation: ${waveAnimation} 1.1s infinite;
    animation-delay: calc(.1s * ${props => props.count});
` 

const UserDetailsForm = (props) => {
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const {cartActive, setCartActive} = useContext(CartContext);
    const [isOrdering, setIsOrdering] = useState(false);
    const zipCodeRegex = /[0-9]{2}-[0-9]{3}/;
    const phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;
    const {
        value: firstNameValue,
        isValid: firstNameValid,
        error: firstNameError,
        isTouched: firstNameTouched,
        inputBlurHandler: firstNameBlurHandler,
        inputChangeHandler: firstNameChangeHandler,
        reset: firstNameReset
    } = useForm((value) => value.trim().length > 0);

    const {
        value: lastNameValue,
        isValid: lastNameValid,
        error: lastNameError,
        isTouched: lastNameTouched,
        inputBlurHandler: lastNameBlurHandler,
        inputChangeHandler: lastNameChangeHandler,
        reset: lastNameReset
    } = useForm((value) => value.trim().length > 0);

    const {
        value: cityValue,
        isValid: cityValid,
        error: cityError,
        isTouched: cityTouched,
        inputBlurHandler: cityBlurHandler,
        inputChangeHandler: cityChangeHandler,
        reset: cityReset
    } = useForm((value) => value.trim().length > 0);

    const {
        value: zipCodeValue,
        isValid: zipCodeValid,
        error: zipCodeError,
        isTouched: zipCodeTouched,
        inputBlurHandler: zipCodeBlurHandler,
        inputChangeHandler: zipCodeChangeHandler,
        reset: zipCodeReset
    } = useForm((value) => zipCodeRegex.exec(value));

    const {
        value: phoneValue,
        isValid: phoneValid,
        error: phoneError,
        isTouched: phoneTouched,
        inputBlurHandler: phoneBlurHandler,
        inputChangeHandler: phoneChangeHandler,
        reset: phoneReset
    } = useForm((value) => phoneRegex.exec(value));
    
    const formClosingHandler = (evt) => {
        evt.preventDefault();
        props.formClosingHandler();
    }
    let formIsValid = false;
    if(firstNameValid && lastNameValid && cityValid && zipCodeValid && phoneValid){
        formIsValid = true;
    }

    const {isLoading, error, sendRequest: makeOrder} = useHttpRequest();
    const formSubmitHandler = async (evt) => {
        evt.preventDefault();
        const data = {
            meals: mealsCtx,
            userInfo: {
                firstName: firstNameValue,
                lastName: lastNameValue,
                city: cityValue,
                zipCode: zipCodeValue,
                phoneNumber: phoneValue
            }
        }
        makeOrder({
            url: 'https://react-custom-hooks-9a46e-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: data
        }
        );
        if(isLoading){
            setIsOrdering(true);
            console.log('Sending data');
        }
        if(!error){
            setTimeout(() => {
                setIsOrdering(false);
                setMealsCtx([]);
                setCartActive(!cartActive);
                props.formClosingHandler();
            },3000);
        }
        firstNameReset();
        lastNameReset();
        cityReset();
        zipCodeReset();
        phoneReset();
    }
    return(
        <>
            {!isOrdering &&
                <StyledForm onSubmit={formSubmitHandler}>
                    <Input 
                        value={firstNameValue}
                        type='text'
                        label='First Name'
                        isTouched={firstNameTouched}
                        error={firstNameError}
                        inputBlurHandler={firstNameBlurHandler}
                        inputChangeHandler={firstNameChangeHandler}/>
                    <Input 
                        value={lastNameValue}
                        type='text'
                        label='Last Name'
                        isTouched={lastNameTouched}
                        error={lastNameError}
                        inputBlurHandler={lastNameBlurHandler}
                        inputChangeHandler={lastNameChangeHandler}/>
                    <Input 
                        value={cityValue}
                        type='text'
                        label='City'
                        isTouched={cityTouched}
                        error={cityError}
                        inputBlurHandler={cityBlurHandler}
                        inputChangeHandler={cityChangeHandler}/>
                    <Input 
                        value={zipCodeValue}
                        type='text'
                        label='Zip code'
                        placeholder='33-333'
                        isTouched={zipCodeTouched}
                        error={zipCodeError}
                        inputBlurHandler={zipCodeBlurHandler}
                        inputChangeHandler={zipCodeChangeHandler}/>
                    <Input 
                        value={phoneValue}
                        type='text'
                        label='Phone Number'
                        placeholder='333-333-333'
                        isTouched={phoneTouched}
                        error={phoneError}
                        inputBlurHandler={phoneBlurHandler}
                        inputChangeHandler={phoneChangeHandler}/>
                    <div className='container-buttons'>
                        <Button value='Cancel' cancel={true} onClick={formClosingHandler}/>
                        <Button type='submit' value='Confirm' disabled={!formIsValid} className={formIsValid ? '' : 'disabled'}/>
                    </div>
                </StyledForm>}
                {isOrdering && 
                <StyledAnimateDiv>
                    <AnimatedSpan count='1'>O</AnimatedSpan>
                    <AnimatedSpan count='2'>r</AnimatedSpan> 
                    <AnimatedSpan count='3'>d</AnimatedSpan> 
                    <AnimatedSpan count='4'>e</AnimatedSpan> 
                    <AnimatedSpan count='5'>r</AnimatedSpan>   
                    <AnimatedSpan count='6'>i</AnimatedSpan> 
                    <AnimatedSpan count='7'>n</AnimatedSpan> 
                    <AnimatedSpan count='8'>g</AnimatedSpan> 
                    <AnimatedSpan count='9'>.</AnimatedSpan> 
                    <AnimatedSpan count='10'>.</AnimatedSpan> 
                    <AnimatedSpan count='11'>.</AnimatedSpan> 
                </StyledAnimateDiv>}
        </>
        
    )
}

export default UserDetailsForm;