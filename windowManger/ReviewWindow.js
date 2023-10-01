const {
        BrowserWindow,
        ipcMain,
        ipcRenderer
      } = require('electron');
let reviewWindow;

function createReviewWindow() {
  reviewWindow = new BrowserWindow({
    width         : 400,
    height        : 200,
    webPreferences: {
      nodeIntegration : true,
      contextIsolation: false,
    },
  });

  reviewWindow.loadFile('review.html');


  reviewWindow.on('closed', () => {
    reviewWindow = null;
  });

}

module.exports = {
  createReviewWindow,
  reviewWindow
};
