// tray.js
const { app,Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const {createSettingWindow} = require("../windowManger/SettingWindow");
const {createSetLockWindow} = require("../windowManger/setLockWindow");
const {createUnlockWindow} = require("../windowManger/unLockWindow");
const {isLocked,pin} = require("../windowManger/menuBuilder");
const {createmanageLicenses} = require("../windowManger/manageLicenses");
const {createmanageSubscription} = require("../windowManger/manageSubscription");
function createTray() {
    // Create a tray icon
    const tray = new Tray(path.join(__dirname, 'icon.png'));

    // Set a tooltip (label) for the tray icon
    tray.setToolTip('PetroByte');
    let focusedWindow;

    // Create a context menu for the tray icon
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Minimize', type: 'normal', click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();
                focusedWindow.minimize()
        }},
        { label: 'Application', type: 'normal', click: () => console.log('Item 2 clicked') },
        { type: 'separator' },
        { label: 'Licenses', type: 'normal', click: () =>  {
        const focusedWindow = BrowserWindow.getFocusedWindow();

        if (focusedWindow) {
            focusedWindow.close()
            console.log('Currently focused window:', focusedWindow.getTitle());
        } else {
            console.log('No window is currently focused.');
        }
        createmanageLicenses()
    }, },
        { label: 'Subscriptions', type: 'normal', click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();

                if (focusedWindow) {
                    focusedWindow.close()
                    console.log('Currently focused window:', focusedWindow.getTitle());
                } else {
                    console.log('No window is currently focused.');
                }
                createmanageSubscription()
            }, },
        { type: 'separator' },

        { label: 'Reload', type: 'normal', click: () => {
                let focusedWindow = BrowserWindow.getFocusedWindow();
                if (focusedWindow) focusedWindow.reload();
            } },
        { label: 'Lock', type: 'normal', click: () =>  {

                // const focusedWindow = BrowserWindow.getFocusedWindow();

                if (focusedWindow) {
                    focusedWindow.close()
                    console.log('Currently focused window:', focusedWindow.getTitle());
                } else {
                    console.log('No window is currently focused.');
                }


                console.log("isLocked", isLocked);
                console.log("pin", pin);

                if (!isLocked) {
                    createSetLockWindow();
                } else {
                    console.log("setLockWindow is already open");
                    createUnlockWindow();
                }
            } },
        { type: 'separator' },

        { label: 'Setting', type: 'normal', click: () =>
            {
                // const focusedWindow = BrowserWindow.getFocusedWindow();

                if (focusedWindow) {
                    focusedWindow.close()
                    console.log('Currently focused window:', focusedWindow.getTitle());
                } else {
                    console.log('No window is currently focused.');
                }
                createSettingWindow()
            }
             },
        { label: 'About', type: 'normal', click: () =>{

            } },
        { type: 'separator' },

        { label: 'Quit App', type: 'normal', click: () => app.quit() },
    ]);

    // Set the context menu for the tray icon
    tray.setContextMenu(contextMenu);

    // Show the context menu when the tray icon is clicked
    tray.on('click', () => {
         focusedWindow = BrowserWindow.getFocusedWindow();
         console.log(focusedWindow);
        tray.popUpContextMenu();
    });

    return tray;
}

module.exports = createTray;
