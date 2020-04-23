exports.__esModule = true;

const electron_1 = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
let mainWindow;

function createWindow() {
  mainWindow = new electron_1.BrowserWindow({
    width: 1000,
    height: 800,
    center: true,
    // fullscreen: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  }

  mainWindow.on('closed', function () {
    mainWindow = undefined;
  });
}

electron_1.app.on('ready', createWindow);

electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});

electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
