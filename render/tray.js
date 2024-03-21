
const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const { createSettingWindow } = require("../windowManger/SettingWindow");
const { createSetLockWindow } = require("../windowManger/setLockWindow");
const { createUnlockWindow } = require("../windowManger/unLockWindow");
const { isLocked, pin } = require("../windowManger/menuBuilder");
const { createmanageLicenses } = require("../windowManger/manageLicenses");
const { createmanageSubscription } = require("../windowManger/manageSubscription");

function areAllWindowsMinimized() {
    const windows = BrowserWindow.getAllWindows();
    return windows.every(window => window.isMinimized());
}

function createTray() {
    // Create a tray icon
    const tray = new Tray(path.join(__dirname, 'icon.png'));

    // Set a tooltip (label) for the tray icon
    tray.setToolTip('PetroByte');

    function updateContextMenu() {
        const template = [
            {
                label: areAllWindowsMinimized() ? 'Show' : 'Hide',
                type: 'normal',
                click: () => {
                    const windows = BrowserWindow.getAllWindows();
                    if (areAllWindowsMinimized()) {
                        windows.forEach(win => win.restore());
                    } else {
                        windows.forEach(win => win.minimize());
                    }
                }
            },

            { label: 'Application', type: 'normal', click: () => console.log('Item 2 clicked') },
        { type: 'separator' },
        { label: 'Licenses', type: 'normal', click: () => {
        createmanageLicenses()
    }, },
        { label: 'Subscriptions', type: 'normal', click: () => {

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
                createSettingWindow()
            }
             },
        { label: 'About', type: 'normal', click: () =>{

            } },
        { type: 'separator' },

        { label: 'Quit App', type: 'normal', click: () => app.quit() },
        ];

        const contextMenu = Menu.buildFromTemplate(template);
        tray.setContextMenu(contextMenu);
    }

    // Initialize the tray menu
    updateContextMenu();

    // Update context menu whenever a window is minimized or restored
    BrowserWindow.getAllWindows().forEach(win => {
        win.on('minimize', updateContextMenu);
        win.on('restore', updateContextMenu);
    });

    // Event when tray icon is clicked
    tray.on('click', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        console.log(focusedWindow);
        tray.popUpContextMenu();
    });

    return tray;
}

module.exports = createTray;
