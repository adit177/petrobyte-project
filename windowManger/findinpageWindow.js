const {
    BrowserWindow,
    ipcMain, ipcRenderer
} = require('electron');
const {createUnlockWindow} = require("./unLockWindow");
const {activeWindow}=require("../main");
// const {isSetpasscode,
//   Pin}=require("../render/setLockRenderer");
const isdev=process.env.NODE_ENV!=='development';
let FindinpageWindow=null;

function createFindinpageWindow() {

    FindinpageWindow = new BrowserWindow({
        width         : 800,
        height        : 600,
        frame         : false,
        webPreferences: {
            nodeIntegration : true,
            contextIsolation: false,
        },
    });
    // console.log(activeWindow)
    if(isdev){  FindinpageWindow.webContents.openDevTools();}

    FindinpageWindow.loadFile('pages/findinpage.html');


    FindinpageWindow.on('closed', () => {
        FindinpageWindow = null;
    });
}
module.exports ={
    createFindinpageWindow,
    FindinpageWindow

}