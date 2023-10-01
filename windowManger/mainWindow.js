const {
        app,
        BrowserWindow,
        clipboard,
        Menu,
        shell
      } = require("electron");
const fs = require("fs");
let windows = [];
let mainWindow;
