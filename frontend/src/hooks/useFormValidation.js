import { useEffect, useMemo, useState } from "react";

export default function useFormValidation(initialValues, validationRules) {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState(initialValues)
    const [isFormValid, setIsFormValid] = useState(false);

    const compileRules = useMemo(() => {
        const entries = Object.entries(validationRules).map(([field, pattern]) => [field, new RegExp(pattern, "u")]);
        return Object.fromEntries(entries);
    }, [validationRules])
    useEffect(() => {
        setValues(initialValues);
    }, [initialValues])
    useEffect(() => {
        let valid = true;
        const newErrors = {}
        Object.keys(validationRules).forEach((field) => {
            const value = values[field] || ""
            const rule = compileRules[field]
            if (!rule.test(value)) {
                newErrors[field] = true
                valid = false
            }
        })
        setErrors(newErrors)
        setIsFormValid(valid)
    }, [values, validationRules]);

    return {
        errors,
        values,
        setValues,
        isFormValid
    };
}