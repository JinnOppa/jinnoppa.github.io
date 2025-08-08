const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the file directory for resume
app.use('/file', express.static(path.join(__dirname, 'file')));

// Route to serve the portfolio page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the resume PDF
app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'file', 'Eugene Winata Resume.pdf');
    res.download(filePath, 'Eugene Winata Resume.pdf', (err) => {
        if (err) {
            console.error('Error serving resume:', err);
            res.status(404).send('Resume not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});