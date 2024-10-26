import { useEffect, useState } from "react";

export const Emoji_Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [emojis, setEmojis] = useState([]);
    const [filteredEmojis, setFilteredEmojis] = useState([]);
    const [isCopying, setIsCopying] = useState(false); // State to prevent spamming copy

    // Fetch emojis from the JSON file
    const fetchEmojis = () => {
        fetch("https://raw.githubusercontent.com/chalda-pnuzig/emojis.json/refs/heads/master/src/list.with.images.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setEmojis(data.emojis); // Access the emojis array
                setFilteredEmojis(data.emojis); // Initialize with all emojis
            })
            .catch((error) => {
                console.error("Error fetching emojis:", error);
                alert(error);
            });
    };

    useEffect(() => {
        fetchEmojis();
    }, []);

    // Update filtered emojis based on search term
    useEffect(() => {
        const results = emojis.filter((emoji) => {
            return (
                emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emoji.emoji.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emoji.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emoji.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredEmojis(results);
    }, [searchTerm, emojis]);

    // Clipboard logic with debounce to prevent spamming
    const copyToClipboard = (emoji) => {
        if (isCopying) return;  // Prevent action if already copying

        setIsCopying(true);  // Set copying state to true
        navigator.clipboard.writeText(emoji)
            .then(() => {
                alert(`Item copied: ${emoji}`);
            })
            .catch((error) => {
                console.error('Failed to copy to clipboard:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsCopying(false); // Allow copying again after 1 second
                }, 1000);  // Set a 1 second debounce
            });
    };

    // Handle progress bar functionality
    const startProgressBar = () => {
        let progressBar = document.getElementById('progressBar');
        let progress = 1;
        let interval = setInterval(() => {
            progress += 0.1;
            progressBar.style.width = (progress / 30 * 100) + '%'; // Convert progress to percentage
            progressBar.setAttribute('aria-valuenow', progress.toFixed(1)); // Update aria-valuenow for accessibility
            progressBar.textContent = progress.toFixed(1) + ' / 30'; // Display progress value in the bar

            if (progress >= 30) {
                clearInterval(interval);
            }
        }, 100); // Update every 100 ms
    };

    return (
        <>
            <h1>
                <marquee direction="right">
                    <mark>Emoji Search</mark>
                </marquee>
            </h1>

            <div className="container my-4" id="Emoji_Search">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for an emoji"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="row mt-3">
                    {filteredEmojis.length > 0 ? (
                        filteredEmojis.map((emoji, index) => (
                            <div
                                key={index}
                                className="col-sm-6 col-md-4 col-lg-3 mb-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => copyToClipboard(emoji.emoji)}
                                title={`Click to copy ${emoji.name} (${emoji.emoji})`}
                            >
                                <div className="card h-100">
                                    <img src={emoji.images.google} className="card-img-top" alt={emoji.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{emoji.name} ({emoji.emoji})</h5>
                                        <p className="card-text">
                                            Category: {emoji.category}<br />
                                            Subcategory: {emoji.subcategory}
                                        </p>
                                        <p className="card-text">{`Support: ${JSON.stringify(emoji.support)}`}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No emojis found! If the internet is slow, it may take some time to load. Please wait 30 seconds, and if it still doesn’t load, click reload. If the reload button doesn’t work, open devtools, go to the network tab, or contact the site owner! 
<button onClick={() => { fetchEmojis(); startProgressBar(); }}>Reload</button></p>

                    )}
                    <div className="progress">
                        <div id="progressBar" className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="30"></div>
                    </div>
                </div>
            </div>
        </>
    );
};
