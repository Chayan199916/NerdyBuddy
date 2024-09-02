import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/Api';
import '../../../src/styles/global.css';


const Register = () => {
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await register(values);
                console.log('Registration successful:', response);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        },
    });

    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                {formik.errors.name && <div className="error">{formik.errors.name}</div>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password && <div className="error">{formik.errors.password}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
