import { useState } from "react";

const useForm = (validation) => {
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const inputValid = validation(inputValue);
    const error = !inputValid && isTouched;


    const inputChangeHandler = (evt) => {
        evt.preventDefault();
        setInputValue(evt.target.value);
    }

    const inputBlurHandler = (evt) => {
        evt.preventDefault();
        setIsTouched(true);
    }

    const reset = () => {
        setIsTouched(false);
        setInputValue('');
    }
    return{
        value: inputValue,
        isTouched,
        isValid: inputValid,
        error,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
}
export default useForm;