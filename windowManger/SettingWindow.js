const {BrowserWindow} = require("electron");

let setingWindow

function createSettingWindow() {
    if (setingWindow) {
        setingWindow.focus();
        return;
    }

    setingWindow= new BrowserWindow({
        width         : 800,
        height        : 600,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    setingWindow.loadFile('pages/setting.html');
    // configWindow.webContents.openDevTools();
    // setActiveWindow(configWindow);

    setingWindow.on('closed', () => {
        setingWindow = null;
    });
}

module.exports = {
    createSettingWindow,
    setingWindow
}