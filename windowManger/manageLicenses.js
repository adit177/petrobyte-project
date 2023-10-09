const {BrowserWindow} = require("electron");
let isdev=process.env.NODE_ENV!=='development';
let manageLicenses;

function createmanageLicenses() {
    if (manageLicenses) {
        manageLicenses.focus();
        return;
    }

    manageLicenses= new BrowserWindow({
        width         : 800,
        height        : 600,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false
        }
    });
if(isdev){manageLicenses.webContents.openDevTools();}
    manageLicenses.loadFile('pages/manageLicenses.html');
    // configWindow.webContents.openDevTools();
    // setActiveWindow(configWindow);

    manageLicenses.on('closed', () => {
        manageLicenses = null;
    });
}

module.exports = {
    createmanageLicenses,
    manageLicenses
}