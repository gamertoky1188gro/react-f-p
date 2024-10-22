import { useState } from "react";

export const Counter = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    };

    const reset = () => {
        setCounter(0);
    };

    return (
        <div className="container" style={{ marginTop: "5rem" }}>
            <div className="row justify-content-center">
                <div className="col-8">
                    {/* Navigation Bar */}
                    <ul className="nav nav-tabs mb-4 justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link active" href="/Counter">
                                Click Counter
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Counter@">
                                Timer
                            </a>
                        </li>
                    </ul>

                    {/* Card */}
                    <div className="card">
                        <div className="card-header">
                            Click Counter
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">You Clicked: {counter}</h5>
                            <a href="#" className="btn btn-primary" onClick={increment}>Click Up</a>
                            <a href="#" className="btn btn-danger" onClick={reset} style={{ marginLeft: "1rem" }}>Reset</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
