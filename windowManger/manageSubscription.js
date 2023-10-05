const {BrowserWindow} = require("electron");

let manageSubscription;

function createmanageSubscription() {
    if (manageSubscription) {
        manageSubscription.focus();
        return;
    }

    manageSubscription= new BrowserWindow({
        width         : 800,
        height        : 600,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });

    manageSubscription.loadFile('pages/manageSubscription.html');
    // configWindow.webContents.openDevTools();
    // setActiveWindow(configWindow);

    manageSubscription.on('closed', () => {
        manageSubscription = null;
    });
}

module.exports = {
    createmanageSubscription,
    manageSubscription
}