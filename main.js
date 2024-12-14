const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Crea la finestra principale
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
    resizable: true, // La finestra è ridimensionabile
    frame: true, // Imposta il frame della finestra, quindi i pulsanti di sistema sono visibili
  });

  // Carica il sito senza pop-up e annunci
  mainWindow.loadURL('https://streamingcommunity.family');

  // Gestisci la chiusura della finestra
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Evita l'apertura di nuove finestre
  mainWindow.webContents.setWindowOpenHandler((details) => {
    return { action: 'deny' };
  });

  // Impedisce il ridimensionamento oltre i limiti
  mainWindow.on('resize', () => {
    const [width, height] = mainWindow.getSize();
    mainWindow.setBounds({
      width: Math.min(width, 1920), // Limita la larghezza
      height: Math.min(height, 1080), // Limita l'altezza
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});