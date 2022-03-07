import React, {useContext} from "react";
import styled from "styled-components";
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

const UserDetailsForm = (props) => {
    const {mealsCtx, setMealsCtx} = useContext(CartContext);
    const {cartActive, setCartActive} = useContext(CartContext);
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
        )
        if(isLoading){
            console.log('Sending data');
        }else if(error){
            console.log(error);
        }
        firstNameReset();
        lastNameReset();
        cityReset();
        zipCodeReset();
        phoneReset();
        props.formClosingHandler();
        setMealsCtx([]);
        setCartActive(!cartActive);
    }
    return(
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
        </StyledForm>
    )
}

export default UserDetailsForm;