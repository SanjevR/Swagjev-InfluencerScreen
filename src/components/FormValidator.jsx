import { useState, useEffect } from "react";

export default function FormValidator({ formData, validationRules, validateOnSubmit }) {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (validateOnSubmit) {
            validateForm();
        }
    }, [formData, validateOnSubmit]);

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        for (const field in validationRules) {
            if (validationRules[field].required) {
                if (
                    (validationRules[field].isArray && (!formData[field] || formData[field].length === 0)) ||
                    (!validationRules[field].isArray && !formData[field])
                ) {
                    formIsValid = false;
                    errors[field] = validationRules[field].message;
                }
                if (validationRules[field].isNumber && !Number.isInteger(formData[field])) {
                    formIsValid = false;
                    errors[field] = validationRules[field].message;
                }
            }
        }

        setErrors(errors);
        setIsValid(formIsValid);
    };

    return { errors, isValid };
}
