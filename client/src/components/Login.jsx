import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = ({ isOpen, onClose }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values) => {
        const { username, password } = values;

        const loginData = {
            username,
            password,
        };

        try {
            const response = await fetch('https://vault-reg.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful');
                onClose();
                navigate('/admin-dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while logging in');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
            transition: 'opacity 0.3s ease-in-out',
            opacity: isOpen ? 1 : 0,
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center',
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '1.5rem',
                }}>Login</h2>

                {error && <p style={{ color: '#e53e3e', marginBottom: '1rem' }}>{error}</p>}

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Field
                                type="text"
                                name="username"
                                placeholder="Username"
                                style={{
                                    border: '1px solid #cbd5e0',
                                    padding: '0.75rem',
                                    borderRadius: '0.25rem',
                                    width: '100%',
                                    marginBottom: '1rem',
                                }}
                            />
                            <ErrorMessage name="username" component="div" style={{ color: '#e53e3e', marginBottom: '1rem' }} />

                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                style={{
                                    border: '1px solid #cbd5e0',
                                    padding: '0.75rem',
                                    borderRadius: '0.25rem',
                                    width: '100%',
                                    marginBottom: '1rem',
                                }}
                            />
                            <ErrorMessage name="password" component="div" style={{ color: '#e53e3e', marginBottom: '1rem' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    style={{
                                        backgroundColor: '#e53e3e',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.25rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: '#3182ce',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.25rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
