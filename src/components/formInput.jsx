import React, { useState } from "react";

export function SelectInput({ name, options, value, onChange, error }) {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="input-container">
            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => setFocused(true)}
                focused={focused.toString()}
            >
                {options.map((option, i) => (
                    <option key={"option" + i} value={option.value}>
                        {option.title}
                    </option>
                ))}
            </select>
            <span className="input-error">{error}</span>
        </div>
    );
}

export function BaseInput({ name, type, value, placeholder, onChange, error }) {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="input-container" >
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => setFocused(true)}
                focused={focused.toString()}
            />
            <span className="input-error">{error}</span>
        </div>
    );
}


export function TextAreaInput({ name, maxlength, value, placeholder, onChange, error }) {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="input-container">
        <textarea
            name={name}
            placeholder={placeholder}
            maxLength={maxlength}
            value={value}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
        />
            <span className="input-error">{error}</span>
        </div>
    );
}
