const {
        app,
        BrowserWindow,
        clipboard,
        shell,
        ipcMain,
        menu: Menu, ipcRenderer,
      } = require("electron");
const fs = require("fs");
const {mainWindow} = require("../main");

let activeWindow = null;
// const {createLockWindow} =require("./lockWindow");
// const {createRegistrationWindow} =require("./registrationWindow");
const {createConfigWindow} = require("./configWindow");
const {createmanageLicenses} = require("./manageLicenses");
const {createmanageSubscription} = require("./manageSubscription");
const {createShortCutWindow} = require("../GlobalKeyManager/ShortCutKeyWindow");
const{createSettingWindow} = require("./settingWindow");
// const {createSetLockWindow} =require("./setLockWindow");
const {createUnlockWindow} = require("./unLockWindow");
const {
        setLockWindow,
        createSetLockWindow
      } = require("./setLockWindow");
const {createDownloadsWindow} = require("./downloadWindow");
const {createReviewWindow} = require("./ReviewWindow");
let isLocked = false;
let pin = null;






 // function goBack() {
 //     if (activeWindow !== mainWindow) {
 //         activeWindow.close();
 //         mainWindow.focus();
 //     } else{
 //
 //         if (activeWindow && activeWindow.webContents.canGoBack()) {
 //             activeWindow.webContents.goBack();
 //         }
 //     }
 // }
 // function goForward() {
 //     if (activeWindow !== mainWindow) {
 //         //if you want go forward define it.
 //         activeWindow.close();
 //         mainWindow.focus();
 //     }
 //     else{
 //
 //         if (activeWindow && activeWindow.webContents.canGoForward()) {
 //             activeWindow.webContents.goForward();
 //         }
 //     }
 // }

 // function loadHomePage() {
 //     if (activeWindow) {
 //         // Replace with your home URL
 //         activeWindow.loadURL('');
 //     }
 // }
 // function clearCache() {
 //     if (activeWindow) {
 //         const ses = activeWindow.webContents.session;
 //         ses.clearCache().then(() => {
 //             console.log('Cache cleared.');
 //         });
 //     }
 // }


 function newHomePageTab() {
     let newWindow = new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
         },
     });

     newWindow.loadFile("index.html");  // Replace this with the path to your home page
     windows.push(newWindow);

     newWindow.on("closed", () => {
         const index = windows.indexOf(newWindow);
         if (index > -1) {
             windows.splice(index, 1);
         }
     });
 }

 function duplicateCurrentTab(window) {
     let newWindow = new BrowserWindow({
         width: 800,
         height: 600,
         webPreferences: {
             nodeIntegration: true,
             contextIsolation: false,
         },
     });

     window.webContents.executeJavaScript('document.location.href').then((url) => {
         newWindow.loadURL(url);  // Load the current URL in the new window
         windows.push(newWindow);

         newWindow.on("closed", () => {
             const index = windows.indexOf(newWindow);
             if (index > -1) {
                 windows.splice(index, 1);
             }
         });
     });
 }


 // function clearHistory() {
 //     if (activeWindow) {
 //         activeWindow.webContents.clearHistory();
 //         console.log('History cleared.');
 //     }
 // }
ipcMain.on('passcode-set', (event, data) => {
    // Access data like data.isSetpasscode and data.Pin here
    isLocked = data.isSetpasscode;
    pin = data.Pin;
    console.log('isSetpasscode:', data.isSetpasscode);
    console.log('Pin:', data.Pin);
});
function menuTemplate(mainWindow) {
  return [
    {
      label  : "Application",
      submenu: [

          {
            label: 'Setting',
              click: () => {
                  const focusedWindow = BrowserWindow.getFocusedWindow();

                  if (focusedWindow) {
                      focusedWindow.close()
                      console.log('Currently focused window:', focusedWindow.getTitle());
                  } else {
                      console.log('No window is currently focused.');
                  }
                createSettingWindow()
              }

          },
          {
            label: 'Configuration',
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();

                if (focusedWindow) {
                    focusedWindow.close()
                    console.log('Currently focused window:', focusedWindow.getTitle());
                } else {
                    console.log('No window is currently focused.');
                }
              createConfigWindow()

            },
          },
          {type: 'separator'},
        {
          label: "Open Bookmarks",
        },
        {
          label: "Open Downloads",
          click() {
            createDownloadsWindow()
          }
        },
          {type: 'separator'},
          {
              label: 'Update App',
              click: () => {

              },
          },

          {
              label: "Lock App",
              click: () => {

                  const focusedWindow = BrowserWindow.getFocusedWindow();

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
              }
          },

        {type: 'separator'},
        {
          label      : 'Quit App (exit the application)',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click      : () => {
            app.quit();
          },
        },
      ],
    },
    {
      label  : "View",
      submenu: [
        {
          label: "Go to Page",
          // This would require an external library and an appropriate handler. Placeholder here.
          click: () => {
            console.log("Awesome search clicked");
          }
        },
        {
          label      : "Find In Page",
          accelerator: "CmdOrCtrl+F",
          click      : () => {
            mainWindow.webContents.send('show-find-box');
          }
        },
        {type: 'separator'},
        {
          label      : "Reload",
          accelerator: 'CmdOrCtrl+R',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label      : "Hard Reload",
          accelerator: 'CmdOrCtrl+Shift+R',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            if (focusedWindow) focusedWindow.webContents.reloadIgnoringCache();
          }
        },
        {type: 'separator'},
          {
              label: "Zoom-in",
              click: () => {
                  const factor = mainWindow.webContents.getZoomFactor();
                  mainWindow.webContents.setZoomFactor(factor + 0.1);
              }
          },
          {
              label: "Actual Size",
              click: () => {
                  mainWindow.webContents.setZoomFactor(1);
              }
          },
          {
              label: "Zoom-Out",
              click: () => {
                  const factor = mainWindow.webContents.getZoomFactor();
                  mainWindow.webContents.setZoomFactor(factor - 0.1);
              }
          },

          {type: 'separator'},
        // {
        //   label: "Copy URL (current page)",
        //   click: () => {
        //     let focusedWindow = BrowserWindow.getFocusedWindow();
        //     if (focusedWindow) {
        //       const currentURL = focusedWindow.webContents.getURL();
        //       clipboard.writeText(currentURL);
        //     }
        //   }
        // },
        {type: 'separator'},
          {
            label  : "Theme",
            submenu: [
              {
                label  : 'Light Mode',
                type   : 'radio',
                checked: true,
                click() {
                  mainWindow.webContents.send('change-theme', 'light');
                }
              },
              {
                label: 'Dark Mode',
                type : 'radio',
                click() {
                  mainWindow.webContents.send('change-theme', 'dark');
                }
              },
              {
                label: "System Default",
              },
            ],
          },

        {
          label  : "Screen Adjust",
          submenu: [
              {
                  label: "1080p",
                  type: 'radio',
                  click: () => {
                      mainWindow.setSize(1920, 1080);
                  }
              },
              {
                  label: "720p",
                  type: 'radio',
                  click: () => {
                      mainWindow.setSize(1280, 720);
                  }
              },
            {
              label: "480p",
                type: 'radio',
              click: () => {
                mainWindow.setSize(854, 480);
              }
            },





          ],
        },
        {
          label: "Full Screen Toggle",
          click() {
            if (mainWindow.isFullScreen()) {
              mainWindow.setFullScreen(false);
            }
            else {
              mainWindow.setFullScreen(true);
            }
          },
        },

      ],
    },
    {
      label  : "Windows",
      submenu: [
        {
          label: "New Window (Home)",
          click: () => {
            newHomePageTab();
          },
        },
        {
          label: "Duplicate Window (Current Page)",
          click: (menuItem, currentWindow) => {
            duplicateCurrentTab(currentWindow);
          },
        },
        {
          type: 'separator',
        },
          {
              label: "Manage Licence",
              click: () => {
                  const focusedWindow = BrowserWindow.getFocusedWindow();

                  if (focusedWindow) {
                      focusedWindow.close()
                      console.log('Currently focused window:', focusedWindow.getTitle());
                  } else {
                      console.log('No window is currently focused.');
                  }
                  createmanageLicenses()
              },
          },
        {
          label: "Manage Subscription",
            click: () => {
                const focusedWindow = BrowserWindow.getFocusedWindow();

                if (focusedWindow) {
                    focusedWindow.close()
                    console.log('Currently focused window:', focusedWindow.getTitle());
                } else {
                    console.log('No window is currently focused.');
                }
                createmanageSubscription()
            },
        },
          {type: 'separator'},
        {
          label: "Register Page",
        },
          {
            label:"Payment Page",
          },
        {
          type: 'separator',
        },
          {
                label: "Minimize Window",
          },
          {
            label      : "Close This Window",
            accelerator: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
            click      : () => {
              let focusedWindow = BrowserWindow.getFocusedWindow();
              if (focusedWindow) {
                focusedWindow.close();
              }
            }
          },



      ]
    },
    {
      label  : "History",
      submenu: [
        {
          label: "Go Back",
          click: () => {
            goBack();
          },
          class: 'btn btn-sm'
        },
        {
          label: "Go Forward",
          click: () => {
            goForward();
          }
        },
        {
          label: "Home",
          click: () => {
            loadHomePage();
          }
        },
        {
          type: 'separator'
        },
        {
          label: "Clear Caches",
          click: () => {
            clearCache();
          }
        },
        {
          label: "Clear History",
          click: () => {
            clearHistory();
          }
        },
          {type: 'separator'},
          {
              label:"View Page History",
          },
          {
                label:"View Download History",
          },
      ],
    },

    {
      label  : "Edit",
      submenu: [
        {
          label      : "Cut",
          accelerator: "CmdOrCtrl+X",
          role       : 'cut'
        },
        {
          label      : "Copy",
          accelerator: "CmdOrCtrl+C",
          role       : 'copy'
        },
        {
          label      : "Paste",
          accelerator: "CmdOrCtrl+V",
          role       : 'paste'
        },
          {type: 'separator'},
        {
          label      : "Select All",
          accelerator: "CmdOrCtrl+A",
          role       : 'selectAll'
        },
        {
          label      : "Find Text",
          accelerator: "CmdOrCtrl+F",
          click      : () => {
            mainWindow.webContents.send('show-find-box');
          }
        },
      ]
    },

    {
      label  : "Help",
      submenu: [
        {
          label  : "Follow Us",
          submenu: [
            {
              label: "Twitter",
              click: async () => {
                await shell.openExternal('https://twitter.com/?lang=en');
              }
            },
            {
              label: "Instagram",
              click: async () => {
                await shell.openExternal('https://instagram.com');
              }
            },
            {
              label: "YouTube",
              click: async () => {
                await shell.openExternal('https://youtube.com');
              }
            },
          ]
        },
        {
          label: "About Us"
        },
          {type: 'separator'},
          {
              label: "Contact to Support",
          },
          {
              label: "Training Videos",
              click: async () => {
                  await shell.openExternal('https://youtube.com');
              }

          },
          {
              label: "Documentation"
          },
          {type:"separator"},
          {
              label: "Post a Review",
              click: () => {
                  createReviewWindow();
              }
          },
        {
          label: "Give a Feedback"
        },

        {
          label: "Report a Bug/Issue"
        },
        {type:"separator"},

        // {
        //   label: "Add-On Features"
        // },
        {
          label: "View App Version"
        },
        {
          label: "View ShortCut Keys",
          click: () => {
            createShortCutWindow();
          },
          class: 'asdf',
        }
      ],
    },
  ];
}

module.exports = {
  menuTemplate,

}