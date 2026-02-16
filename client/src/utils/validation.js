export const validateField = (name, value, fieldsConfig) => {
    const fieldConfig = fieldsConfig.find(f => f.name === name);
    if (!fieldConfig) return null;

    if (fieldConfig.required && !value) {
        return `${fieldConfig.label} is required`;
    }

    if (fieldConfig.validation && value) {
        return fieldConfig.validation(value);
    }

    return null;
};

export const validateForm = (formData, fieldsConfig) => {
    const errors = {};
    fieldsConfig.forEach(field => {
        const error = validateField(field.name, formData[field.name], fieldsConfig);
        if (error) {
            errors[field.name] = error;
        }
    });
    return errors;
};
