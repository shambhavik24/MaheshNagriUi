// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const isDev = require('electron-is-dev');

// function createWindow() {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//             contextIsolation: true,
//             enableRemoteModule: false
//         },
//     });

//     win.loadURL(
//         isDev
//             ? 'http://localhost:5173/glaccount'
//             : `file://${path.join(__dirname, 'dist/index.html')}`
//     );

//     if (isDev) {
//         win.webContents.openDevTools();
//     }
// }

// app.on('ready', createWindow);

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });
