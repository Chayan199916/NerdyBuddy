import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StepProgress from './StepProgress';

const Step1 = ({ nextStep, handleChange, values }) => {
    // Form validation with Formik and Yup
    const formik = useFormik({
        initialValues: { name: '', email: '' },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: (values) => {
            handleChange(values);
            nextStep();
        },
    });

    return (
        <div className="onboarding-step">
            <StepProgress step={1} />
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && <div className="error">{formik.errors.name}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <div className="error">{formik.errors.email}</div>}
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default Step1;
