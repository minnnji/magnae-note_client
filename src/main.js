exports.__esModule = true;

require('dotenv').config();
const { app, BrowserWindow } = require('electron');

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 're-meeting',
    width: 1000,
    height: 800,
    center: true,
    fullscreen: true,
    kiosk: !isDev,
    resizable: true,
    webPreferences: {
      nativeWindowOpen: true,
      webSecurity: false,
      nodeIntegration: true
    }
  });

  if (isDev) {
    mainWindow.loadURL('https://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
