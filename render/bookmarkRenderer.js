const electron = require('electron');
const path = require('path');
const fs = require('fs');

const userDataPath = electron.ipcRenderer.sendSync('get-user-data-path');
const bookmarksFilePath = path.join(userDataPath, 'bookmarks.json');


function deleteBookmark(url) {
    let bookmarks = [];
    if (fs.existsSync(bookmarksFilePath)) {
        bookmarks = JSON.parse(fs.readFileSync(bookmarksFilePath, 'utf8'));
    }
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    fs.writeFileSync(bookmarksFilePath, JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    let bookmarksResults = document.getElementById('bookmarkResults');
    bookmarksResults.innerHTML = '';

    if (fs.existsSync(bookmarksFilePath)) {
        let bookmarks = JSON.parse(fs.readFileSync(bookmarksFilePath, 'utf8'));
        for (let bookmark of bookmarks) {
            bookmarksResults.innerHTML += '<li class="list-group-item">' + bookmark.title +
                ' <a class="btn btn-primary" target="_blank" href="' + bookmark.url + '">Visit</a> ' +
                ' <a onclick="deleteBookmark(\'' + bookmark.url + '\')" class="btn btn-danger" href="#">Delete</a>' +
                '</li>';
        }
    }
}
fetchBookmarks();
// function addBookmarkFromRenderer(name, url) {
//     console.log( url,name);
//     let bookmarks = [];
//     if (fs.existsSync(bookmarksFilePath)) {
//         bookmarks = JSON.parse(fs.readFileSync(bookmarksFilePath, 'utf8'));
//     }
//
//     // Check if the URL is already in the bookmarks
//     if (bookmarks.some(bookmark => bookmark.url === url)) {
//         alert('This page is already bookmarked.');
//         return;
//     }
//     ipcRenderer.send('add-bookmark', name, url);
//
// }
//
// // Function to delete a bookmark from the renderer process
// function deleteBookmarkFromRenderer(url) {
//     ipcRenderer.send('delete-bookmark', url);
// }
//
// // Listen to bookmark added and deleted events
// ipcRenderer.on('bookmark-added', () => {
//     fetchBookmarks();
// });
//
// ipcRenderer.on('bookmark-deleted', () => {
//     fetchBookmarks();
// });
//
