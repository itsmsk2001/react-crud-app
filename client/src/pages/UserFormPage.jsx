import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicForm from '../components/forms/DynamicForm';
import { createUser, getUser, updateUser } from '../services/api';
import { userFields } from '../config/fields';

const UserFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchUser();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const data = await getUser(id);
            setInitialValues(data);
        } catch (err) {
            setError('Failed to fetch user details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await updateUser(id, formData);
                alert('User updated successfully');
            } else {
                await createUser(formData);
                alert('User created successfully');
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert(`Failed to ${isEditMode ? 'update' : 'create'} user: ${err.response?.data?.message || err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="form-container">
            <div className="mb-4">
                <button onClick={() => navigate('/')} className="btn btn-link text-decoration-none p-0 text-muted">
                    <i className="bi bi-arrow-left me-1"></i> Back to List
                </button>
            </div>

            <div className="form-card">
                <h3 className="form-title">{isEditMode ? 'Edit User' : 'Create New User'}</h3>

                <DynamicForm
                    fields={userFields}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    submitLabel={isEditMode ? 'Update User' : 'Create User'}
                />
            </div>
        </div>
    );
};

export default UserFormPage;
