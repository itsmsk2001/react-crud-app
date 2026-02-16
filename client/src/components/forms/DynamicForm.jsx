import React, { useState, useEffect } from 'react';
import { validateForm, validateField } from '../../utils/validation';

const DynamicForm = ({ fields, initialValues, onSubmit, submitLabel = 'Submit' }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        } else {
            const initial = {};
            fields.forEach(field => {
                initial[field.name] = '';
            });
            setFormData(initial);
        }
    }, [initialValues, fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value, fields);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData, fields);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            {fields.map(field => (
                <div key={field.name} className="mb-4">
                    <label htmlFor={field.name} className="form-label">
                        {field.label} {field.required && <span className="text-danger">*</span>}
                    </label>
                    <div className="input-group">
                        <input
                            type={field.type}
                            className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                            <div className="invalid-feedback">
                                {errors[field.name]}
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div className="d-grid gap-2 mt-5">
                <button type="submit" className="btn btn-primary btn-lg">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
};

export default DynamicForm;
