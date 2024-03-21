const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    "electronBridge", {
        saveBookmark: (url, title) => ipcRenderer.send('saveBookmark', url, title),
        deleteBookmark: (url) => ipcRenderer.send('deleteBookmark', url),
        fetchBookmarks: () => ipcRenderer.invoke('fetchBookmarks')
    }
);
