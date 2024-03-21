const {
        app,
        BrowserWindow,
        clipboard,
        shell,
        ipcMain,
        menu: Menu, ipcRenderer,
    browserWindow,
    session,
    remote
      } = require("electron");
const fs = require("fs");
const path = require("path");
const {mainWindow} = require("../main");
// const {session} = require("electron");
let activeWindow = require("../main");
console.log(activeWindow.title);
// const {createLockWindow} =require("./lockWindow");
// const {createRegistrationWindow} =require("./registrationWindow");
const {createConfigWindow} = require("./configWindow");
const {createmanageLicenses} = require("./manageLicenses");
const {createmanageSubscription} = require("./manageSubscription");
const {createShortCutWindow} = require("../GlobalKeyManager/ShortCutKeyWindow");
const{createSettingWindow} = require("./settingWindow");
const{createBookmarkWindow} = require("./bookmarkWindow");
const{createFindinpageWindow} = require("./findinpageWindow");
// const {createSetLockWindow} =require("./setLockWindow");
const {createUnlockWindow} = require("./unLockWindow");
const {
        setLockWindow,
        createSetLockWindow
      } = require("./setLockWindow");
const{creategotopageWindow}=require("./gotopageWindow");
const {createDownloadsWindow} = require("./downloadWindow");
const {createReviewWindow} = require("./ReviewWindow");
const{bookmarkWindow} = require("./bookmarkWindow");
let isLocked = false;
let pin = null;





const bookmarksFilePath = path.join(app.getPath('userData'), 'bookmarks.json');

// Function to save bookmarks to local file
function saveBookmark(url, title) {
    let bookmarks = [];
    if (fs.existsSync(bookmarksFilePath)) {
        bookmarks = JSON.parse(fs.readFileSync(bookmarksFilePath, 'utf8'));
    }

    // Check if the URL is already in the bookmarks
    if (bookmarks.some(bookmark => bookmark.url === url)) {
        console.log('This page is already bookmarked.');
        return;
    }

    bookmarks.push({ url, title });
    fs.writeFileSync(bookmarksFilePath, JSON.stringify(bookmarks));
    console.log('Bookmark saved.');
    if(bookmarkWindow)
    {
        bookmarkWindow.reload();
    }

}

 function goBack(window) {
     activeWindow=browserWindow.getFocusedWindow();
     console.log("aas",activeWindow.title);
     if (activeWindow !== mainWindow) {
         activeWindow.close();
         mainWindow.focus();
     } else{

         if (activeWindow && activeWindow.webContents.canGoBack()) {
             activeWindow.webContents.goBack();
         }
     }
 }
 function goForward() {
     if (activeWindow !== mainWindow) {
         //if you want go forward define it.
         activeWindow.close();
         mainWindow.focus();
     }
     else{

         if (activeWindow && activeWindow.webContents.canGoForward()) {
             activeWindow.webContents.goForward();
         }
     }
 }

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

     // windows.push(newWindow);

     // newWindow.on("closed", () => {
     //     const index = windows.indexOf(newWindow);
     //     if (index > -1) {
     //         windows.splice(index, 1);
     //     }
     // });

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

                createSettingWindow();
              }

          },
          {
            label: 'Configuration',
            click: () => {

              createConfigWindow()

            },
          },
          {type: 'separator'},
          {
              label:"Add Bookmark",
              click: () => {
                  const title = document.title; // The title of the current page
                  const url = window.location.href; // The URL of the current page
                  console.log(url, title);

                  const focusedWindow = BrowserWindow.getFocusedWindow();
                  if (focusedWindow) {

                      const url = focusedWindow.webContents.getURL();
                      const title = focusedWindow.webContents.getTitle();
                      console.log(url, title)
                      saveBookmark(url, title);
                  } else {
                      dialog.showErrorBox('Error', 'No active window found.');
                  }
              }
          },
        {
          label: "Open Bookmarks",
            click: () => {

                createBookmarkWindow()
            }
        },
        {
          label: "Open Downloads",
            accelerator: 'CmdOrCtrl+D',
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
            creategotopageWindow();
          }
        },
        {
          label      : "Find In Page",
          // accelerator: "CmdOrCtrl+F",
          click      : () => {
            createFindinpageWindow();
          }
        },
        {type: 'separator'},
        {
          label      : "Reload",
          accelerator: 'CmdOrCtrl+R',
          click      : () => {
            // let focusedWindow = BrowserWindow.getFocusedWindow();
            // if (focusedWindow) focusedWindow.webContents.reload();


          }
        },
        {
          label      : "Hard Reload",
          accelerator: 'CmdOrCtrl+Shift+R',
          click      : () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            console.log(focusedWindow)
            if (focusedWindow) focusedWindow.webContents.reloadIgnoringCache();
          }
        },
        {type: 'separator'},
          {
              label: "Zoom-in",
              click: () => {
                  let focusedWindow = BrowserWindow.getFocusedWindow();

                  const factor = focusedWindow.webContents.getZoomFactor();
                  focusedWindow.webContents.setZoomFactor(factor + 0.1);
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
            accelerator: "CmdOrCtrl+1",
          click: () => {

            newHomePageTab();
          },
        },
        {
          label: "Duplicate Window (Current Page)",
          // click: (menuItem, currentWindow) => {
          //   duplicateCurrentTab(currentWindow);
          // },
            click:()=>{
                const focusedWindow = BrowserWindow.getFocusedWindow();
                duplicateCurrentTab(focusedWindow);

                },

        },
        {
          type: 'separator',
        },
          {
              label: "Manage Licence",
              click: () => {

                  createmanageLicenses()
              },
          },
        {
          label: "Manage Subscription",
            click: () => {

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
              click: () => {    const focusedWindow = BrowserWindow.getFocusedWindow();

                  if (focusedWindow) {
                      focusedWindow.minimize()
                      console.log('Currently focused window:', focusedWindow.getTitle());
                  } else {
                      console.log('No window is currently focused.');
                  }
              }
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
              const focusedWindow = BrowserWindow.getFocusedWindow();

              if (focusedWindow) {
                  focusedWindow.close()
                  console.log('Currently focused window:', focusedWindow.getTitle());
              } else {
                  console.log('No window is currently focused.');
              }
              newHomePageTab();
          }
        },
        {
          type: 'separator'
        },
        {
          label: "Clear Caches",
          click: () => {
              session.defaultSession.clearCache().then(() => {
                  console.log('Cache cleared!');
              });
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