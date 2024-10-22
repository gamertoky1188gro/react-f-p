import { useState } from 'react';

export const Calculator = ({ family1, family2, family3, family4, family5 }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [isResultShown, setIsResultShown] = useState(false);

    const handleClick = (value) => {
        // If "=" is clicked, calculate the result
        if (value === "=") {
            try {
                const calculatedResult = eval(input);
                setResult(calculatedResult);
                setInput(calculatedResult.toString());
                setIsResultShown(true); // Set flag to true after calculation
            } catch (error) {
                setResult("Error: " + error);
                setInput("Error: " + error);
                console.log("Error: " + error);
                alert("Invalid expression: " + error);
            }
        }
        // If "AC" is clicked, clear everything
        else if (value === "AC") {
            setInput('');
            setResult('');
            setIsResultShown(false); // Reset flag
        }
        // If "DEL" is clicked, delete the last character from input
        else if (value === "DEL") {
            setInput(input.slice(0, -1));
        }
        // If an operator is clicked after a result, replace the result with the operator
        else if (isResultShown && ["+", "-", "*", "/"].includes(value)) {
            setInput(result + value);
            setIsResultShown(false);
        }
        // Prevent multiple consecutive operators
        else if (
            ["+", "-", "*", "/"].includes(value) &&
            ["+", "-", "*", "/"].includes(input.slice(-1))
        ) {
            return;
        }
        // If a number or operator is clicked, append it to input
        else {
            if (isResultShown) {
                setInput(value); // Replace result with new input if a number is clicked
                setIsResultShown(false); // Reset the flag
            } else {
                setInput(input + value);
            }
        }
    };

    return (
        <>
            <h1><marquee><h1><mark>BASIC CALCULATOR</mark></h1></marquee></h1>

            {/* Input result box with modern styling */}
            <div className="input-group my-4 w-75 mx-auto">
                <span className="input-group-text bg-dark text-light">Result:</span>
                <input
                    type="text"
                    className="form-control text-end bg-light"
                    aria-label="result"
                    style={{ fontSize: '1.5rem', height: '3rem' }}
                    value={input !== '' ? input : "0"}
                    readOnly
                />
            </div>

            {/* Calculator button grid */}
            <div id="Calculator" className="d-flex flex-column align-items-center mt-4">
                <div className="row w-75 mb-3">
                    {family1.map((meow, index) => (
                        <button
                            key={index}
                            type="button"
                            className="col btn btn-info m-1 py-3 fs-4"
                            onClick={() => handleClick(meow)}
                        >
                            {meow}
                        </button>
                    ))}
                </div>
                <div className="row w-75 mb-3">
                    {family2.map((meow, index) => (
                        <button
                            key={index}
                            type="button"
                            className="col btn btn-secondary m-1 py-3 fs-4"
                            onClick={() => handleClick(meow)}
                        >
                            {meow}
                        </button>
                    ))}
                </div>
                <div className="row w-75 mb-3">
                    {family3.map((meow, index) => (
                        <button
                            key={index}
                            type="button"
                            className="col btn btn-success m-1 py-3 fs-4"
                            onClick={() => handleClick(meow)}
                        >
                            {meow}
                        </button>
                    ))}
                </div>
                <div className="row w-75 mb-3">
                    {family4.map((meow, index) => (
                        <button
                            key={index}
                            type="button"
                            className="col btn btn-danger m-1 py-3 fs-4"
                            onClick={() => handleClick(meow)}
                        >
                            {meow}
                        </button>
                    ))}
                </div>
                <div className="row w-75 mb-3">
                    {family5.map((meow, index) => (
                        <button
                            key={index}
                            type="button"
                            className="col btn btn-warning m-1 py-3 fs-4"
                            onClick={() => handleClick(meow)}
                        >
                            {meow}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};
