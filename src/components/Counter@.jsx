import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

export const Countimer = () => {
    const [time, setTime] = useState(0); // Time is in milliseconds
    const [running, setRunning] = useState(false);

    const start = () => {
        setRunning(true);
    };

    const stop = () => {
        setRunning(false);
    };

    const reset = () => {
        setTime(0);
        setRunning(false);
    };

    useEffect(() => {
        let timer;
        if (running) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // Increment time by 10ms
            }, 10);
        }
        return () => clearInterval(timer);
    }, [running]);

    // Function to format time into days, hours, minutes, seconds, and milliseconds
    const formatTime = (ms) => {
        let milliseconds = ms % 1000;
        let seconds = Math.floor(ms / 1000) % 60;
        let minutes = Math.floor(ms / (1000 * 60)) % 60;
        let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
        let days = Math.floor(ms / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`;
    };

    return (
        <div className="container" style={{ marginTop: "5rem" }}>
            <div className="row justify-content-center">
                <div className="col-8">
                    {/* Navigation Bar */}
                    <ul className="nav nav-tabs mb-4 justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Counter">
                                Click Counter
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/Timer">
                                Timer
                            </Link>
                        </li>
                    </ul>

                    {/* Card */}
                    <div className="card">
                        <div className="card-header">Timer</div>
                        <div className="card-body">
                            <h5 className="card-title">{formatTime(time)}</h5>
                            <button className="btn btn-success" onClick={start}>
                                Start
                            </button>
                            <button
                                className="btn btn-danger mx-3"
                                onClick={stop}
                                style={{ marginLeft: "1rem" }}
                            >
                                Stop
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={reset}
                                style={{ marginLeft: "1rem" }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
