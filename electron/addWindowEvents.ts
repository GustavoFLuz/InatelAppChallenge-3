import { ipcMain } from 'electron';


export default function (mainWindow) {
    ipcMain.on('close-window', (event) => {
        mainWindow.close();
    });
    ipcMain.on('expand-window', (event) => {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
    });
    ipcMain.on('minimize-window', (event) => {
        mainWindow.minimize(); 
    });
}