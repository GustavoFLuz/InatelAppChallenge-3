import { app, BrowserWindow } from 'electron';
import net from 'net';

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Main window',
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
        },
    })

    const processes = net.connect(50000, '127.0.0.1', () => {
        console.log('Connected to process streaming');
    });
    const protocols = net.connect(50001, '127.0.0.1', () => {
        console.log('Connected to protocols streaming');
    });
    const hosts = net.connect(50002, '127.0.0.1', () => {
        console.log('Connected to hosts streaming');
    });

    processes.on('data', (data) => {
        mainWindow.webContents.send('process', data.toString());
    });
    protocols.on('data', (data) => {
        mainWindow.webContents.send('protocols', data.toString());
    });
    hosts.on('data', (data) => {
        mainWindow.webContents.send('hosts', data.toString());
    });

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
