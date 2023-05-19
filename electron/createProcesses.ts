import net from 'net';

export default function (mainWindow) {
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
}