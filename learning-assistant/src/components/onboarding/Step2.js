import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StepProgress from './StepProgress';

const Step2 = ({ prevStep, nextStep, handleChange, values }) => {
    const formik = useFormik({
        initialValues: { preference: '' },
        validationSchema: Yup.object({
            preference: Yup.string().required('Preference is required'),
        }),
        onSubmit: (values) => {
            handleChange(values);
            nextStep();
        },
    });

    return (
        <div className="onboarding-step">
            <StepProgress step={2} />
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Preference</label>
                    <input
                        type="text"
                        name="preference"
                        onChange={formik.handleChange}
                        value={formik.values.preference}
                    />
                    {formik.errors.preference && <div className="error">{formik.errors.preference}</div>}
                </div>
                <button type="button" onClick={prevStep}>Back</button>
                <button type="submit">Next</button>
            </form>
        </div>
    );
};

export default Step2;
