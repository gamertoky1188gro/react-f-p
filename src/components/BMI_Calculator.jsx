import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const BMI_Calculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [message, setMessage] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();
        if (weight > 0 && height > 0) {
            const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
            setBmi(bmiValue);
            setMessage(getBmiCategory(bmiValue));
        } else {
            alert('Please enter valid values for weight and height.');
        }
    };

    const getBmiCategory = (bmiValue) => {
        if (bmiValue < 18.5) return 'Underweight';
        if (bmiValue >= 18.5 && bmiValue < 24.9) return 'Normal weight';
        if (bmiValue >= 25 && bmiValue < 29.9) return 'Overweight';
        return 'Obese';
    };

    const resetForm = () => {
        setWeight('');
        setHeight('');
        setBmi(null);
        setMessage('');
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h3 className="text-center">BMI Calculator</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={calculateBMI}>
                        <div className="form-group mb-3">
                            <label htmlFor="weight">Weight (kg):</label>
                            <input
                                type="number"
                                className="form-control"
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Enter your weight"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="height">Height (cm):</label>
                            <input
                                type="number"
                                className="form-control"
                                id="height"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Enter your height"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Calculate BMI</button>
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={resetForm}>Reset</button>
                    </form>
                    {bmi && (
                        <div className="result mt-4 text-center">
                            <h5>Your BMI: {bmi}</h5>
                            <p className="fw-bold">{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
