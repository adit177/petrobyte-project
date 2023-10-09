
console.log('configRenderer.js');
const {ipcRenderer, webFrame} = require('electron');

document.getElementById('download-folder').addEventListener('change', (event) => {
  ipcRenderer.send('set-download-folder', event.target.value);
});

document.getElementById('change-folder').addEventListener('click', () => {
  ipcRenderer.send('open-directory-dialog');
});

ipcRenderer.on('directory-selected', (event, path) => {
  document.getElementById('download-folder').value = path;
});

document.getElementById('theme').addEventListener('change', (event) => {
  ipcRenderer.send('set-theme', event.target.value);
});

// ... similar event listeners for other settings ...
ipcRenderer.on('set-download-folder', (event, path) => {
  // Set the download folder path.
});

ipcRenderer.on('set-theme', (event, theme) => {
  // Apply the selected theme.
});

// ... handlers for other settings ...
