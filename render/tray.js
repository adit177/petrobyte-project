// tray.js
const { Tray, Menu } = require('electron');
const path = require('path');

function createTray() {
    // Create a tray icon
    const tray = new Tray(path.join(__dirname, 'icon.png'));

    // Set a tooltip (label) for the tray icon
    tray.setToolTip('PetroByte');

    // Create a context menu for the tray icon
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Minimize', type: 'normal', click: () => console.log('Item 1 clicked') },
        { label: 'Application', type: 'normal', click: () => console.log('Item 2 clicked') },
        { type: 'separator' },
        { label: 'Licenses', type: 'normal', click: () => console.log('Item 1 clicked') },
        { label: 'Subscriptions', type: 'normal', click: () => console.log('Item 1 clicked') },
        { type: 'separator' },

        { label: 'Reload', type: 'normal', click: () => console.log('Item 1 clicked') },
        { label: 'Lock', type: 'normal', click: () => console.log('Item 1 clicked') },
        { type: 'separator' },

        { label: 'Setting', type: 'normal', click: () => console.log('Item 1 clicked') },
        { label: 'About', type: 'normal', click: () => console.log('Item 1 clicked') },
        { type: 'separator' },

        { label: 'Quit App', type: 'normal', click: () => app.quit() },
    ]);

    // Set the context menu for the tray icon
    tray.setContextMenu(contextMenu);

    // Show the context menu when the tray icon is clicked
    tray.on('click', () => {
        tray.popUpContextMenu();
    });

    return tray;
}

module.exports = createTray;
