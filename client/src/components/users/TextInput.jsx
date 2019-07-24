import React from 'react';

const TextInput = props => {
        let blockClassname = "text-input-block" + (props.error ? " input-error" : "");
        let textField = { name: props.name };
        return (
            <div className={blockClassname}>
                <input onBlur={(e) => props.handleValidate(textField)}
                       ref={input => textField.input = input}
                       required
                       id={props.name}
                       name={props.name}
                       onChange={(e) => props.onPropertyChange({name: props.name, value: textField.input.value})}
                       className="text-input"
                       type={props.type} />
                <label className="input-label" htmlFor={props.name}>{props.placeholder}</label>
                <label className="error-input-label" htmlFor={props.name}>{props.error || null}</label>
            </div>
        );
};

export default TextInput;
