import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/Api';
import AuthContext from '../../context/AuthContext';
import '../../../src/styles/global.css';

const Login = () => {
    const { login: setUser } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await login(values);
                setUser(response.user);
                console.log('Login successful:', response);
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
    });

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
