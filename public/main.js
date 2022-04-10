const { app, BrowserWindow } = require('electron');
// const remoteMain = require('@electron/remote/main');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1080,
    height: 700,
    webPreferences: {
      // nodeIntegration: true,
    },
    icon: path.join(__dirname, 'icons/logo512.ico'),
  });
  // remoteMain.initialize();
  // remoteMain.enable(win.webContents); // = enableRemoteModule: true

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
}

app.on('ready', createWindow);

// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
