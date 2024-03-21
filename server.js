// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:folder1/:folder2/:file', (req, res) => {
    const {folder1, folder2, file} = req.params;
    res.sendFile(path.join(__dirname, `public/html/${folder1}/${folder2}/${file}.html`));
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
