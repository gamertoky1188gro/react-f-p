import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Image_Compressor = () => {
    const [compressedFiles, setCompressedFiles] = useState([]); // Store compressed files
    const [originalFiles, setOriginalFiles] = useState([]); // Store original files
    const [compressionMethod, setCompressionMethod] = useState('quality'); // Track selected method
    const [quality, setQuality] = useState(0.8); // Quality state
    const [percentage, setPercentage] = useState(50); // Percentage state
    const [fileSize, setFileSize] = useState(1); // File size state
    const [unit, setUnit] = useState('mb'); // Unit for file size

    // Function to handle image compression
    const compressImages = async () => {
        try {
            const compressedFilesArray = await Promise.all(originalFiles.map(async (file) => {
                let compressedFile;

                // Option 1: Reduce by Quality
                if (compressionMethod === 'quality') {
                    compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, initialQuality: quality });
                    console.log(`Compressed by quality: ${quality}`);
                }

                // Option 2: Reduce by Percentage (reduce dimensions)
                else if (compressionMethod === 'percentage') {
                    const maxWidthOrHeight = Math.floor(file.width * (percentage / 100));
                    compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight, useWebWorker: true });
                    console.log(`Compressed by percentage: ${percentage}%`);
                }

                // Option 3: Reduce by File Size (target size in MB/KB/GB/TB)
                else if (compressionMethod === 'filesize') {
                    const targetSizeMB = convertToMB(fileSize, unit);
                    compressedFile = await imageCompression(file, { maxSizeMB: targetSizeMB, useWebWorker: true });
                    console.log(`Compressed to match size: ${fileSize} ${unit.toUpperCase()}`);
                }

                return compressedFile;
            }));

            setCompressedFiles(compressedFilesArray); // Set all compressed files
            console.log('Image compression successful');
            alert('Image compression successful');
        } catch (error) {
            console.error('Error during image compression:', error);
            alert('Error during image compression:', error);
        }
    };

    // Function to handle multiple file uploads
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files); // Convert to array
        setOriginalFiles(files); // Store all uploaded files
    };

    // Function to handle image download for multiple files
    const downloadImages = () => {
        compressedFiles.forEach((file, index) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = `compressed-image-${index + 1}.jpg`;
            link.click();
        });
    };

    // Helper function to convert file size to MB
    const convertToMB = (size, unit) => {
        const units = {
            kb: 0.001,
            mb: 1,
            gb: 1024,
            tb: 1024 * 1024
        };
        return size * (units[unit.toLowerCase()] || 1);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="card-title mb-4">Image Compressor</h2>

                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        multiple // Allow multiple file uploads
                        onChange={handleFileUpload}
                    />
                </div>

                <div className="mb-3">
                    <h5>Select Compression Method</h5>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="compressionMethod"
                            id="compressQuality"
                            value="quality"
                            checked={compressionMethod === 'quality'}
                            onChange={() => setCompressionMethod('quality')}
                        />
                        <label className="form-check-label" htmlFor="compressQuality">
                            Compress by Quality
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="compressionMethod"
                            id="compressPercentage"
                            value="percentage"
                            checked={compressionMethod === 'percentage'}
                            onChange={() => setCompressionMethod('percentage')}
                        />
                        <label className="form-check-label" htmlFor="compressPercentage">
                            Compress by Percentage
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="compressionMethod"
                            id="compressSize"
                            value="filesize"
                            checked={compressionMethod === 'filesize'}
                            onChange={() => setCompressionMethod('filesize')}
                        />
                        <label className="form-check-label" htmlFor="compressSize">
                            Compress by File Size
                        </label>
                    </div>
                </div>

                {/* Show input based on selected compression method */}
                {compressionMethod === 'quality' && (
                    <div className="mb-3">
                        <label htmlFor="qualityInput">Quality (0.1 - 1):</label>
                        <input
                            type="number"
                            className="form-control"
                            id="qualityInput"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={quality}
                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                        />
                    </div>
                )}

                {compressionMethod === 'percentage' && (
                    <div className="mb-3">
                        <label htmlFor="percentageInput">Percentage (10% - 100%):</label>
                        <input
                            type="range"
                            className="form-range"
                            id="percentageInput"
                            min="10"
                            max="100"
                            value={percentage}
                            onChange={(e) => setPercentage(parseInt(e.target.value))}
                        />
                        <span>{percentage}%</span>
                    </div>
                )}

                {compressionMethod === 'filesize' && (
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="fileSizeInput">File Size:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="fileSizeInput"
                                min="1"
                                value={fileSize}
                                onChange={(e) => setFileSize(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="unitSelect">Unit:</label>
                            <select
                                className="form-select"
                                id="unitSelect"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="kb">KB</option>
                                <option value="mb">MB</option>
                                <option value="gb">GB</option>
                                <option value="tb">TB</option>
                            </select>
                        </div>
                    </div>
                )}

                <button className="btn btn-primary w-100 mb-3" onClick={compressImages}>
                    Compress Images
                </button>

                {compressedFiles.length > 0 && (
                    <button className="btn btn-success w-100" onClick={downloadImages}>
                        Download Compressed Images
                    </button>
                )}
            </div>
        </div>
    );
};
