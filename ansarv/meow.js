const express = require('express');
const multer = require('multer');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 7000;
const uploadsDir = path.join(__dirname, 'uploads');

app.use(cors());  // Enable CORS for all origins

if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Handle multiple file uploads and zip them
app.post('/api/upload', upload.array('files', 10), (req, res) => {
    const files = req.files;
    if (!files) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    const zipFilePath = path.join(__dirname, 'uploads', `files-${Date.now()}.zip`);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        res.json({ filePath: zipFilePath });
    });

    archive.on('error', err => {
        res.status(500).json({ message: 'Error creating ZIP archive' });
    });

    archive.pipe(output);

    files.forEach(file => {
        archive.file(file.path, { name: file.originalname });
    });

    archive.finalize();
});

// Endpoint to delete files after sending
app.delete('/api/delete-file', (req, res) => {
    const filePath = req.query.path;
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});

app.get('/', function(req, res) {
    res.status(200).json({ message: 'meow'})
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
