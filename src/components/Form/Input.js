import React from "react";

const Input = (props) => {
    return(
        <>
            <div className={props.isTouched && props.error ? 'input-error' : null}>
                <label>{props.label} </label>
                <input type={props.type} 
                    value={props.value}
                    onBlur={props.inputBlurHandler}
                    onChange={props.inputChangeHandler}
                    placeholder={props.placeholder}
                />
            </div>
            {props.error && <p>Enter valid {props.label}</p>}
        </>
    )
}
export default Input;