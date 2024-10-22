import React, { useState, useEffect } from "react";

export const SheetSystem = () => {
    const [nv, setnv] = useState([]); // Name values
    const [rv, setrv] = useState([]); // Roll values
    const [av, setav] = useState([]); // Age values
    const [dv, setdv] = useState([]); // Date of Birth values
    const [isVisible, setIsVisible] = useState("hidden");
    const [cv, setcv] = useState([]); // Class values
    const [pv, setpv] = useState([]); // Phone Number values
    const [fv, setfv] = useState([]); // Father's Name values
    const [gv, setgv] = useState([]); // Gender values

    const spreadsheetId = '1tVdSzXsM0ddWvOHozWFmm5kqAbPeC_XCriqdTTi2N4E';

    // Functions to fetch data from API and update state
    function f1() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Name`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setnv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f2() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Roll`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setrv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f3() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Age`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setav(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f4() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Date Of Birth`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setdv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f5() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Class`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setcv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f6() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Phone Number`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setpv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f7() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Father Name`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setfv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    function f8() {
        const url = `http://localhost:8080/api/sheets/filterValuesVertical?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000&filterValue=Gender`;

        fetch(url, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setgv(data);
            })
            .catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        // Fetch all data once when the component loads
        f1();
        f2();
        f3();
        f4();
        f5();
        f6();
        f7();
        f8();
    }, []);

    function posttodata(name, roll, age, date_of_birth, classes, phone_number, father_name, gender) {
        const data = [name, roll, age, date_of_birth, classes, phone_number, father_name, gender];

        fetch(`http://localhost:8080/api/sheets/addDataToNextAvailableRow?spreadsheetId=${spreadsheetId}&range=Sheet1!1:1000`, {
            method: 'POST', // POST request to send data
            headers: {
                'Content-Type': 'application/json', // Ensure the content type is set to JSON
            },
            body: JSON.stringify(data), // Convert the array to a JSON string
        })
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                console.log('Success:', data); // Handle success
                alert('Success', data)
            })
            .catch((error) => {
                console.error('Error:', error); // Handle errors
                alert('Error:', error); // Handle errors
            });

        setTimeout(() => {
            f1();
            f2();
            f3();
            f4();
            f5();
            f6();
            f7();
            f8();
        }, 1000)

        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    return (
        <div className="container my-5">
            <style>
                {`
                    .border-glow {
                        border: 2px solid #9560e8;
                        border-radius: 5px;
                        animation: borderGlow 1.5s ease-in-out infinite alternate;
                    }

                    .border-glow:hover {
                        box-shadow: 0 0 30px rgba(149, 96, 232, 0.8), 
                                    0 0 50px rgba(149, 96, 232, 0.7), 
                                    0 0 70px rgba(149, 96, 232, 0.5), 
                                    0 0 90px rgba(149, 96, 232, 0.4);
                    }

                    @keyframes borderGlow {
                        0% {
                            box-shadow: 0 0 10px #9560e8, 
                                        0 0 20px #9560e8, 
                                        0 0 30px #9560e8, 
                                        0 0 40px #9560e8, 
                                        0 0 50px #9560e8;
                        }
                        100% {
                            box-shadow: 0 0 20px #d39cfc, 
                                        0 0 30px #d39cfc, 
                                        0 0 40px #d39cfc, 
                                        0 0 50px #d39cfc, 
                                        0 0 60px #d39cfc;
                        }
                    }

                    .glow {
                        font-size: 80px;
                        color: #fff;
                        text-align: center;
                        -webkit-animation: glow 1s ease-in-out infinite alternate;
                        -moz-animation: glow 1s ease-in-out infinite alternate;
                        animation: glow 1s ease-in-out infinite alternate;
                    }

                    @-webkit-keyframes glow {
                        from {
                            text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #9560e8, 0 0 40px #9560e8, 0 0 50px #9560e8, 0 0 60px #9560e8, 0 0 70px #9560e8;
                        }
                        to {
                            text-shadow: 0 0 20px #fff, 0 0 30px #d39cfc, 0 0 40px #d39cfc, 0 0 50px #d39cfc, 0 0 60px #d39cfc, 0 0 70px #d39cfc, 0 0 80px #d39cfc;
                        }
                    }
                `}
            </style>

            <div className="card shadow-lg p-4 bg-body-tertiary rounded border-glow" style={{border: "1px solid #9560e8"}}>
                <div className="card-header text-center">Student Form</div>
                <div className="card-body">
                    <form>
                        {/* Full Name */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="name" className="form-label" style={{marginTop: "8.5px"}}>Full
                                    Name:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="name" type="text" autoComplete="off" className="form-control"
                                       placeholder="HASAN MAHAMUD" style={{marginTop: "4px"}} required id="name"/>
                            </div>
                        </div>

                        {/* Roll */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="roll" className="form-label" style={{marginTop: "8.5px"}}>Roll:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="roll" type="text" autoComplete="off" className="form-control"
                                       placeholder="1234" style={{marginTop: "4px"}} required id="roll"/>
                            </div>
                        </div>

                        {/* Age */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="age" className="form-label" style={{marginTop: "8.5px"}}>Age:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="age" type="number" autoComplete="off" className="form-control"
                                       placeholder="18" style={{marginTop: "4px"}} required id="age"/>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="dob" className="form-label" style={{marginTop: "8.5px"}}>Date of
                                    Birth:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="dob" type="date" autoComplete="off" className="form-control"
                                       style={{marginTop: "4px"}} required id="dob"/>
                            </div>
                        </div>

                        {/* Class */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="class" className="form-label"
                                       style={{marginTop: "8.5px"}}>Class:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="class" type="text" autoComplete="off" className="form-control"
                                       placeholder="10" style={{marginTop: "4px"}} required id="class"/>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="phone" className="form-label" style={{marginTop: "8.5px"}}>Phone
                                    Number:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="phone" type="tel" autoComplete="off" className="form-control"
                                       placeholder="0123456789" style={{marginTop: "4px"}} required id="phone"/>
                            </div>
                        </div>

                        {/* Father's Name */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="father" className="form-label" style={{marginTop: "8.5px"}}>Father's
                                    Name:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="father" type="text" autoComplete="off" className="form-control"
                                       placeholder="Father's Name" style={{marginTop: "4px"}} required id="fn"/>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="row shadow-lg p-4 bg-body-tertiary rounded border-glow"
                             style={{border: "1px solid #9560e8"}}>
                            <div className="col rounded" style={{border: "1px solid #9560e8"}}>
                                <label htmlFor="gender" className="form-label"
                                       style={{marginTop: "8.5px"}}>Gender:</label>
                            </div>
                            <div className="col-6 rounded" style={{border: "1px solid #9560e8", height: "3rem"}}>
                                <input name="gender" type="text" autoComplete="off" className="form-control"
                                       placeholder="male/female" style={{marginTop: "4px"}} required id="gender"/>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="button" // Changed to type "button" to prevent form submission before handling the onClick
                                className="btn btn-primary"
                                onClick={() => {
                                    posttodata(
                                        document.getElementById("name").value,
                                        document.getElementById("roll").value,
                                        document.getElementById("age").value,
                                        document.getElementById("dob").value,
                                        document.getElementById("class").value,
                                        document.getElementById("phone").value,
                                        document.getElementById("fn").value,
                                        document.getElementById("gender").value
                                    );
                                }} // Removed extra closing parenthesis here
                                style={{marginTop: "20px"}}
                            >
                                Submit
                            </button>

                        </div>
                    </form>
                </div>

                <div className="card-footer text-center">
                    <button className="btn btn-primary" style={{marginTop: "20px"}}
                            onClick={() => setIsVisible("visible")}>View All Students
                    </button>
                </div>
            </div>

            <div className="card-body" id="lolmeow"
                 style={{border: "1px solid #9560e8", marginTop: "2rem", visibility: isVisible}}>
                <div className="card mx-auto shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow"
                     style={{width: "81rem", backgroundColor: "#f8f9fa"}}>
                    <div className="card-header text-center">View All Students</div>

                    <div className="card-body" style={{border: "1px solid #9560e8"}}>
                        <div className="container text-center shadow-lg p-4 bg-body-tertiary rounded border-glow">
                            <div
                                className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow">
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">NAME:</div>*/}
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">ROLL:</div>*/}
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">AGE:</div>*/}
                            </div>

                            {nv.map((name, index) => (
                                <div
                                    className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow"
                                    key={index}>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{name}</div>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{rv[index]}</div>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{av[index]}</div>
                                </div>
                            ))}

                            <hr/>

                            <div
                                className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow">
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">DATE OF BIRTH:*/}
                                {/*</div>*/}
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">CLASS:</div>*/}
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">PHONE NUMBER:*/}
                                {/*</div>*/}
                            </div>

                            {dv.map((dob, index) => (
                                <div
                                    className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow"
                                    key={index}>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{dob}</div>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{cv[index]}</div>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{pv[index]}</div>
                                </div>
                            ))}

                            <hr/>

                            <div
                                className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow">
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">FATHER'S NAME:*/}
                                {/*</div>*/}
                                {/*<div className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">GENDER:</div>*/}
                            </div>

                            {fv.map((father, index) => (
                                <div
                                    className="row align-items-start border-glow shadow-lg p-4 bg-body-tertiary rounded border-glow"
                                    key={index}>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{father}</div>
                                    <div
                                        className="col shadow-lg p-4 bg-body-tertiary rounded border-glow border-glow">{gv[index]}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};