import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user._id !== id));
            } catch (err) {
                alert('Failed to delete user');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Users</h2>
                <div className="d-flex justify-content-between align-items-end">
                    <p className="page-subtitle mb-0">Manage system users</p>

                    <div className="d-flex gap-2">
                        <Link to="/add" className="add-btn">
                            <i className="bi bi-plus"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="user-grid">
                    {users.map(user => {
                        const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();

                        return (
                            <div key={user._id} className="user-card">

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="card-avatar" style={{ backgroundColor: '#a78bfa' }}>
                                        {initials}
                                    </div>
                                    <div className="card-title mb-0">
                                        {user.firstName} {user.lastName}
                                    </div>
                                </div>

                                <div className="card-info">
                                    <i className="bi bi-envelope"></i>
                                    {user.email}
                                </div>
                                <div className="card-info">
                                    <i className="bi bi-telephone"></i>
                                    {user.phone}
                                </div>

                                <div className="card-actions">
                                    <Link to={`/edit/${user._id}`} className="btn-icon">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button onClick={() => handleDelete(user._id)} className="btn-icon delete">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {users.length === 0 && !loading && !error && (
                <div className="text-center py-5 text-muted">
                    No users found. Click the + button to add one.
                </div>
            )}
        </div>
    );
};

export default UserList;
