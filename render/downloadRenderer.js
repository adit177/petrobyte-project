const {
        ipcRenderer,
        shell
      } = require("electron");

// Function to add a new download item to the table
function addDownloadItem(filename, status) {
  const downloadTable = document.getElementById("downloadTable").getElementsByTagName("tbody")[0];
  const newRow = downloadTable.insertRow();
  newRow.innerHTML = `<td>${filename}</td><td>${status}</td><td><button class="openButton">Open</button><button class="removeButton">Remove</button></td>`;
}

// Function to clear all download items
function clearAllDownloads() {
  const downloadTable = document.getElementById("downloadTable").getElementsByTagName("tbody")[0];
  downloadTable.innerHTML = ""; // Clear all rows
}

// Function to open the download directory
function openDownloadDirectory() {
  // Implement logic to open the download directory using Electron's shell module
  // For example:
  shell.openPath("/path/to/download/directory");
}

// Handle the "Clear All" button click
document.getElementById("clearAllButton").addEventListener("click", () => {
  // Send an IPC message to the main process to clear all downloads
  ipcRenderer.send("clear-all-downloads");
});

// Handle the "Open Download Directory" button click
document.getElementById("openDownloadDirectoryButton").addEventListener("click", () => {
  // Open the download directory
  openDownloadDirectory();
});

// Listen for IPC messages from the main process
ipcRenderer.on("add-download-item", (event, filename, status) => {
  // Add a new download item to the table
  addDownloadItem(filename, status);
});

ipcRenderer.on("clear-all-downloads", () => {
  // Clear all download items from the table
  clearAllDownloads();
});
