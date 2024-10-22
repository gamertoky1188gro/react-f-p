import { useRef, useState } from "react";

export const Snap_Shot = () => {
    const [pv, setPV] = useState([]);
    const inputRef = useRef(null);  // Using ref to access input value

    function FeTcH() {
        const query = inputRef.current.value.trim();  // Accessing input value via ref

        if (!query) {
            alert("Please enter a search term.");  // Validation for empty input
            return;
        }

        const encodedQuery = encodeURIComponent(query);  // URL encode the query

        fetch(`https://api.pexels.com/v1/search?query=${encodedQuery}`, {
            headers: {
                Authorization: 'Z7hvd4XdPZQ7Tl1JeSM9xnFFJ18BiNhpDYnyilaikqG46jkRgLSe3xN2'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.photos && data.photos.length) {
                    setPV(data.photos);  // Assuming the API returns an array of photos
                } else {
                    setPV([]);  // Clear photos if no results
                }
            })
            .catch(error => {
                console.log(error);
                alert("Error fetching data: " + error.message);
            });
    }


    function downloadFile(url, filename) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to download: ${response.statusText}`);
                }
                return response.blob();  // Convert the response to a blob
            })
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = filename;
                document.body.appendChild(link);  // Append to body to ensure it works in Firefox
                link.click();
                link.remove();  // Clean up the link element
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <>
            <h1>
                <marquee direction="right">
                    <mark>Emoji Search</mark>
                </marquee>
            </h1>

            <div className="input-group mb-3">
            <label htmlFor="searchInput" className="form-label">Search for Images</label>
            <input
                className="form-control"
                list="datalistOptions"
                id="searchInput"
                placeholder="Type to search..."
                ref={inputRef}
            />
            <datalist id="datalistOptions">
                <option value="Cat" />
                <option value="New York" />
                <option value="Flower" />
                <option value="Background" />
                <option value="Gaming" />
                <option value="Programming" />
                <option value="Ethical Hacking" />
            </datalist>
            <button onClick={FeTcH} className="btn btn-primary">Search</button>
            </div>

            {pv.length > 0 ? (
                <div className="row">
                    {pv.map((photo, index) => (
                        <div key={index} className="col-md-4" style={{ padding: "10px" }}>
                            <div className="card">
                                <img
                                    src={photo.src.original}
                                    className="card-img-top"
                                    alt={photo.alt}
                                    style={{ height: "300px", objectFit: "cover" }} // CSS to control height and fit
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{photo.alt}</h5>
                                    <p className="card-text">{`Photography by ${photo.photographer}`}</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                            {`Avg color: ${photo.avg_color}`}
                                        </small>
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => downloadFile(photo.src.original, "WhatIsYourName?.jpeg")}
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nothing found, bro! did u searched?</p>
            )}
        </>
    );
};
