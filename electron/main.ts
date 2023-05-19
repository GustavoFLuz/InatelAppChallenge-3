import { app, BrowserWindow } from 'electron';
import createProcesses from './createProcesses';
import addWindowEvents from './addWindowEvents';

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Main window',
        width: 1080,
        height: 960,
        titleBarStyle: 'hidden',
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
        },
    })

    createProcesses(mainWindow)
    addWindowEvents(mainWindow)

    if (process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    } else {
        // Load your file
        mainWindow.loadFile('dist/index.html');
    }

    mainWindow.webContents.openDevTools();
    
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
