const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      plugins: true,
      nativeWindowOpen: true,
      allowRunningInsecureContent: true,
      enableWebSQL: true,
      experimentalFeatures: true,
    },
    resizable: true,
    frame: true,
  });

  mainWindow.loadURL('https://streamingcommunity.family');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    return { action: 'deny' };
  });

  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize();
    mainWindow.setBounds({
      width: Math.min(width, 1920),
      height: Math.min(height, 1080),
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});