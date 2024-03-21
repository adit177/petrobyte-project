const { shell } = require('electron');
document.addEventListener("DOMContentLoaded", function() {
    //for date of the each box

    const downloadBoxes = document.querySelectorAll(".download-box");

    downloadBoxes.forEach(function(box) {
        const dateHeader = box.querySelector(".download-date");
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        dateHeader.textContent =  formattedDate;
    });
    // for the size of the each download item
    const downloadItems = document.querySelectorAll(".d-flex");

    downloadItems.forEach(function(item) {
        const size = item.getAttribute("data-size");
        const sizeElement = item.querySelector(".file-size");
        sizeElement.textContent = "Size: " + size;
    });
    // for clear downloads button
    document.getElementById('clearDownloads').addEventListener('click', clearAllDownloads);

// for show default download location button
    document.getElementById('showDownloadLocation').addEventListener('click', function() {
        // Define your default download location here
        const defaultDownloadLocation = 'D:\\';

        // Open the default download location in the file manager
        shell.openPath(defaultDownloadLocation);
    });
    function onDeleteClick(downloadItem) {
        // Remove the download item from the DOM
        downloadItem.remove();

        // Get the parent container of the download item, which should contain all items for that date
        const dateContainer = downloadItem.closest('.date-container');

        // Check if there are any remaining download items in the date container
        const remainingItems = dateContainer.querySelectorAll('.d-flex');

        if (remainingItems.length === 0) {
            // If there are no remaining download items, remove the date container
            dateContainer.remove();
        }
    }

// Function to delete a specific download item
    function deleteDownloadItem(event) {
        console.log(event.target.closest('.download-date'));
        const downloadItem = event.target.closest('.d-flex'); // Find the closest parent with the class '.d-flex'
        if (downloadItem) {
            downloadItem.remove()
            onDeleteClick(downloadItem);


            // Remove the download item from the DOM
        }
    }

// Add event listener to each delete button
    document.querySelectorAll('.btn-dark').forEach(button => {
        button.addEventListener('click', deleteDownloadItem);
    });



    document.getElementById('item1').addEventListener('click', function() {
        const filePath = '"D:\\admit card.pdf"';  // Replace with the actual path

        shell.openPath(filePath);
    });
});


// Function to clear all downloads
function clearAllDownloads() {
    const downloadsSection = document.getElementById('downloadsContainer');
    // if (!downloadsSection) {
    //     console.error('downloadsContainer element not found!');
    //     return;
    // }
    while (downloadsSection.firstChild) {
        downloadsSection.removeChild(downloadsSection.firstChild);
    }
}




