import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [bookResults, setBookResults] = useState([]);
    const [videoResults, setVideoResults] = useState([]);
    const [newsResults, setNewsResults] = useState([]);
    const [mapResults, setMapResults] = useState([]);
    const [financeResults, setFinanceResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('ALL');

    // Google Custom Search API key and Search Engine ID
    const apiKey = 'AIzaSyBlREWzWan1HTPXCJACm-2ofK0UT3ggt_Q';
    const searchEngineId = '55c4827a744804026';

    // YouTube API key and Google Books API key
    const youtubeApiKey = 'AIzaSyCscpuA0-X-pzGUPSiIP1uOd42Kk0Zrm9A';
    const googleBooksApiKey = 'AIzaSyCscpuA0-X-pzGUPSiIP1uOd42Kk0Zrm9A';

    // Function to truncate URL if it exceeds 20 characters
    const truncateUrl = (url) => {
        return url.length > 20 ? url.substring(0, 20) + '...' : url;
    };

    // Function to make multiple requests if needed (for up to 36 results)
    const fetchMultiple = async (url, maxResults = 36) => {
        let allResults = [];
        for (let start = 1; start <= maxResults; start += 10) {
            const paginatedUrl = `${url}&start=${start}&num=${Math.min(10, maxResults - allResults.length)}`;
            const response = await axios.get(paginatedUrl);
            allResults = allResults.concat(response.data.items || []);
            if (allResults.length >= maxResults || !response.data.items) break;
        }
        return allResults;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        // URLs for different result types (with num=36 results)
        const webSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${youtubeApiKey}&maxResults=36`;
        const booksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${googleBooksApiKey}&maxResults=36`;
        const newsSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}&tbm=nws`;
        const mapSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}&tbm=map`;
        const financeSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}+finance&key=${apiKey}&cx=${searchEngineId}`;

        try {
            // Fetching all data in parallel, handling up to 36 results for each type
            const [webResults, videosResults, booksResults, newsResults, mapsResults, financeResults] = await Promise.all([
                fetchMultiple(webSearchUrl),
                axios.get(youtubeApiUrl).then(res => res.data.items || []),
                axios.get(booksApiUrl).then(res => res.data.items || []),
                fetchMultiple(newsSearchUrl),
                fetchMultiple(mapSearchUrl),
                fetchMultiple(financeSearchUrl),
            ]);

            // Setting results to state
            setResults(webResults);
            setVideoResults(videosResults);
            setBookResults(booksResults);
            setNewsResults(newsResults);
            setMapResults(mapsResults);
            setFinanceResults(financeResults);

        } catch (error) {
            console.error('Error performing search:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Tab handling logic
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Filtering results based on the selected tab
    const renderResults = () => {
        switch (activeTab) {
            case 'ALL':
                return renderWebResults(results);
            case 'IMAGES':
                return renderImageResults(results);
            case 'VIDEOS':
                return renderVideoResults(videoResults);
            case 'NEWS':
                return renderNewsResults(newsResults);
            case 'WEB':
                return renderWebResults(results);
            case 'MAP':
                return renderMapResults(mapResults);
            case 'BOOKS':
                return renderBookResults(bookResults);
            case 'FINANCE':
                return renderFinanceResults(financeResults);
            default:
                return renderWebResults(results);
        }
    };

    // Web results with URL truncation
    const renderWebResults = (results) => (
        <div className="row">
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontSize: '1.25rem' }}>{result.title}</h5>
                                <p className="card-text">
                                    <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                        {truncateUrl(result.link)}
                                    </a>
                                </p>
                                <p className="card-text">{result.snippet}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{result.displayLink}</small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col">
                    <p className="text-center">{loading ? 'Loading results...' : 'No results found.'}</p>
                </div>
            )}
        </div>
    );

    // Other render methods remain similar with URL truncation applied where necessary
    const renderImageResults = (results) => (
        <div className="row">
            {results.length > 0 ? (
                results
                    .filter(result => result.pagemap && result.pagemap.cse_image)
                    .map((result, index) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={index}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={result.pagemap.cse_image[0].src}
                                    alt={result.title}
                                    className="img-fluid my-2"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{result.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))
            ) : (
                <div className="col">
                    <p className="text-center">{loading ? 'Loading images...' : 'No images found.'}</p>
                </div>
            )}
        </div>
    );

    const renderVideoResults = (videoResults) => (
        <div className="row">
            {videoResults.length > 0 ? (
                videoResults.map((video, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <iframe
                                width="100%"
                                height="215"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                title={video.snippet.title}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            <div className="card-body">
                                <h5 className="card-title">{video.snippet.title}</h5>
                                <p className="card-text">{video.snippet.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No videos found.</p>
            )}
        </div>
    );

    const renderBookResults = (bookResults) => (
        <div className="row">
            {bookResults.length > 0 ? (
                bookResults.map((book, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail}
                                alt={book.volumeInfo.title}
                                className="img-fluid my-2"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.volumeInfo.title}</h5>
                                <p className="card-text">{book.volumeInfo.authors?.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );

    const renderNewsResults = (newsResults) => (
        <div className="row">
            {newsResults.length > 0 ? (
                newsResults.map((news, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{news.title}</h5>
                                <p className="card-text">{news.snippet}</p>
                                <p className="card-text">
                                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                        {truncateUrl(news.link)}
                                    </a>
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{news.displayLink}</small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col">
                    <p className="text-center">{loading ? 'Loading news...' : 'No news found.'}</p>
                </div>
            )}
        </div>
    );

    const renderMapResults = (mapResults) => (
        <div className="row">
            {mapResults.length > 0 ? (
                mapResults.map((map, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{map.title}</h5>
                                <p className="card-text">{map.snippet}</p>
                                <p className="card-text">
                                    <a href={map.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                        {truncateUrl(map.link)}
                                    </a>
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{map.displayLink}</small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col">
                    <p className="text-center">{loading ? 'Loading maps...' : 'No maps found.'}</p>
                </div>
            )}
        </div>
    );

    const renderFinanceResults = (financeResults) => (
        <div className="row">
            {financeResults.length > 0 ? (
                financeResults.map((finance, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{finance.title}</h5>
                                <p className="card-text">{finance.snippet}</p>
                                <p className="card-text">
                                    <a href={finance.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                        {truncateUrl(finance.link)}
                                    </a>
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">{finance.displayLink}</small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col">
                    <p className="text-center">{loading ? 'Loading finance results...' : 'No finance results found.'}</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="container mt-5">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for anything..."
                        required
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Tabs for different categories */}
            <div className="mb-4">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'ALL' ? 'active' : ''}`}
                            onClick={() => handleTabChange('ALL')}
                        >
                            All
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'IMAGES' ? 'active' : ''}`}
                            onClick={() => handleTabChange('IMAGES')}
                        >
                            Images
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'VIDEOS' ? 'active' : ''}`}
                            onClick={() => handleTabChange('VIDEOS')}
                        >
                            Videos
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'NEWS' ? 'active' : ''}`}
                            onClick={() => handleTabChange('NEWS')}
                        >
                            News
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'WEB' ? 'active' : ''}`}
                            onClick={() => handleTabChange('WEB')}
                        >
                            Web
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'MAP' ? 'active' : ''}`}
                            onClick={() => handleTabChange('MAP')}
                        >
                            Map
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'BOOKS' ? 'active' : ''}`}
                            onClick={() => handleTabChange('BOOKS')}
                        >
                            Books
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'FINANCE' ? 'active' : ''}`}
                            onClick={() => handleTabChange('FINANCE')}
                        >
                            Finance
                        </button>
                    </li>
                </ul>
            </div>

            {/* Render the selected tab's results */}
            <div>{renderResults()}</div>
        </div>
    );
};

export default SearchComponent;
